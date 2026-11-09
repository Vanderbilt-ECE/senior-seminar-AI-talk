<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="grid">
    <div class="tile st pop" :class="{ on: s >= 1 }"><carbon-rule class="ic" /><b>Standards</b><span>ASME · IEEE · ASTM · ISO</span></div>
    <div class="tile st pop" :class="{ on: s >= 1 }"><carbon-building class="ic" /><b>Building codes</b><span>IBC, ACI, local amendments</span></div>
    <div class="tile st pop" :class="{ on: s >= 1 }"><carbon-chip class="ic" /><b>Datasheets</b><span>parts, materials, sensors</span></div>
    <div class="tile st pop" :class="{ on: s >= 1 }"><carbon-folder class="ic" /><b>Internal docs</b><span>SOPs, design guides, past reports</span></div>
    <div class="tile st pop" :class="{ on: s >= 1 }"><carbon-book class="ic" /><b>Literature</b><span>papers, theses, lab notebooks</span></div>
  </div>
  <div class="compare st up" :class="{ on: s >= 2 }">
    <div class="opt bad"><div><b>Retrain the model</b> on new data</div><span>slow · expensive · goes stale again</span></div>
    <div class="vs">vs</div>
    <div class="opt good"><div><b>Update the documents</b> it searches</div><span>minutes · cheap · cites its sources</span></div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 28px; }
.tile { background: color-mix(in srgb, var(--rag) 8%, var(--panel)); border: 1px solid color-mix(in srgb, var(--rag) 40%, var(--line)); border-radius: 16px; padding: 22px 14px; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
.ic { font-size: 2.4rem; color: var(--rag); }
b { font-size: 1.1rem; }
.tile span { color: var(--muted); font-size: 0.85rem; }
.compare { display: grid; grid-template-columns: 1fr 50px 1fr; align-items: center; gap: 14px; margin-top: 34px; }
.opt { border-radius: 12px; padding: 14px 18px; font-size: 1.1rem; display: flex; flex-direction: column; gap: 4px; }
.opt span { font-size: 0.9rem; color: var(--muted); }
.opt.bad { border: 1px solid var(--line); background: var(--panel); }
.opt.good { border: 1px solid var(--rag); background: color-mix(in srgb, var(--rag) 10%, transparent); }
.vs { text-align: center; color: var(--muted); font-family: 'JetBrains Mono', monospace; }
</style>
