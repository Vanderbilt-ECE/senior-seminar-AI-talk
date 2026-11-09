<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

// Swiss-cheese model: each layer has holes; errors that slip through one
// layer get caught by the next.
const layers = [
  { x: 360, name: 'Automated checks', sub: 'tests · sims · assertions', q: ['Does the code compile', 'without errors?'], c: '#22c55e', holes: [320, 380] },
  { x: 610, name: 'Independent check', sub: 'second method · hand calc · reviewer agent', q: ['Do the screenshots', 'look good?'], c: '#3b82f6', holes: [380, 170] },
  { x: 860, name: 'Human review', sub: 'for high-stakes decisions', q: ['Does the tool do', 'what it needs to?'], c: '#e5e7eb', holes: [230] },
]
// Five evenly spaced errors. `stop` = index of the layer that catches it.
const errs = [
  { y: 140, stop: 0 }, { y: 200, stop: 0 }, { y: 260, stop: 0 },
  { y: 320, stop: 1 }, { y: 380, stop: 2 },
]
// Before any layer: short stubs on the left. Each click adds a layer; errors it
// catches stop at its face, the rest pass through toward the next layer.
const endX = (e: { stop: number }) => {
  const n = Math.min(s.value, layers.length)
  if (n === 0) return 180
  if (e.stop < n) return layers[e.stop].x - 6
  return layers[n - 1].x + 36 + 110
}
</script>

<template>
  <svg viewBox="0 0 1180 470" class="w-full">
    <text x="40" y="70" font-size="15" fill="#7a8194" class="mono">AGENT OUTPUT</text>
    <text x="40" y="90" font-size="13" fill="#ef4444" class="mono">5 hidden errors</text>

    <g v-for="(l, i) in layers" :key="l.name" class="st pop" :class="{ on: s >= i + 1 }">
      <text v-for="(line, k) in l.q" :key="k" :x="l.x + 18" :y="60 + k * 20" text-anchor="middle" font-size="16" font-style="italic" fill="#e6e8ee">{{ line }}</text>
      <rect :x="l.x" y="100" width="36" height="320" rx="8" :fill="l.c" fill-opacity="0.18" :stroke="l.c" stroke-width="2" />
      <ellipse v-for="h in l.holes" :key="h" :cx="l.x + 18" :cy="h" rx="12" ry="18" fill="#0b0d12" :stroke="l.c" stroke-opacity="0.5" />
      <text :x="l.x + 18" y="448" text-anchor="middle" font-size="15" font-weight="700" :fill="l.c">{{ l.name }}</text>
      <text :x="l.x + 18" y="466" text-anchor="middle" font-size="12" fill="#7a8194">{{ l.sub }}</text>
    </g>

    <g v-for="(e, i) in errs" :key="i">
      <rect x="40" :y="e.y - 2" height="4" rx="2" fill="#ef4444" :style="{ width: `${endX(e) - 40}px`, transition: 'width .9s var(--ease)' }" />
      <circle :cx="endX(e)" :cy="e.y" r="7" fill="#ef4444" style="transition: cx .9s var(--ease)" />
      <text v-if="s >= e.stop + 1" :x="endX(e) - 22" :y="e.y - 10" font-size="16" fill="#ef4444" font-weight="800">✕</text>
    </g>

    <g class="st up" :class="{ on: s >= 4 }">
      <text x="1010" y="230" font-size="17" fill="#e6e8ee" font-weight="600">No single check</text>
      <text x="1010" y="254" font-size="17" fill="#e6e8ee" font-weight="600">is perfect.</text>
      <text x="1010" y="284" font-size="17" fill="#22c55e" font-weight="600">Stack independent</text>
      <text x="1010" y="308" font-size="17" fill="#22c55e" font-weight="600">ones.</text>
    </g>
  </svg>
</template>
