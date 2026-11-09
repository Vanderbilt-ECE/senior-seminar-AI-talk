<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="grid">
    <div class="lane">
      <div class="head">Free-form reply</div>
      <div class="reply chatty">Sure! Looks like they want about <b>450</b> of the BRK-2207 brackets, and I think the tolerance was ±0.05 mm or so 😊</div>
      <div class="arrow">↓ your program</div>
      <pre class="code">qty = int(reply)</pre>
      <div class="result bad st up" :class="{ on: s >= 1 }">
        ✗ ValueError: invalid literal for int(): 'Sure! Looks like they…'
      </div>
    </div>

    <div class="lane st" :class="{ on: s >= 2 }">
      <div class="head">Structured reply</div>
      <pre class="reply json">{
  "part_no": "BRK-2207",
  "qty": 450,
  "tolerance_mm": 0.05
}</pre>
      <div class="arrow">↓ your program</div>
      <pre class="code">qty = json.loads(reply)["qty"]</pre>
      <div class="result good st up" :class="{ on: s >= 3 }">✓ 450</div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 22px; }
.lane { display: flex; flex-direction: column; gap: 14px; }
.head { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.reply { border-radius: 12px; padding: 16px 18px; font-size: 1.15rem; line-height: 1.5; min-height: 118px; margin: 0; }
.reply.chatty { background: #2a1a0e; border: 1px solid color-mix(in srgb, var(--llm) 50%, transparent); }
.reply.json { background: #241a07; border: 1px solid var(--json); color: var(--json); font-family: 'JetBrains Mono', monospace; font-size: 0.95rem; line-height: 1.45; padding: 10px 18px; }
.arrow { font-family: 'JetBrains Mono', monospace; color: var(--muted); font-size: 0.85rem; text-align: center; }
.code { margin: 0; background: #07080c; border: 1px solid var(--line); border-radius: 10px; padding: 12px 16px; font-family: 'JetBrains Mono', monospace; font-size: 1.05rem; }
.result { border-radius: 10px; padding: 14px 16px; font-family: 'JetBrains Mono', monospace; font-size: 1rem; }
.result.bad { color: var(--bad); background: color-mix(in srgb, var(--bad) 10%, transparent); border: 1px solid var(--bad); }
.result.good { color: var(--tool); background: color-mix(in srgb, var(--tool) 10%, transparent); border: 1px solid var(--tool); font-size: 1.4rem; font-weight: 700; }
</style>
