<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="grid">
    <div class="card st up" :class="{ on: s >= 1 }" style="--c: var(--loop)">
      <carbon-terminal class="ic" />
      <div class="t">A coding agent</div>
      <div class="ex">Claude Code · Cursor · Copilot agent mode</div>
      <div class="try"><b>Try:</b> "Write tests for my lab-data parser, run them, and fix what fails."</div>
    </div>
    <div class="card st up" :class="{ on: s >= 2 }" style="--c: var(--rag)">
      <carbon-search class="ic" />
      <div class="t">A deep-research tool</div>
      <div class="ex">Deep research in Claude, ChatGPT, or Gemini</div>
      <div class="try"><b>Try:</b> "Compare actuator options for a 5 kg gripper, with sources." Then click every citation.</div>
    </div>
    <div class="card st up" :class="{ on: s >= 3 }" style="--c: var(--mcp)">
      <carbon-plug class="ic" />
      <div class="t">An MCP-connected assistant</div>
      <div class="ex">A desktop assistant + filesystem MCP server</div>
      <div class="try"><b>Try:</b> point it at a folder of datasheets and ask a design question.</div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 30px; }
.card { background: var(--panel); border: 1px solid var(--line); border-top: 4px solid var(--c); border-radius: 14px; padding: 22px; display: flex; flex-direction: column; gap: 10px; min-height: 300px; }
.ic { font-size: 2.4rem; color: var(--c); }
.t { font-size: 1.45rem; font-weight: 700; }
.ex { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; color: var(--muted); }
.try { margin-top: auto; font-size: 1rem; line-height: 1.45; background: #07080c; border-radius: 10px; padding: 12px 14px; }
.try b { color: var(--c); }
</style>
