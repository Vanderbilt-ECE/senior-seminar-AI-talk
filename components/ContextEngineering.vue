<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

const blocks = [
  { k: 'Goal', c: 'var(--json)', t: 'Cut bracket mass by ≥ 20 %' },
  { k: 'Constraints', c: 'var(--bad)', t: '6061-T6 · SF ≥ 2 at 1.2 kN · 3-axis CNC · keep the hole pattern' },
  { k: 'Example', c: 'var(--llm)', t: 'lightened_bracket_v2.step: what "good" looked like last time' },
  { k: 'Files', c: 'var(--rag)', t: 'bracket.step · loads.csv · fea.py' },
  { k: 'How to check', c: 'var(--tool)', t: 'run fea.py → max σ < 138 MPa; report mass before/after' },
]
</script>

<template>
  <div class="grid">
    <div class="side">
      <div class="head">Vague</div>
      <div class="win">
        <div class="blk" style="--c: var(--ctx)"><b>Ask</b> make the bracket better</div>
      </div>
      <div class="out bad">Lighter? Cheaper? Prettier? Stronger? The agent has to <b>guess</b>.</div>
    </div>
    <div class="side">
      <div class="head c-ctx">Engineered</div>
      <div class="win">
        <div v-for="(b, i) in blocks" :key="b.k" class="blk st up" :class="{ on: s >= i + 1 }" :style="{ '--c': b.c }">
          <b>{{ b.k }}</b> {{ b.t }}
        </div>
      </div>
      <div class="out good st" :class="{ on: s >= 5 }">The agent knows what done looks like and can check it.</div>
    </div>
  </div>
  <div class="note st up" :class="{ on: s >= 6 }">Clear goals, constraints, examples, and files beat clever wording.</div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 30px; margin-top: 16px; }
.head { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
.win { border: 2px solid var(--ctx); border-radius: 12px; padding: 10px; height: 330px; display: flex; flex-direction: column; gap: 8px; background: color-mix(in srgb, var(--ctx) 3%, transparent); }
.blk { border-left: 4px solid var(--c); background: color-mix(in srgb, var(--c) 12%, var(--panel)); border-radius: 6px; padding: 9px 12px; font-size: 1rem; line-height: 1.35; }
.blk b { color: var(--c); margin-right: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; }
.out { margin-top: 12px; font-size: 1rem; padding: 10px 14px; border-radius: 10px; }
.out.bad { color: var(--bad); background: color-mix(in srgb, var(--bad) 8%, transparent); }
.out.good { color: var(--tool); background: color-mix(in srgb, var(--tool) 8%, transparent); }
.note { margin-top: 14px; font-size: 1.4rem; font-weight: 700; }
</style>
