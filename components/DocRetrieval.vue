<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStep } from '../composables/useStep'
import { sCurve, useLinks } from '../composables/useLinks'
const s = useStep()

// 1 documents get chopped into chunks · 2 chunks go into a database
// 3 question · 4 search_docs tool call → database · 5 matching chunk comes back
// 6 answer (with source) · 7 takeaway (on the slide)

const docs = [
  { name: 'Datasheet', c: '#3b82f6' },
  { name: 'Spec', c: '#facc15' },
  { name: 'Drawing', c: '#22d3ee' },
  { name: 'Test report', c: '#a3e635' },
]
const ROWS = 4
// source layout (inside each document) and target layout (inside the database)
const DOC_X = (d: number) => 8 + d * 138, DOC_Y = 10, DOC_W = 126
const SRC = (d: number, r: number) => ({ x: DOC_X(d) + 10, y: DOC_Y + 34 + r * 27 })
const CW = 106, CH = 21
const DST = (d: number, r: number) => ({ x: 104 + d * 92, y: 290 + r * 36 })
const K = 0.76 // chunk scale inside the database
const HIT = { d: 0, r: 1 } // the datasheet chunk that answers the question

const chunks = computed(() => {
  const out: { key: string; d: number; r: number; x: number; y: number; style: Record<string, string>; hit: boolean }[] = []
  docs.forEach((_, d) => {
    for (let r = 0; r < ROWS; r++) {
      const a = SRC(d, r), b = DST(d, r)
      let transform = 'none'
      if (s.value >= 2) transform = `translate(${b.x - a.x}px, ${b.y - a.y}px) scale(${K})`
      else if (s.value >= 1) transform = `translate(${(r % 2 ? 5 : -5)}px, ${r * 6 + 3}px) rotate(${r % 2 ? 2.5 : -2.5}deg)`
      out.push({
        key: `${d}-${r}`, d, r, x: a.x, y: a.y, hit: d === HIT.d && r === HIT.r,
        style: { transform, transitionDelay: s.value >= 2 ? `${(d * ROWS + r) * 0.04}s` : '0s' },
      })
    }
  })
  return out
})

const wrap = ref<HTMLElement>()
const callEl = ref<HTMLElement>()
const resultEl = ref<HTMLElement>()
const dbEl = ref<SVGElement>()
const L = ref({ out: '', back: '', o: { x: 0, y: 0 }, b: { x: 0, y: 0 } })

useLinks(wrap, (box) => {
  const c = box(callEl.value), r = box(resultEl.value), db = box(dbEl.value)
  if (!c || !r || !db) return
  const ox = c.l - 6, dx = db.r + 8
  L.value = {
    out: sCurve(ox, c.cy, dx, db.t + (db.b - db.t) * 0.3),
    back: sCurve(dx, db.t + (db.b - db.t) * 0.7, r.l - 6, r.cy),
    o: { x: (ox + dx) / 2, y: Math.min(c.cy, db.t + 60) - 30 },
    b: { x: (dx + r.l) / 2, y: Math.max(db.b - 50, r.cy) + 22 },
  }
})
</script>

<template>
  <div ref="wrap" class="wrap">
    <!-- left: documents → chunks → database -->
    <svg class="pipe" viewBox="0 0 560 470">
      <!-- documents -->
      <g v-for="(doc, d) in docs" :key="doc.name">
        <rect :x="DOC_X(d)" :y="DOC_Y" :width="DOC_W" height="140" rx="10" fill="#131722" :stroke="doc.c" stroke-width="1.5"
          class="frame" :class="{ cut: s >= 1, gone: s >= 2 }" />
        <text :x="DOC_X(d) + 12" :y="DOC_Y + 22" font-size="14" font-weight="700" :fill="doc.c" class="frame" :class="{ gone: s >= 2 }">{{ doc.name }}</text>
      </g>

      <!-- database -->
      <g ref="dbEl" class="db" :class="{ on: s >= 2, q: s >= 4 }">
        <path d="M 84 248 L 84 430 A 196 26 0 0 0 476 430 L 476 248" fill="#0b1426" stroke="#3b82f6" stroke-width="2" />
        <ellipse cx="280" cy="248" rx="196" ry="26" fill="#13203a" stroke="#3b82f6" stroke-width="2" />
        <text x="280" y="253" text-anchor="middle" font-size="13" class="mono" fill="#3b82f6">document database</text>
      </g>

      <!-- chunks: sit in their document, spread apart when cut, then fly into the database -->
      <g v-for="c in chunks" :key="c.key" class="chunk" :style="c.style">
        <g :class="{ hit: c.hit && s >= 5, dim: s >= 5 && !c.hit }">
          <rect :x="c.x" :y="c.y" :width="CW" :height="CH" rx="4" fill="#1a1f2e" :stroke="docs[c.d].c" stroke-opacity="0.7" />
          <rect :x="c.x" :y="c.y" width="5" :height="CH" rx="2" :fill="docs[c.d].c" />
          <rect :x="c.x + 11" :y="c.y + 6" :width="CW - 24 - (c.r % 2) * 18" height="3" rx="1.5" fill="#7a8194" />
          <rect :x="c.x + 11" :y="c.y + 13" :width="CW - 40 + (c.r % 3) * 8" height="3" rx="1.5" fill="#4a5163" />
        </g>
      </g>

      <!-- labels for the two prep steps -->
      <text x="280" y="198" text-anchor="middle" font-size="15" fill="#e6e8ee" class="st" :class="{ on: s >= 1 && s < 2 }">✂ chopped into small chunks</text>
      <g class="st" :class="{ on: s >= 2 }">
        <text x="280" y="196" text-anchor="middle" font-size="15" fill="#e6e8ee">chunks stored in a database</text>
        <path d="M 280 204 L 280 214" stroke="#7a8194" stroke-width="2" />
        <path d="M 275 211 L 280 220 L 285 211 Z" fill="#7a8194" />
      </g>

    </svg>

    <svg class="links" aria-hidden="true">
      <defs>
        <marker id="dr-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="#3b82f6" />
        </marker>
      </defs>
      <g class="st" :class="{ on: s >= 4 }">
        <path :d="L.out" fill="none" stroke="#3b82f6" stroke-width="2.5" class="flow" marker-end="url(#dr-ah)" />
        <text :x="L.o.x" :y="L.o.y" text-anchor="middle" class="mono" font-size="14" fill="#3b82f6"><tspan :x="L.o.x">query the</tspan><tspan :x="L.o.x" dy="18">database</tspan></text>
      </g>
      <g class="st" :class="{ on: s >= 5 }">
        <path :d="L.back" fill="none" stroke="#3b82f6" stroke-width="2.5" class="flow" marker-end="url(#dr-ah)" />
        <text :x="L.b.x" :y="L.b.y" text-anchor="middle" class="mono" font-size="14" fill="#3b82f6"><tspan :x="L.b.x">best match goes</tspan><tspan :x="L.b.x" dy="18">into the context</tspan></text>
      </g>
    </svg>

    <!-- right: chat -->
    <div class="chat">
      <div class="bar"><span class="dot" /><span class="dot" /><span class="dot" /><span class="title">Chatbot</span></div>
      <div class="msgs">
        <div class="msg user st up" :class="{ on: s >= 3 }">What's the max operating temperature of the TS-40 sensor?</div>
        <div ref="callEl" class="msg call st up" :class="{ on: s >= 4 }">
          <div class="who">model · tool call</div>
          <pre>{"tool": "search_docs",
 "args": {"query": "TS-40 max operating temp"}}</pre>
        </div>
        <div ref="resultEl" class="msg result st up" :class="{ on: s >= 5 }">
          <div class="who">tool result · added to context</div>
          <span class="src">TS-40 Datasheet, p. 2</span>
          <span class="mono">"Operating range: −40 °C to +125 °C"</span>
        </div>
        <div class="msg asst st up" :class="{ on: s >= 6 }">
          The TS-40 is rated up to <b>125 °C</b> <span class="cite">(TS-40 datasheet, p. 2)</span>.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap { position: relative; display: grid; grid-template-columns: 520px 1fr; gap: 120px; align-items: center; }
.links { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; z-index: 2; }
.pipe { width: 100%; overflow: visible; }

.frame { transition: opacity 0.6s, stroke-dasharray 0.4s; }
.frame.cut { stroke-dasharray: 5 5; opacity: 0.55; }
.frame.gone { opacity: 0; }
.chunk { transform-box: fill-box; transform-origin: 0 0; transition: transform 0.9s var(--ease); }
.chunk .hit, .chunk .dim { transition: opacity 0.5s, filter 0.5s; }
.chunk .dim { opacity: 0.3; }
.chunk .hit { filter: drop-shadow(0 0 6px #3b82f6) drop-shadow(0 0 2px #fff); }

.db { opacity: 0.2; transition: opacity 0.6s; }
.db.on { opacity: 1; }
.db.q path, .db.q ellipse { filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5)); }

.chat { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.35); }
.bar { display: flex; align-items: center; gap: 7px; padding: 10px 14px; background: var(--panel-2); border-bottom: 1px solid var(--line); }
.dot { width: 11px; height: 11px; border-radius: 50%; background: var(--line); }
.title { margin-left: 10px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--muted); letter-spacing: 0.08em; }
.msgs { display: flex; flex-direction: column; gap: 14px; padding: 18px; min-height: 380px; }
.msg { border-radius: 12px; padding: 10px 14px; font-size: 1.05rem; line-height: 1.45; max-width: 92%; }
.who { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
pre { margin: 0; font-family: 'JetBrains Mono', monospace; }
.user { align-self: flex-end; background: #0f2a33; border: 1px solid color-mix(in srgb, var(--ctx) 50%, transparent); }
.call { align-self: flex-start; background: #0b1d12; border: 1px solid var(--tool); }
.call .who { color: var(--tool); }
.call pre { font-size: 0.86rem; line-height: 1.5; color: var(--text); }
.result { align-self: flex-start; background: #0b1426; border: 1px dashed var(--rag); display: flex; flex-direction: column; }
.result .who { color: var(--rag); }
.result .src { font-size: 0.8rem; color: var(--muted); }
.result .mono { font-size: 0.92rem; color: var(--text); }
.asst { align-self: flex-start; background: #2a1a0e; border: 1px solid color-mix(in srgb, var(--llm) 50%, transparent); }
.cite { color: var(--rag); font-size: 0.9rem; }
</style>
