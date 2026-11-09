<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="sig">
    <span class="kw">def</span> <span class="fn">place_order</span>(<span class="p" :class="{ on: s >= 3 }" data-n="1">part_no: str</span>, <span class="p" :class="{ on: s >= 3 }" data-n="2">qty: int</span>, <span class="p" :class="{ on: s >= 3 }" data-n="3">tolerance_mm: float</span>)
  </div>

  <div class="grid">
    <div class="lane st" :class="{ on: s >= 1 }">
      <div class="head">Natural-language reply</div>
      <div class="reply chatty">Sure! Looks like they want about <b>450</b> of the <span class="nowrap">BRK-2207</span> brackets, and I think the tolerance was ±0.05 mm or so 😊</div>
      <div class="arrow">↓ your program</div>
      <pre class="code">place_order(reply)</pre>
      <div class="result bad">✗ TypeError: place_order() missing 2 required positional arguments: 'qty' and 'tolerance_mm'</div>
    </div>

    <div class="lane st" :class="{ on: s >= 2 }">
      <div class="head">Structured reply</div>
      <pre class="reply json">{
  <span class="k" :class="{ on: s >= 3 }" data-n="1">"part_no"</span>: "BRK-2207",
  <span class="k" :class="{ on: s >= 3 }" data-n="2">"qty"</span>: 450,
  <span class="k" :class="{ on: s >= 3 }" data-n="3">"tolerance_mm"</span>: 0.05
}</pre>
      <div class="arrow">↓ your program</div>
      <pre class="code">place_order(**json.loads(reply))</pre>
      <div class="result good st up" :class="{ on: s >= 4 }">✓ Ordered 450 × BRK-2207 @ ±0.05 mm</div>
    </div>
  </div>
</template>

<style scoped>
.sig {
  margin-top: 18px;
  background: #07080c; border: 1px solid var(--line); border-radius: 12px;
  padding: 18px 24px; font-family: 'JetBrains Mono', monospace; font-size: 1.5rem;
}
.kw { color: var(--muted); }
.fn { color: var(--tool); }
.p { position: relative; border-radius: 5px; outline-offset: 3px; transition: all 0.5s; }
.p.on { background: color-mix(in srgb, var(--json) 22%, transparent); outline: 1px solid var(--json); }
.p.on::after { top: -18px; right: -16px; }
.k.on::after { left: -32px; top: 50%; transform: translateY(-50%); }
.p.on::after, .k.on::after {
  content: attr(data-n); position: absolute; width: 22px; height: 22px; border-radius: 50%;
  background: var(--json); color: #000; font-size: 13px; font-weight: 700; line-height: 22px; text-align: center; font-family: 'JetBrains Mono', monospace;
}
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 32px; }
.lane { display: flex; flex-direction: column; gap: 16px; }
.head { font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.reply { border-radius: 14px; padding: 18px 22px; font-size: 1.35rem; line-height: 1.5; min-height: 184px; margin: 0; }
.nowrap { white-space: nowrap; }
.reply.chatty { background: #2a1a0e; border: 1px solid color-mix(in srgb, var(--llm) 50%, transparent); }
.reply.json { background: #241a07; border: 1px solid var(--json); color: var(--text); font-family: 'JetBrains Mono', monospace; font-size: 1.2rem; line-height: 1.6; padding: 14px 22px 14px 34px; }
.k { position: relative; color: var(--json); }
.arrow { font-family: 'JetBrains Mono', monospace; color: var(--muted); font-size: 1rem; text-align: center; }
.code { margin: 0; background: #07080c; border: 1px solid var(--line); border-radius: 12px; padding: 14px 20px; font-family: 'JetBrains Mono', monospace; font-size: 1.3rem; }
.result { border-radius: 12px; padding: 16px 20px; font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; line-height: 1.4; }
.result.bad { color: var(--bad); background: color-mix(in srgb, var(--bad) 10%, transparent); border: 1px solid var(--bad); }
.result.good { color: var(--tool); background: color-mix(in srgb, var(--tool) 10%, transparent); border: 1px solid var(--tool); font-size: 1.4rem; font-weight: 700; }
</style>
