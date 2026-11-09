<script setup lang="ts">
// One line of a demo's loop trace. `kind` colors it: act (tool call),
// obs (observation), think, bad (failed check), good (passed check).
defineProps<{ kind: 'act' | 'obs' | 'think' | 'bad' | 'good'; on: boolean }>()
</script>

<template>
  <div class="ts st left" :class="[kind, { on }]"><slot /></div>
</template>

<style scoped>
.ts { font-family: 'JetBrains Mono', monospace; font-size: 0.76rem; line-height: 1.35; padding: 4px 8px; border-left: 3px solid var(--line); border-radius: 3px; background: #0b0d12; }
.act { border-left-color: var(--tool); color: var(--tool); }
.obs { border-left-color: var(--ctx); color: var(--ctx); }
.think { border-left-color: var(--llm); color: #fdba74; font-family: 'Inter', sans-serif; font-style: italic; font-size: 0.82rem; }
.bad { border-left-color: var(--bad); color: var(--bad); background: color-mix(in srgb, var(--bad) 10%, #0b0d12); }
.good { border-left-color: var(--tool); color: var(--text); background: color-mix(in srgb, var(--tool) 12%, #0b0d12); font-weight: 600; }
</style>
