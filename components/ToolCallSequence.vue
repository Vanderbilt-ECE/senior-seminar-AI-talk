<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

// Swimlane sequence diagram of one tool call, one message per click.
const lanes = [
  { name: 'User', x: 110, c: '#e6e8ee' },
  { name: 'Chatbot', x: 420, c: '#22d3ee' },
  { name: 'LLM', x: 730, c: '#f97316' },
  { name: 'Calculator', x: 1040, c: '#22c55e' },
]
const L = Object.fromEntries(lanes.map(l => [l.name, l.x]))
const msgs = [
  { from: 'User', to: 'Chatbot', label: 'question', c: '#e6e8ee' },
  { from: 'Chatbot', to: 'LLM', label: 'system + tool list + question', c: '#22d3ee' },
  { from: 'LLM', to: 'Chatbot', label: 'calculator("6*5000*2/(0.05*0.1**2)")', c: '#22c55e', mono: true, pill: true },
  { from: 'Chatbot', to: 'Calculator', label: 'the chatbot runs it', c: '#22c55e' },
  { from: 'Calculator', to: 'Chatbot', label: '1.2e8', c: '#22c55e', mono: true },
  { from: 'Chatbot', to: 'LLM', label: 'everything so far + result 1.2e8', c: '#22d3ee' },
  { from: 'LLM', to: 'Chatbot', label: 'σ ≈ 120 MPa → SF ≈ 2.1 vs A36 yield', c: '#f97316' },
  { from: 'Chatbot', to: 'User', label: 'answer', c: '#e6e8ee' },
]
const y = (i: number) => 92 + i * 47
</script>

<template>
  <svg viewBox="0 0 1180 480" class="w-full">
    <!-- lanes -->
    <g v-for="l in lanes" :key="l.name">
      <rect :x="l.x - 75" y="12" width="150" height="38" rx="10" fill="#131722" :stroke="l.c" stroke-width="1.5" />
      <text :x="l.x" y="37" text-anchor="middle" font-size="16" font-weight="600" :fill="l.c">{{ l.name }}</text>
      <line :x1="l.x" y1="52" :x2="l.x" y2="470" stroke="#2a3142" stroke-width="2" stroke-dasharray="4 6" />
    </g>
    <!-- the chatbot executes highlight -->
    <rect x="345" y="52" width="150" height="418" rx="12" fill="#22d3ee" opacity="0.04" />

    <!-- messages -->
    <g v-for="(m, i) in msgs" :key="i" class="st" :class="{ on: s >= i + 1, past: s > i + 1 }">
      <line :x1="L[m.from]" :y1="y(i)" :x2="L[m.to] + (L[m.to] > L[m.from] ? -10 : 10)" :y2="y(i)" :stroke="m.c" stroke-width="2.5" />
      <path v-if="L[m.to] > L[m.from]" :d="`M${L[m.to] - 12} ${y(i) - 7} L${L[m.to]} ${y(i)} L${L[m.to] - 12} ${y(i) + 7} Z`" :fill="m.c" />
      <path v-else :d="`M${L[m.to] + 12} ${y(i) - 7} L${L[m.to]} ${y(i)} L${L[m.to] + 12} ${y(i) + 7} Z`" :fill="m.c" />
      <rect v-if="m.pill" :x="Math.min(L[m.from], L[m.to]) + 6" :y="y(i) - 28" :width="Math.abs(L[m.to] - L[m.from]) - 12" height="22" rx="6" fill="#0b1d12" stroke="#22c55e" />
      <text :x="(L[m.from] + L[m.to]) / 2" :y="y(i) - 11" text-anchor="middle" :font-size="m.mono ? 13 : 15" :fill="m.pill ? '#22c55e' : '#e6e8ee'" :class="{ mono: m.mono }">{{ m.label }}</text>
      <circle :cx="L[m.from]" :cy="y(i)" r="4" :fill="m.c" />
    </g>

    <!-- callouts -->
    <g class="st left" :class="{ on: s >= 3 && s < 5 }">
      <text x="745" :y="y(2) + 6" font-size="14" fill="#f97316" font-style="italic">← the LLM only writes the request</text>
    </g>
    <g class="st left" :class="{ on: s >= 4 && s < 6 }">
      <text x="590" :y="y(3) + 26" font-size="14" fill="#22c55e" font-style="italic">the chatbot does the work</text>
    </g>
  </svg>
</template>

<style scoped>
.st.on.past { opacity: 0.5; }
</style>
