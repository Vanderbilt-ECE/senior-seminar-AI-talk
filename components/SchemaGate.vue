<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

// Constrained decoding: at the "qty" position, tokens that can't satisfy
// the schema (integer) are masked out before sampling.
const cands = [
  { w: '450', p: 0.55, ok: true },
  { w: '"about 450"', p: 0.25, ok: false },
  { w: '"lots"', p: 0.12, ok: false },
  { w: 'null', p: 0.08, ok: false },
]
</script>

<template>
  <div class="grid">
    <div class="schema">
      <div class="tag">schema (you provide)</div>
      <pre>{
  "part_no":      string,
  "qty":          integer,
  "tolerance_mm": number
}</pre>
    </div>

    <div class="gen st left" :class="{ on: s >= 1 }">
      <div class="tag" style="color: var(--llm)">model is writing…</div>
      <div class="out mono">
        {"part_no": "BRK-2207", "qty": <span v-if="s < 4" class="cur blink">▍</span><span v-else class="c-tool">450, "tolerance_mm": 0.05}</span>
      </div>

      <div class="bars st" :class="{ on: s >= 2 }">
        <div v-for="c in cands" :key="c.w" class="row" :class="{ masked: s >= 3 && !c.ok, win: s >= 3 && c.ok }">
          <span class="w mono">{{ c.w }}</span>
          <span class="track"><span class="fill" :style="{ width: `${(s >= 3 ? (c.ok ? 1 : 0) : c.p) * 100}%` }" /></span>
          <span class="x">{{ s >= 3 && !c.ok ? '✕ not an integer' : '' }}</span>
        </div>
      </div>

      <div class="verdict st up" :class="{ on: s >= 4 }">✓ Output is guaranteed to parse.</div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 360px 1fr; gap: 44px; margin-top: 22px; }
.tag { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--json); margin-bottom: 8px; }
.schema pre { margin: 0; background: #1a1405; border: 1px solid var(--json); border-radius: 14px; padding: 20px; font-family: 'JetBrains Mono', monospace; font-size: 1.05rem; line-height: 1.8; color: var(--json); }
.out { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; font-size: 1.05rem; }
.cur { color: var(--llm); }
.bars { margin-top: 22px; }
.row { display: grid; grid-template-columns: 150px 1fr 160px; gap: 14px; align-items: center; margin: 10px 0; transition: opacity 0.5s; }
.w { text-align: right; font-size: 1.05rem; }
.track { height: 24px; background: var(--panel); border-radius: 6px; overflow: hidden; }
.fill { display: block; height: 100%; background: color-mix(in srgb, var(--llm) 55%, transparent); transition: width 0.8s var(--ease); }
.row.masked { opacity: 0.45; }
.row.masked .w { text-decoration: line-through; color: var(--bad); }
.row.win .fill { background: var(--tool); }
.row.win .w { color: var(--tool); font-weight: 700; }
.x { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--bad); }
.verdict { margin-top: 18px; font-size: 1.3rem; font-weight: 700; color: var(--tool); }
</style>
