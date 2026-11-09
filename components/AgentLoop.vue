<script setup lang="ts">
import { computed } from 'vue'
import { useStep } from '../composables/useStep'
const s = useStep()

// One iteration of think → act → observe per click.
const iters = [
  { think: 'I need the test data first.', act: 'list_files("logs/")', obs: 'step_test_0412.csv, notes.md' },
  { think: 'Load it and compute overshoot.', act: 'run_python(overshoot(df["velocity"]))', obs: "✕ KeyError: 'velocity'", bad: true },
  { think: 'Wrong column name. Check the header.', act: 'run_python(print(df.columns))', obs: "['t', 'omega_rad_s', 'cmd']" },
  { think: 'Use omega_rad_s instead.', act: 'run_python(overshoot(df["omega_rad_s"]))', obs: 'overshoot = 12.4 %, plot.png saved' },
]
const n = computed(() => Math.min(s.value, iters.length))
const done = computed(() => s.value > iters.length)
const R = 140
const phases = [
  { name: 'THINK', a: -90, c: '#f97316' },
  { name: 'ACT', a: 30, c: '#22c55e' },
  { name: 'OBSERVE', a: 150, c: '#22d3ee' },
]
const pos = (a: number) => ({ x: 200 + R * Math.cos((a * Math.PI) / 180), y: 210 + R * Math.sin((a * Math.PI) / 180) })
</script>

<template>
  <div class="task mono"><span class="lbl">Task:</span>"Report the overshoot of the motor controller's step response."</div>
  <div class="grid">
    <svg viewBox="0 0 400 445" class="w-full">
      <circle cx="200" cy="210" :r="R" fill="none" stroke="#2a3142" stroke-width="10" />
      <circle cx="200" cy="210" :r="R" fill="none" stroke="#2dd4bf" stroke-width="4" class="flow" opacity="0.8" />
      <g v-if="n > 0 && !done" :key="'orb' + n" class="orb">
        <circle cx="200" :cy="210 - R" r="11" fill="#2dd4bf" />
      </g>
      <g v-for="p in phases" :key="p.name">
        <circle :cx="pos(p.a).x" :cy="pos(p.a).y" r="44" fill="#131722" :stroke="p.c" stroke-width="3" />
        <text :x="pos(p.a).x" :y="pos(p.a).y + 5" text-anchor="middle" font-size="14" font-weight="700" :fill="p.c" class="mono">{{ p.name }}</text>
      </g>
      <text x="200" y="205" text-anchor="middle" font-size="44" font-weight="800" :fill="done ? '#22c55e' : '#e6e8ee'">{{ done ? '✓' : n }}</text>
      <text x="200" y="232" text-anchor="middle" font-size="13" fill="#7a8194" class="mono">{{ done ? 'done' : 'iteration' }}</text>

      <!-- done? diamond -->
      <g :class="{ lit: done }" class="diamond">
        <path d="M200 372 L 240 402 L 200 432 L 160 402 Z" fill="#131722" stroke="#7a8194" stroke-width="2" />
        <text x="200" y="407" text-anchor="middle" font-size="13" fill="#e6e8ee">done?</text>
      </g>
    </svg>

    <div class="log">
      <div v-for="(it, i) in iters" :key="i" class="it st up" :class="{ on: i < n, cur: i === n - 1 && !done }">
        <div class="idx mono">{{ i + 1 }}</div>
        <div class="body">
          <div class="think">{{ it.think }}</div>
          <div class="act mono">{{ it.act }}</div>
          <div class="obs mono" :class="{ bad: it.bad }">→ {{ it.obs }}</div>
        </div>
      </div>
      <div class="final st up" :class="{ on: done }">
        <b>Overshoot: 12.4 %</b> (plot attached). Note: column names differ from the spec.
      </div>
    </div>
  </div>
</template>

<style scoped>
.task { display: inline-block; font-size: 1.2rem; line-height: 1.4; color: var(--text); background: var(--panel); border: 1px solid var(--line); border-left: 4px solid var(--loop); border-radius: 8px; padding: 6px 14px; }
.task .lbl { color: var(--loop); font-weight: 700; margin-right: 6px; }
.grid { display: grid; grid-template-columns: 360px 1fr; gap: 36px; margin-top: 8px; align-items: start; }
.orb { transform-origin: 200px 210px; animation: orbit 1.6s var(--ease) forwards; }
@keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.diamond path { transition: all 0.5s; }
.diamond.lit path { stroke: var(--tool); fill: color-mix(in srgb, var(--tool) 20%, #131722); }
.log { display: flex; flex-direction: column; gap: 8px; }
.it { display: grid; grid-template-columns: 30px 1fr; gap: 10px; background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 7px 12px; }
.it.cur { border-color: var(--loop); box-shadow: 0 0 16px color-mix(in srgb, var(--loop) 25%, transparent); }
.idx { color: var(--loop); font-weight: 700; font-size: 1.1rem; }
.think { color: #fdba74; font-style: italic; font-size: 0.92rem; }
.act { color: var(--tool); font-size: 0.82rem; }
.obs { color: var(--ctx); font-size: 0.82rem; }
.obs.bad { color: var(--bad); }
.final { background: color-mix(in srgb, var(--tool) 10%, transparent); border: 1px solid var(--tool); border-radius: 10px; padding: 10px 14px; font-size: 1rem; }
</style>
