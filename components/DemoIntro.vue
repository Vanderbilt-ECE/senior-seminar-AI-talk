<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

const panels = [
  { k: 'Task', c: 'var(--text)', d: 'what we asked for, in one sentence' },
  { k: 'Tools', c: 'var(--tool)', d: 'what the agent is allowed to call' },
  { k: 'Loop', c: 'var(--loop)', d: 'what it actually did, step by step' },
  { k: 'Verify', c: 'var(--human)', d: 'how you would check the result' },
]
const demos = [
  { f: 'Mechanical · Biomedical', t: 'CAD part from a spec', tools: 'CadQuery · render · measure' },
  { f: 'Electrical · Computer', t: 'Filter design in SPICE', tools: 'netlist · ngspice · plot' },
  { f: 'Civil · Chemical', t: 'Code question with citations', tools: 'search · read clause' },
]
</script>

<template>
  <div class="panels">
    <div v-for="p in panels" :key="p.k" class="p" :style="{ '--c': p.c }">
      <b>{{ p.k }}</b><span>{{ p.d }}</span>
    </div>
  </div>
  <div class="demos">
    <div v-for="(d, i) in demos" :key="d.t" class="d st up" :class="{ on: s >= i + 1 }">
      <div class="f mono">{{ d.f }}</div>
      <div class="t">{{ d.t }}</div>
      <div class="tl mono">{{ d.tools }}</div>
    </div>
  </div>
</template>

<style scoped>
.panels { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 26px; }
.p { border-top: 4px solid var(--c); background: var(--panel); border-radius: 8px; padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; }
.p b { color: var(--c); font-size: 1.2rem; }
.p span { color: var(--muted); font-size: 0.92rem; }
.demos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 34px; }
.d { border: 1px solid var(--line); border-radius: 14px; padding: 18px 20px; background: linear-gradient(160deg, color-mix(in srgb, var(--loop) 8%, var(--panel)), var(--panel)); }
.f { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.t { font-size: 1.4rem; font-weight: 700; margin: 6px 0 8px; }
.tl { font-size: 0.8rem; color: var(--tool); }
</style>
