<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="grid">
    <div class="tile st pop" :class="{ on: s >= 1 }"><carbon-calculator class="ic" /><b>Calculator</b><code>calc("6*1e4/5e-4")</code></div>
    <div class="tile st pop" :class="{ on: s >= 1 }"><carbon-terminal class="ic" /><b>Code executor</b><code>run_python(code)</code></div>
    <div class="tile st pop" :class="{ on: s >= 1 }"><carbon-search class="ic" /><b>Web search</b><code>search("A36 yield")</code></div>
    <div class="tile st pop" :class="{ on: s >= 1 }"><carbon-document class="ic" /><b>File reader</b><code>read_file("spec.pdf")</code></div>
    <div class="tile st pop" :class="{ on: s >= 2 }"><carbon-chart-line-data class="ic" /><b>Simulator</b><code>run_spice(netlist)</code></div>
    <div class="tile st pop" :class="{ on: s >= 2 }"><carbon-data-base class="ic" /><b>Database</b><code>sql("SELECT …")</code></div>
    <div class="tile st pop" :class="{ on: s >= 2 }"><carbon-cube class="ic" /><b>CAD</b><code>cad.extrude(sk, 5)</code></div>
    <div class="tile st pop" :class="{ on: s >= 2 }"><carbon-chip class="ic" /><b>EDA</b><code>drc_check(board)</code></div>
  </div>
  <div class="note st up" :class="{ on: s >= 3 }">If you can call it from code, you can make it a tool.</div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 26px; }
.tile {
  background: color-mix(in srgb, var(--tool) 7%, var(--panel)); border: 1px solid color-mix(in srgb, var(--tool) 35%, var(--line));
  border-radius: 16px; padding: 22px 18px; display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center;
}
.ic { font-size: 2.6rem; color: var(--tool); }
b { font-size: 1.15rem; }
code { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--muted); background: transparent; }
.note { margin-top: 30px; font-size: 1.4rem; font-weight: 600; text-align: center; }
</style>
