<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

const steps = [
  { t: 'Explain or document a function', chk: 'you read the diff' },
  { t: 'Write one function + its unit test', chk: 'the test passes' },
  { t: 'Fix a failing test suite', chk: 'CI goes green' },
  { t: 'Build a feature across files', chk: 'tests + code review' },
  { t: 'Multi-day project', chk: 'milestones + you' },
]
const W = 210
const H = 62
</script>

<template>
  <svg viewBox="0 0 1180 470" class="w-full">
    <!-- autonomy axis -->
    <path d="M30 450 L 30 60" stroke="#4a5163" stroke-width="2" />
    <path d="M22 70 L30 52 L38 70 Z" fill="#4a5163" />
    <text x="46" y="64" font-size="13" fill="#7a8194" class="mono">AUTONOMY</text>
    <path d="M30 450 L 1150 450" stroke="#4a5163" stroke-width="2" />
    <text x="1150" y="469" text-anchor="end" font-size="13" fill="#7a8194" class="mono">TRUST EARNED →</text>

    <g v-for="(st, i) in steps" :key="i" class="st up" :class="{ on: s >= i + 1 }">
      <rect :x="70 + i * W" :y="450 - (i + 1) * H" :width="W - 8" :height="(i + 1) * H" rx="6"
        :fill="i === 4 ? '#0f2a27' : '#141a26'" :stroke="i === 4 ? '#2dd4bf' : '#2a3142'" />
      <foreignObject :x="78 + i * W" :y="450 - (i + 1) * H - 112" :width="W - 22" height="104">
        <div class="lbl">
          <div class="t">{{ st.t }}</div>
          <div class="c">✓ {{ st.chk }}</div>
        </div>
      </foreignObject>
    </g>
    <g class="st up" :class="{ on: s >= 6 }">
      <text x="80" y="120" font-size="21" font-weight="700" fill="#22d3ee">Bigger steps need better self-checks →</text>
    </g>
  </svg>
</template>

<style scoped>
.lbl { display: flex; flex-direction: column; justify-content: flex-end; height: 100%; gap: 4px; }
.t { font-size: 15px; font-weight: 600; line-height: 1.25; color: var(--text); }
.c { font-size: 13px; color: var(--tool); font-family: 'JetBrains Mono', monospace; }
</style>
