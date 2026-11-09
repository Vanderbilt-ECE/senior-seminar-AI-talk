<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="grid">
    <div class="t st pop" :class="{ on: s >= 1 }"><carbon-application-web class="ic" /><div><b>Browser automation</b><span>Playwright CLI or MCP: click, screenshot, read the console</span></div></div>
    <div class="t st pop" :class="{ on: s >= 1 }"><carbon-checkmark-outline class="ic" /><div><b>Unit &amp; integration tests</b><span>pass/fail output the agent can read and act on</span></div></div>
    <div class="t st pop" :class="{ on: s >= 1 }"><carbon-code class="ic" /><div><b>Type checkers &amp; linters</b><span>catch whole classes of bugs before anything runs</span></div></div>

    <div class="t st pop" :class="{ on: s >= 2 }"><carbon-chart-line-data class="ic" /><div><b>Simulators as ground truth</b><span>SPICE, FEA, CFD: physics doesn't hallucinate</span></div></div>
    <div class="t st pop" :class="{ on: s >= 2 }"><carbon-view class="ic" /><div><b>Render &amp; look</b><span>CAD views, plots, PCB layouts fed back as images</span></div></div>
    <div class="t st pop" :class="{ on: s >= 2 }"><carbon-ruler class="ic" /><div><b>Sanity assertions</b><span>units, ranges, conservation of mass and energy</span></div></div>

    <div class="t st pop" :class="{ on: s >= 3 }"><carbon-user-multiple class="ic" /><div><b>Second agent as reviewer</b><span>fresh context critiques the work, not the reasoning that produced it</span></div></div>
    <div class="t st pop" :class="{ on: s >= 3 }"><carbon-trophy class="ic" /><div><b>Golden cases</b><span>known answers it must reproduce first</span></div></div>
    <div class="t st pop" :class="{ on: s >= 3 }"><carbon-terminal class="ic" /><div><b>Logs &amp; tracebacks</b><span>pipe errors back in instead of hiding them</span></div></div>
  </div>
  <div class="tip st up" :class="{ on: s >= 4 }">
    Put it in the instructions: <span class="mono">"After every change, run the tests and screenshot the page. Show me the evidence."</span>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 18px; }
.t { display: flex; gap: 14px; align-items: flex-start; background: var(--panel); border: 1px solid color-mix(in srgb, var(--ctx) 30%, var(--line)); border-radius: 12px; padding: 13px 15px; }
.ic { font-size: 1.7rem; color: var(--ctx); flex-shrink: 0; margin-top: 2px; }
b { display: block; font-size: 1.02rem; margin-bottom: 2px; }
span { display: block; color: var(--muted); font-size: 0.85rem; line-height: 1.35; }
.tip { margin-top: 18px; font-size: 1.05rem; background: color-mix(in srgb, var(--tool) 8%, transparent); border-left: 4px solid var(--tool); padding: 10px 14px; border-radius: 4px; }
.tip .mono { color: var(--tool); font-size: 0.92rem; }
</style>
