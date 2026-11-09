<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

const R = 150
const C = { x: 470, y: 240 }
const pos = (a: number, r = R) => ({ x: C.x + r * Math.cos((a * Math.PI) / 180), y: C.y + r * Math.sin((a * Math.PI) / 180) })
const sensors = [
  { name: 'test runner', a: 115 },
  { name: 'browser screenshots', a: 140 },
  { name: 'simulator', a: 165 },
  { name: 'CAD / plot renderer', a: 190 },
  { name: 'linter · type checker', a: 215 },
]
</script>

<template>
  <svg viewBox="0 0 1180 470" class="w-full">
    <circle :cx="C.x" :cy="C.y" :r="R" fill="none" stroke="#2a3142" stroke-width="10" />
    <circle :cx="C.x" :cy="C.y" :r="R" fill="none" stroke="#2dd4bf" stroke-width="4" class="flow" opacity="0.7" />
    <!-- think / act -->
    <circle :cx="pos(-90).x" :cy="pos(-90).y" r="42" fill="#131722" stroke="#f97316" stroke-width="3" />
    <text :x="pos(-90).x" :y="pos(-90).y + 5" text-anchor="middle" font-size="14" font-weight="700" fill="#f97316" class="mono">THINK</text>
    <circle :cx="pos(30).x" :cy="pos(30).y" r="42" fill="#131722" stroke="#22c55e" stroke-width="3" />
    <text :x="pos(30).x" :y="pos(30).y + 5" text-anchor="middle" font-size="14" font-weight="700" fill="#22c55e" class="mono">ACT</text>
    <!-- observe: the one that matters here -->
    <circle :cx="pos(160).x" :cy="pos(160).y" :r="s >= 1 ? 56 : 42" fill="#0f2129" stroke="#22d3ee" :stroke-width="s >= 1 ? 4 : 2" :stroke-dasharray="s >= 1 ? '' : '6 6'" style="transition: all .6s" />
    <text :x="pos(160).x" :y="pos(160).y + 5" text-anchor="middle" font-size="14" font-weight="700" fill="#22d3ee" class="mono">OBSERVE</text>
    <text v-if="s < 1" :x="pos(160).x" :y="pos(160).y + 70" text-anchor="middle" font-size="14" fill="#ef4444">nothing to see → guessing</text>

    <!-- sensors plugging into observe -->
    <g v-for="(sn, i) in sensors" :key="sn.name" class="st left" :class="{ on: s >= 1 }" :style="{ transitionDelay: `${i * 0.12}s` }">
      <line :x1="pos(160).x - 50" :y1="pos(160).y" :x2="190" :y2="70 + i * 80" stroke="#22d3ee" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.5" />
      <rect x="10" :y="48 + i * 80" width="180" height="44" rx="10" fill="#131722" stroke="#22d3ee" />
      <text x="100" :y="76 + i * 80" text-anchor="middle" font-size="14" fill="#e6e8ee">{{ sn.name }}</text>
    </g>

    <g class="st up" :class="{ on: s >= 2 }">
      <text x="700" y="210" font-size="34" font-weight="800" fill="#e6e8ee">An agent can only fix</text>
      <text x="700" y="254" font-size="34" font-weight="800" fill="#e6e8ee">what it can <tspan fill="#22d3ee">observe</tspan>.</text>
      <text x="700" y="300" font-size="18" fill="#7a8194">Your job: give it ways to see its own work.</text>
    </g>
  </svg>
</template>
