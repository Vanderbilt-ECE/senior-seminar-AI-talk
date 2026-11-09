<script setup lang="ts">
import { computed } from 'vue'
import { useStep } from '../composables/useStep'
const s = useStep()

// 95 % per step, compounded. With a check + retry after each step the
// residual per-step error drops to ~0.25 % (0.05 × 0.05).
const counts = [1, 5, 10, 20, 20]
const n = computed(() => counts[Math.min(s.value, counts.length - 1)])
const checked = computed(() => s.value >= 4)
const p = computed(() => (checked.value ? 0.9975 : 0.95) ** n.value)
</script>

<template>
  <svg viewBox="0 0 1180 300" class="w-full">
    <g v-for="i in 20" :key="i">
      <rect :x="40 + (i - 1) * 55" y="70" width="44" height="44" rx="10"
        :fill="i <= n ? (checked ? '#0b1d12' : '#24160b') : '#0e1119'"
        :stroke="i <= n ? (checked ? '#22c55e' : '#f97316') : '#1f2533'" stroke-width="2"
        :style="{ opacity: i <= n ? (checked ? 1 : Math.max(0.25, 0.95 ** i)) : 1, transition: 'all .5s' }" />
      <path v-if="i < 20" :d="`M${84 + (i - 1) * 55} 92 h11`" :stroke="i < n ? '#4a5163' : '#1a1f2a'" stroke-width="2" />
      <text v-if="checked" :x="62 + (i - 1) * 55" y="98" text-anchor="middle" font-size="16" fill="#22c55e">✓</text>
    </g>
    <text x="40" y="46" font-size="20" fill="#7a8194" class="mono">{{ n }} step{{ n > 1 ? 's' : '' }} · each 95 % reliable{{ checked ? ' · checked + retried' : '' }}</text>

    <!-- overall success bar -->
    <text x="40" y="172" font-size="20" fill="#7a8194" class="mono">CHANCE THE WHOLE TASK IS RIGHT</text>
    <rect x="40" y="190" width="1100" height="44" rx="10" fill="#131722" />
    <rect x="40" y="190" :width="1100 * p" height="44" rx="10" :fill="p > 0.8 ? '#22c55e' : p > 0.5 ? '#facc15' : '#ef4444'" style="transition: all .8s var(--ease)" />
    <text :x="Math.max(140, 40 + 1100 * p - 16)" y="221" text-anchor="end" font-size="24" font-weight="800" fill="#0b0d12">{{ Math.round(p * 100) }}%</text>
  </svg>
</template>
