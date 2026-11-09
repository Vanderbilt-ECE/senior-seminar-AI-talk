<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="wrap">
    <div class="col">
      <div class="head">Structured output (section 3)</div>
      <pre class="card amber">{
  "part_no": "BRK-2207",
  "qty": 450
}</pre>
    </div>

    <div class="mid st" :class="{ on: s >= 1 }">+ a name<br>=</div>

    <div class="col st" :class="{ on: s >= 1 }">
      <div class="head c-tool">Tool call</div>
      <pre class="card green"><span class="nm">{
  "tool": "check_inventory",</span>
  "args": {
    "part_no": "BRK-2207",
    "qty": 450
  }
<span class="nm">}</span></pre>
    </div>
  </div>

  <div class="defn st up" :class="{ on: s >= 2 }">
    <div class="head">You describe the tools up front (it's just more text in the context)</div>
    <div class="row mono">
      <span><b class="c-tool">name</b> check_inventory</span>
      <span><b class="c-tool">description</b> "Stock on hand for a part number"</span>
      <span><b class="c-tool">input schema</b> { part_no: string, qty: integer }</span>
    </div>
  </div>

  <div class="note st up" :class="{ on: s >= 3 }">The model doesn't call anything. It <b class="c-tool">writes a request</b> to call something.</div>
</template>

<style scoped>
.wrap { display: grid; grid-template-columns: 1fr 110px 1fr; align-items: center; gap: 18px; margin-top: 16px; }
.head { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
.card { margin: 0; border-radius: 14px; padding: 18px 22px; font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; line-height: 1.6; min-height: 240px; display: flex; align-items: center; }
.amber { background: #1a1405; border: 1px solid var(--json); color: var(--json); }
.green { background: #0b1d12; border: 1px solid var(--tool); color: var(--text); display: block; }
.green .nm { color: var(--tool); font-weight: 700; }
.mid { text-align: center; font-size: 1.2rem; color: var(--tool); font-weight: 700; line-height: 1.6; }
.defn { margin-top: 26px; background: var(--panel); border: 1px dashed var(--tool); border-radius: 12px; padding: 14px 20px; }
.row { display: flex; gap: 34px; font-size: 0.95rem; flex-wrap: wrap; }
.note { margin-top: 20px; font-size: 1.35rem; font-weight: 600; }
</style>
