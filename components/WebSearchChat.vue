<script setup lang="ts">
import { ref } from 'vue'
import { useStep } from '../composables/useStep'
import { sCurve, useLinks } from '../composables/useLinks'
const s = useStep()

// 1 question · 2 thinking · 3 web_search tool call · 4 search runs, page comes back
// 5 page text goes into the context · 6 answer · 7 key idea

const wrap = ref<HTMLElement>()
const callEl = ref<HTMLElement>()
const resultEl = ref<HTMLElement>()
const pageEl = ref<HTMLElement>()
const L = ref({ out: '', back: '', o: { x: 0, y: 0 }, b: { x: 0, y: 0 } })

useLinks(wrap, (box) => {
  const c = box(callEl.value), r = box(resultEl.value), p = box(pageEl.value)
  if (!c || !r || !p) return
  const ox = c.l - 6, oy = c.cy, px = p.r + 10
  const py1 = p.t + (p.b - p.t) * 0.3, py2 = p.t + (p.b - p.t) * 0.7
  L.value = {
    out: sCurve(ox, oy, px, py1),
    back: sCurve(px, py2, r.l - 6, r.cy),
    o: { x: (ox + px) / 2, y: Math.min(oy, py1) - 30 },
    b: { x: (px + r.l) / 2, y: Math.max(py2, r.cy) + 22 },
  }
})
</script>

<template>
  <div ref="wrap" class="wrap">
    <!-- left: what the search tool brings back -->
    <div class="left">
      <div class="head">web_search · runs on a computer</div>
      <div ref="pageEl"><div class="page" :class="{ on: s >= 4, read: s >= 5 }">
        <div class="pbar"><span class="dot" /><span class="dot" /><span class="dot" /><span class="url">weather.example.com/us/tn/nashville</span></div>
        <div class="pbody">
          <div class="loc">Nashville, TN <span class="upd">Updated 2:41 PM CST</span></div>
          <div class="now hl"><span class="temp">58°F</span><span class="cond">Light rain</span></div>
          <div class="stats">
            <span>Feels like <b>55°F</b></span><span>Humidity <b>87%</b></span>
            <span class="hl">Wind <b>NW 8 mph</b></span><span>Pressure <b>30.02 in</b></span>
          </div>
          <div class="hourly">
            <span>3 PM<b>58°</b></span><span>4 PM<b>57°</b></span><span>5 PM<b>55°</b></span><span>6 PM<b>53°</b></span><span>7 PM<b>52°</b></span>
          </div>
          <div class="ad">Advertisement</div>
          <div class="misc">Radar · Air quality 32 (Good) · Pollen: low · Sunset 4:52 PM · 10-day forecast →</div>
        </div>
      </div></div>
      <div class="note st up" :class="{ on: s >= 7 }">
        The model didn't know. It <b class="c-rag">searched</b>, read the page, then answered.
      </div>
    </div>

    <svg class="links" aria-hidden="true">
      <defs>
        <marker id="ws-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="#3b82f6" />
        </marker>
      </defs>
      <g class="st" :class="{ on: s >= 4 }">
        <path :d="L.out" fill="none" stroke="#3b82f6" stroke-width="2.5" class="flow" marker-end="url(#ws-ah)" />
        <text :x="L.o.x" :y="L.o.y" text-anchor="middle" class="mono" font-size="14" fill="#3b82f6"><tspan :x="L.o.x">the chatbot</tspan><tspan :x="L.o.x" dy="18">runs the search</tspan></text>
      </g>
      <g class="st" :class="{ on: s >= 5 }">
        <path :d="L.back" fill="none" stroke="#3b82f6" stroke-width="2.5" class="flow" marker-end="url(#ws-ah)" />
        <text :x="L.b.x" :y="L.b.y" text-anchor="middle" class="mono" font-size="14" fill="#3b82f6"><tspan :x="L.b.x">page text goes</tspan><tspan :x="L.b.x" dy="18">into the context</tspan></text>
      </g>
    </svg>

    <!-- right: the chat window -->
    <div class="chat">
      <div class="bar"><span class="dot" /><span class="dot" /><span class="dot" /><span class="title">Chatbot</span></div>
      <div class="msgs">
        <div class="msg user st up" :class="{ on: s >= 1 }">What is the weather in Nashville, Tennessee currently?</div>
        <div class="msg think st up" :class="{ on: s >= 2 }">
          <div class="who">thinking</div>
          My training data is frozen, so I can't know today's weather. I should search.
        </div>
        <div ref="callEl" class="msg call st up" :class="{ on: s >= 3 }">
          <div class="who">model · tool call</div>
          <pre>{"tool": "web_search",
 "args": {"query": "current weather Nashville TN"}}</pre>
        </div>
        <div ref="resultEl" class="msg result st up" :class="{ on: s >= 5 }">
          <div class="who">tool result · added to context</div>
          <span class="mono">"Nashville, TN … 58°F Light rain … Wind NW 8 mph …"</span>
        </div>
        <div class="msg asst st up" :class="{ on: s >= 6 }">
          It's currently <b>58°F</b> and lightly raining in Nashville, with a northwest wind around <b>8 mph</b>.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap { position: relative; display: grid; grid-template-columns: 440px 1fr; gap: 170px; align-items: center; }
.links { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; z-index: 2; }
.left { display: flex; flex-direction: column; gap: 14px; }
.head { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }

/* the fetched web page */
.page { border-radius: 12px; overflow: hidden; background: #f4f6fa; color: #1f2430; border: 2px solid transparent; opacity: 0; transform: translateX(-20px); transition: opacity 0.6s var(--ease), transform 0.7s var(--ease), border-color 0.5s; }
.page.on { opacity: 1; transform: none; border-color: var(--rag); }
.pbar { display: flex; align-items: center; gap: 6px; padding: 7px 10px; background: #dfe3ea; }
.pbar .dot { background: #b8bfcc; }
.url { margin-left: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #5a6272; background: #fff; border-radius: 5px; padding: 2px 8px; }
.pbody { padding: 12px 14px; display: flex; flex-direction: column; gap: 8px; font-size: 0.85rem; }
.loc { font-weight: 700; font-size: 1rem; } .upd { font-weight: 400; color: #7a8194; font-size: 0.72rem; margin-left: 6px; }
.now { display: flex; align-items: baseline; gap: 12px; }
.temp { font-size: 2.4rem; font-weight: 800; line-height: 1; } .cond { font-size: 1.05rem; color: #3b4252; }
.stats { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 12px; color: #4b5263; }
.hourly { display: flex; gap: 6px; } .hourly span { flex: 1; text-align: center; background: #e7ebf2; border-radius: 6px; padding: 4px 0; font-size: 0.72rem; color: #5a6272; display: flex; flex-direction: column; } .hourly b { color: #1f2430; font-size: 0.85rem; }
.ad { background: repeating-linear-gradient(45deg, #e3e6ec, #e3e6ec 8px, #eceef2 8px, #eceef2 16px); color: #9aa1ae; text-align: center; font-size: 0.7rem; padding: 12px 0; border-radius: 6px; letter-spacing: 0.1em; text-transform: uppercase; }
.misc { color: #7a8194; font-size: 0.72rem; }
.hl { border-radius: 5px; transition: background 0.5s, box-shadow 0.5s; }
.page.read .hl { background: rgba(59, 130, 246, 0.16); box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.6); }
.note { font-size: 1.25rem; font-weight: 600; line-height: 1.4; margin-top: 10px; }

/* chat window (same look as the tool-call slide) */
.chat { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.35); }
.bar { display: flex; align-items: center; gap: 7px; padding: 10px 14px; background: var(--panel-2); border-bottom: 1px solid var(--line); }
.dot { width: 11px; height: 11px; border-radius: 50%; background: var(--line); }
.title { margin-left: 10px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--muted); letter-spacing: 0.08em; }
.msgs { display: flex; flex-direction: column; gap: 14px; padding: 18px; min-height: 500px; }
.msg { border-radius: 12px; padding: 10px 14px; font-size: 1.05rem; line-height: 1.45; max-width: 90%; }
.who { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
pre { margin: 0; font-family: 'JetBrains Mono', monospace; }
.user { align-self: flex-end; background: #0f2a33; border: 1px solid color-mix(in srgb, var(--ctx) 50%, transparent); }
.think { align-self: flex-start; color: var(--muted); font-style: italic; border: 1px dashed var(--line); }
.think .who { color: var(--dim); font-style: normal; }
.call { align-self: flex-start; background: #0b1d12; border: 1px solid var(--tool); }
.call .who { color: var(--tool); }
.call pre { font-size: 0.88rem; line-height: 1.5; color: var(--text); }
.result { align-self: flex-start; background: #0b1426; border: 1px dashed var(--rag); }
.result .who { color: var(--rag); }
.result .mono { font-size: 0.9rem; color: var(--text); }
.asst { align-self: flex-start; background: #2a1a0e; border: 1px solid color-mix(in srgb, var(--llm) 50%, transparent); }
</style>
