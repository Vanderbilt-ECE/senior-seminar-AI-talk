<script setup lang="ts">
import { computed } from 'vue'
import { useStep } from '../composables/useStep'
const s = useStep()

// Hole spacing: 38 mm on the first attempt; the code is fixed at step 4
// and the re-render at step 5 shows 40 mm.
const spacing = computed(() => (s.value >= 5 ? 40 : 38))
const fixed = computed(() => s.value >= 5)
const k = 5 // px per mm
const cx = 210
const h1 = computed(() => cx - (spacing.value / 2) * k)
const h2 = computed(() => cx + (spacing.value / 2) * k)
</script>

<template>
  <DemoFrame
    task="Mounting bracket: 60 × 30 × 5 mm plate, two Ø6.5 holes, 40 mm apart center-to-center."
    :tools="['write_file', 'run_cadquery', 'render', 'measure']"
    verify="Dimensions measured from the model, not trusted from the code."
    :verify-on="s >= 6"
  >
    <div class="split">
      <pre class="code st" :class="{ on: s >= 1 }"><span class="kw">import</span> cadquery <span class="kw">as</span> cq

bracket = (
  cq.Workplane(<span class="str">"XY"</span>)
  .box(<span class="num">60</span>, <span class="num">30</span>, <span class="num">5</span>)
  .faces(<span class="str">">Z"</span>).workplane()
  .pushPoints([<span :class="{ old: s === 3, new: s >= 4 }">(<span class="num">{{ s >= 4 ? -20 : -19 }}</span>, <span class="num">0</span>), (<span class="num">{{ s >= 4 ? 20 : 19 }}</span>, <span class="num">0</span>)</span>])
  .hole(<span class="num">6.5</span>)
)
cq.exporters.export(bracket, <span class="str">"bracket.step"</span>)</pre>

      <div class="render st" :class="{ on: s >= 2 }">
        <div class="tag mono">render.png</div>
        <svg viewBox="0 0 420 330" class="w-full">
          <!-- top view -->
          <rect x="60" y="110" width="300" height="150" rx="6" fill="#1e293b" stroke="#94a3b8" stroke-width="2" />
          <circle :cx="h1" cy="185" r="16" fill="#07080c" stroke="#94a3b8" stroke-width="2" style="transition: cx .8s var(--ease)" />
          <circle :cx="h2" cy="185" r="16" fill="#07080c" stroke="#94a3b8" stroke-width="2" style="transition: cx .8s var(--ease)" />
          <line :x1="h1" y1="185" :x2="h2" y2="185" stroke="#475569" stroke-dasharray="3 4" />
          <!-- dimension -->
          <g class="st" :class="{ on: s >= 3 }">
            <line :x1="h1" y1="168" :x2="h1" y2="70" :stroke="fixed ? '#22c55e' : '#ef4444'" stroke-width="1.5" />
            <line :x1="h2" y1="168" :x2="h2" y2="70" :stroke="fixed ? '#22c55e' : '#ef4444'" stroke-width="1.5" />
            <line :x1="h1 + 4" y1="80" :x2="h2 - 4" y2="80" :stroke="fixed ? '#22c55e' : '#ef4444'" stroke-width="2" />
            <path :d="`M${h1} 80 l10 -5 v10 z M${h2} 80 l-10 -5 v10 z`" :fill="fixed ? '#22c55e' : '#ef4444'" />
            <rect x="160" y="40" width="100" height="28" rx="6" :fill="fixed ? '#0b1d12' : '#1d1012'" />
            <text x="210" y="60" text-anchor="middle" font-size="18" font-weight="700" :fill="fixed ? '#22c55e' : '#ef4444'" class="mono" :class="{ flash: s === 3 }">{{ fixed ? '40.0' : '38.0' }} mm</text>
          </g>
          <text x="210" y="300" text-anchor="middle" font-size="14" class="mono" :fill="fixed ? '#22c55e' : s >= 3 ? '#ef4444' : '#7a8194'">
            {{ fixed ? '✓ matches spec (40.0)' : s >= 3 ? '✕ spec: 40.0 mm c-c' : 'top view' }}
          </text>
        </svg>
      </div>
    </div>

    <template #trace>
      <TraceStep kind="act" :on="s >= 1">write_file("bracket.py")</TraceStep>
      <TraceStep kind="act" :on="s >= 2">run_cadquery → render</TraceStep>
      <TraceStep kind="obs" :on="s >= 2">bracket.step, render.png</TraceStep>
      <TraceStep kind="act" :on="s >= 3">measure("hole spacing")</TraceStep>
      <TraceStep kind="bad" :on="s >= 3">38.0 mm ✕ spec 40.0</TraceStep>
      <TraceStep kind="think" :on="s >= 4">Used ±19 from center. 40 mm c-c means ±20.</TraceStep>
      <TraceStep kind="act" :on="s >= 4">edit line 7: ±19 → ±20</TraceStep>
      <TraceStep kind="act" :on="s >= 5">run_cadquery → render → measure</TraceStep>
      <TraceStep kind="good" :on="s >= 5">40.0 mm ✓</TraceStep>
      <TraceStep kind="good" :on="s >= 6">wall 5.0 ✓ · Ø6.5 ✓ · envelope ✓ → done</TraceStep>
    </template>
  </DemoFrame>
</template>

<style scoped>
.split { display: grid; grid-template-columns: 1.05fr 1fr; height: 100%; }
.code { margin: 0; padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; line-height: 1.7; border-right: 1px solid var(--line); }
.kw { color: #fb923c; } .str { color: #a3e635; } .num { color: #facc15; }
.old { background: color-mix(in srgb, var(--bad) 25%, transparent); outline: 1px solid var(--bad); border-radius: 3px; }
.new { background: color-mix(in srgb, var(--tool) 22%, transparent); outline: 1px solid var(--tool); border-radius: 3px; }
.render { position: relative; display: flex; align-items: center; padding: 8px; }
.tag { position: absolute; top: 8px; left: 12px; font-size: 0.68rem; color: var(--muted); }
.flash { animation: flash 0.5s steps(2) 3; }
@keyframes flash { 50% { opacity: 0.2; } }
</style>
