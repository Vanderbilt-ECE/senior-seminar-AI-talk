<script setup lang="ts">
import { ref } from 'vue'
import { sCurve, useLinks } from '../composables/useLinks'
import { useStep } from '../composables/useStep'
const s = useStep()

// 1 user prompt · 2 model writes a tool call · 3 chatbot runs the Python
// (after the thinking block) … · 8 everything between question and answer
// folds into one line, the way most chatbots show it

const wrap = ref<HTMLElement>()
const callEl = ref<HTMLElement>()
const resultEl = ref<HTMLElement>()
const runEl = ref<HTMLElement>()
const retEl = ref<HTMLElement>()
const paths = ref({ out: '', back: '', outLbl: { x: 0, y: 0 }, backLbl: { x: 0, y: 0 } })

useLinks(wrap, (box) => {
  const c = box(callEl.value), res = box(resultEl.value), run = box(runEl.value), ret = box(retEl.value)
  if (!c || !res || !run || !ret) return
  // tool call (chat, right) → run line (script, left)
  const a = { x: c.l - 6, y: c.cy }, b = { x: run.r + 10, y: run.cy }
  // return line (script) → tool result (chat)
  const d = { x: ret.r + 10, y: ret.cy }, e = { x: res.l - 6, y: res.cy }
  paths.value = {
    out: sCurve(a.x, a.y, b.x, b.y),
    back: sCurve(d.x, d.y, e.x, e.y),
    outLbl: { x: (a.x + b.x) / 2, y: Math.min(a.y, b.y) - 12 },
    backLbl: { x: (d.x + e.x) / 2, y: Math.max(d.y, e.y) + 24 },
  }
})
</script>

<template>
  <div ref="wrap" class="wrap">
    <!-- left: the Python that actually runs -->
    <div class="left">
    <div class="script" :class="{ live: s >= 4 && s < 8 }">
      <div class="head">calculator.py · runs on a computer</div>
      <pre class="code"><span class="kw">def</span> <span class="fn">calculator</span>(expr: <span class="ty">str</span>) -> <span class="ty">float</span>:
    <span class="doc">"""Do the arithmetic."""</span>
    <span class="kw">return</span> safe_eval(expr)</pre>
      <div ref="runEl" class="exec st" :class="{ on: s >= 4 }">
        <span class="lbl">▶ run</span> calculator("6*5000*2/(0.05*0.1**2)")
      </div>
      <div ref="retEl" class="exec ret st" :class="{ on: s >= 5 }">
        <span class="lbl">↩ return</span> 120000000.0
      </div>
    </div>
    <div class="note st up" :class="{ on: s >= 7 }">
      <!-- Both sentences share one grid cell so the note keeps the taller one's
           height and the code box above never shifts when they swap. -->
      <span :class="{ gone: s >= 8 }">The model only <b class="c-tool">wrote a request</b>. The chatbot ran real code and handed back the result.</span>
      <span :class="{ gone: s < 8 }">Most chatbots <b class="c-tool">hide all of this</b> and just show you the answer. But this is what's happening underneath.</span>
    </div>
    </div>

    <!-- arrows between chat and script -->
    <svg class="links" aria-hidden="true">
      <defs>
        <marker id="tc-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="#22c55e" />
        </marker>
      </defs>
      <g class="st" :class="{ on: s >= 4 && s < 8 }">
        <path :d="paths.out" fill="none" stroke="#22c55e" stroke-width="2.5" class="flow" marker-end="url(#tc-ah)" />
        <text :x="paths.outLbl.x" :y="paths.outLbl.y - 18" text-anchor="middle" class="mono" font-size="14" fill="#22c55e"><tspan :x="paths.outLbl.x">the chatbot</tspan><tspan :x="paths.outLbl.x" dy="18">runs it</tspan></text>
      </g>
      <g class="st" :class="{ on: s >= 5 && s < 8 }">
        <path :d="paths.back" fill="none" stroke="#22c55e" stroke-width="2.5" class="flow" marker-end="url(#tc-ah)" />
        <text :x="paths.backLbl.x" :y="paths.backLbl.y" text-anchor="middle" class="mono" font-size="14" fill="#22c55e"><tspan :x="paths.backLbl.x">result goes</tspan><tspan :x="paths.backLbl.x" dy="18">back in</tspan></text>
      </g>
    </svg>

    <!-- right: the chat window -->
    <div class="chat">
      <div class="bar">
        <span class="dot" /><span class="dot" /><span class="dot" />
        <span class="title">Chatbot</span>
      </div>
      <div class="msgs">
        <div class="msg user st up" :class="{ on: s >= 1 }">
          What is the max bending stress in a 2 m steel cantilever with a 5 kN tip load and a 50 × 100 mm section?
        </div>

        <div class="work">
        <div class="fold" :class="{ on: s >= 8 }">
          <span class="chev">▸</span> Estimating the bending stress…
        </div>
        <div class="steps" :class="{ folded: s >= 8 }">
        <div class="msg think st up" :class="{ on: s >= 2 }">
          <div class="who">thinking</div>
          I need to calculate this precisely.
        </div>

        <div ref="callEl" class="msg call st up" :class="{ on: s >= 3 }">
          <div class="who">model · tool call</div>
          <pre>{"tool": "calculator",
 "args": {"expr": "6*5000*2/(0.05*0.1**2)"}}</pre>
        </div>

        <div ref="resultEl" class="msg result st up" :class="{ on: s >= 5 }">
          <div class="who">tool result</div>
          <span class="mono">1.2e8</span>
        </div>
        </div>
        </div>

        <div class="msg asst st up" :class="{ on: s >= 6 }">
          The max bending stress is about <b>120 MPa</b>. Against A36 yield (250 MPa), that's a safety factor of about <b>2.1</b>.
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.wrap { position: relative; display: grid; grid-template-columns: 440px 1fr; gap: 170px; align-items: center; }
.links { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; z-index: 2; }

.head { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
.script { display: flex; flex-direction: column; gap: 10px; opacity: 0.55; transition: opacity 0.5s; }
.script.live { opacity: 1; }
pre { margin: 0; font-family: 'JetBrains Mono', monospace; }
.code { background: #07080c; border: 1px solid var(--line); border-radius: 14px; padding: 16px 20px; font-size: 1rem; line-height: 1.6; }
.script.live .code { border-color: var(--tool); }
.kw { color: #c084fc; } .fn { color: var(--tool); font-weight: 700; } .ty { color: var(--ctx); }
.doc { color: var(--muted); font-style: italic; }
.exec { font-family: 'JetBrains Mono', monospace; font-size: 0.92rem; padding: 10px 14px; border-radius: 10px; background: #0b1d12; border: 1px solid color-mix(in srgb, var(--tool) 55%, transparent); }
.exec .lbl { color: var(--tool); font-weight: 700; margin-right: 8px; }
.exec.ret { font-size: 1.05rem; }

.chat { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.35); }
.bar { display: flex; align-items: center; gap: 7px; padding: 10px 14px; background: var(--panel-2); border-bottom: 1px solid var(--line); }
.dot { width: 11px; height: 11px; border-radius: 50%; background: var(--line); }
.title { margin-left: 10px; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--muted); letter-spacing: 0.08em; }
.msgs { display: flex; flex-direction: column; gap: 14px; padding: 18px; min-height: 500px; }
.msg { border-radius: 12px; padding: 10px 14px; font-size: 1.05rem; line-height: 1.45; max-width: 88%; }
.who { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
.user { align-self: flex-end; background: #0f2a33; border: 1px solid color-mix(in srgb, var(--ctx) 50%, transparent); }
.call { align-self: flex-start; background: #0b1d12; border: 1px solid var(--tool); }
.call .who { color: var(--tool); }
.call pre { font-size: 0.92rem; line-height: 1.5; color: var(--text); }
.result { align-self: flex-start; background: #07080c; border: 1px dashed var(--tool); }
.result .who { color: var(--muted); }
.result .mono { font-size: 1.1rem; color: var(--tool); font-weight: 700; }
.think { align-self: flex-start; color: var(--muted); font-style: italic; border: 1px dashed var(--line); background: transparent; }
.think .who { color: var(--dim); font-style: normal; }
.work { display: flex; flex-direction: column; }
.steps { display: flex; flex-direction: column; gap: 14px; max-height: 420px; transition: max-height 0.7s var(--ease), opacity 0.4s; }
.steps.folded { max-height: 0; opacity: 0; overflow: hidden; }
.fold {
  align-self: flex-start; max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.7s var(--ease), opacity 0.5s 0.2s;
  font-size: 1.05rem; color: var(--muted); font-style: italic; border-radius: 10px;
  background: var(--panel-2); border: 1px solid var(--line); padding: 0 14px;
}
.fold.on { max-height: 60px; opacity: 1; padding: 9px 14px; }
.fold .chev { font-style: normal; color: var(--dim); margin-right: 6px; }
.asst { align-self: flex-start; background: #2a1a0e; border: 1px solid color-mix(in srgb, var(--llm) 50%, transparent); }

.left { display: flex; flex-direction: column; gap: 34px; }
.note { font-size: 1.25rem; font-weight: 600; line-height: 1.4; display: grid; }
.note > span { grid-area: 1 / 1; transition: opacity 0.4s; }
.note > span.gone { opacity: 0; }
</style>
