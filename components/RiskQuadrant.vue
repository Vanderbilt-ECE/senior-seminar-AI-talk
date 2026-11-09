<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

// x: stakes if wrong (low → high); y: how easy the result is to verify.
const quads = [
  { x: 90, y: 30, label: 'Let it run', c: '#22c55e' },
  { x: 590, y: 30, label: 'Run it, gate on checks + review', c: '#facc15' },
  { x: 90, y: 230, label: 'Run it, spot-check', c: '#facc15' },
  { x: 590, y: 230, label: 'Human decides; agent assists', c: '#ef4444' },
]
const dots = [
  { x: 210, y: 120, t: 'restyle a plot' },
  { x: 330, y: 160, t: 'unit converter with tests' },
  { x: 800, y: 130, t: 'change to production code' },
  { x: 250, y: 330, t: 'literature summary' },
  { x: 850, y: 350, t: 'structural sign-off' },
  { x: 720, y: 300, t: 'medical device firmware' },
]
</script>

<template>
  <svg viewBox="0 0 1100 460" class="w-full">
    <g class="st" :class="{ on: s >= 1 }">
      <rect v-for="q in quads" :key="q.label" :x="q.x - 10" :y="q.y - 10" width="490" height="190" rx="14" :fill="q.c" fill-opacity="0.06" :stroke="q.c" stroke-opacity="0.35" />
      <text v-for="q in quads" :key="'t' + q.label" :x="q.x + 6" :y="q.y + 22" font-size="19" font-weight="700" :fill="q.c">{{ q.label }}</text>
      <path d="M60 430 H 1090" stroke="#7a8194" stroke-width="2" />
      <path d="M1080 424 L1094 430 L1080 436 Z" fill="#7a8194" />
      <text x="1090" y="452" text-anchor="end" font-size="13" fill="#7a8194" class="mono">STAKES IF WRONG →</text>
      <path d="M60 430 V 10" stroke="#7a8194" stroke-width="2" />
      <text x="48" y="220" text-anchor="middle" font-size="13" fill="#7a8194" class="mono" transform="rotate(-90 48 220)">EASY TO VERIFY →</text>
    </g>
    <g v-for="(d, i) in dots" :key="d.t" class="st pop" :class="{ on: s >= 2 }" :style="{ transitionDelay: `${i * 0.1}s` }">
      <circle :cx="d.x" :cy="d.y" r="8" fill="#e6e8ee" />
      <text :x="d.x + 16" :y="d.y + 5" font-size="15" fill="#e6e8ee">{{ d.t }}</text>
    </g>
  </svg>
</template>
