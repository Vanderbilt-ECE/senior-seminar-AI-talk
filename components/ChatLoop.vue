<script setup lang="ts">
import { computed } from 'vue'
import { useStep } from '../composables/useStep'
const s = useStep()

// Each click adds one message to the app's history. On user turns, the
// whole history travels to the model as one request.
const msgs = [
  { role: 'user', text: 'Good alloy for a bike frame?' },
  { role: 'asst', text: '6061 aluminum or 4130 steel…' },
  { role: 'user', text: 'Which is cheaper?' },
  { role: 'asst', text: '4130 tubing usually costs less…' },
  { role: 'user', text: 'Put that in a table.' },
]
const shown = computed(() => Math.min(s.value, msgs.length))
const isRequest = computed(() => shown.value > 0 && msgs[shown.value - 1].role === 'user')
const isReply = computed(() => shown.value > 0 && msgs[shown.value - 1].role === 'asst')
const calls = computed(() => [1, 3, 5].filter(n => n <= shown.value))
const color = (r: string) => (r === 'user' ? '#22d3ee' : '#f97316')
</script>

<template>
  <svg viewBox="0 0 1180 470" class="w-full">
    <!-- the app's message list -->
    <rect x="20" y="20" width="440" height="430" rx="16" fill="#131722" stroke="#2a3142" />
    <text x="44" y="54" font-size="14" fill="#7a8194" class="mono" letter-spacing="2">YOUR APP · MESSAGE LIST</text>
    <g v-for="(m, i) in msgs" :key="i" class="st up" :class="{ on: i < shown }">
      <rect :x="m.role === 'user' ? 150 : 44" :y="74 + i * 62" width="290" height="48" rx="10"
        :fill="m.role === 'user' ? '#0f2a33' : '#2a1a0e'" :stroke="color(m.role)" stroke-opacity="0.6" />
      <text :x="m.role === 'user' ? 166 : 60" :y="104 + i * 62" font-size="15" fill="#e6e8ee">{{ m.text }}</text>
    </g>

    <!-- request arrow + payload -->
    <path d="M470 175 L 860 175" stroke="#22d3ee" stroke-width="2.5" :class="{ flow: isRequest }" :opacity="isRequest ? 1 : 0.25" />
    <path d="M860 167 L874 175 L860 183 Z" fill="#22d3ee" :opacity="isRequest ? 1 : 0.25" />
    <g v-if="isRequest" :key="'pkt' + shown" class="packet">
      <rect v-for="j in shown" :key="j" x="610" :y="160 - j * 14" width="120" height="11" rx="3"
        :fill="color(msgs[j - 1].role)" opacity="0.85" />
      <text x="670" y="198" text-anchor="middle" font-size="14" fill="#22d3ee" class="mono">sends {{ shown }} message{{ shown > 1 ? 's' : '' }}</text>
    </g>

    <!-- reply arrow -->
    <path d="M874 290 L 480 290" stroke="#f97316" stroke-width="2.5" :class="{ flow: isReply }" :opacity="isReply ? 1 : 0.25" />
    <path d="M484 282 L470 290 L484 298 Z" fill="#f97316" :opacity="isReply ? 1 : 0.25" />
    <g v-if="isReply" :key="'rep' + shown" class="packet-back">
      <rect x="610" y="274" width="120" height="11" rx="3" fill="#f97316" />
      <text x="670" y="318" text-anchor="middle" font-size="14" fill="#f97316" class="mono">reply appended</text>
    </g>

    <!-- stateless model -->
    <rect x="880" y="120" width="220" height="220" rx="24" fill="#24160b" stroke="#f97316" stroke-width="3" />
    <circle v-for="i in 16" :key="i" :cx="922 + ((i - 1) % 4) * 45" :cy="162 + Math.floor((i - 1) / 4) * 45" r="5" fill="#f97316" opacity="0.8" />
    <text x="990" y="100" text-anchor="middle" font-size="22" font-weight="700" fill="#f97316">LLM</text>
    <text x="990" y="370" text-anchor="middle" font-size="15" fill="#7a8194">stateless: no memory</text>
    <text x="990" y="392" text-anchor="middle" font-size="15" fill="#7a8194">between calls</text>

    <g class="st pop" :class="{ on: s >= 6 }">
      <rect x="870" y="110" width="240" height="240" rx="28" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="8 6" />
      <text x="990" y="440" text-anchor="middle" font-size="17" fill="#e6e8ee" font-weight="600">Memory lives in the app, not the model.</text>
    </g>

    <!-- calls tally -->
    <g>
      <text x="520" y="400" font-size="13" fill="#7a8194" class="mono">MESSAGES SENT PER CALL</text>
      <g v-for="(n, k) in [1, 3, 5]" :key="'c' + k" class="st left" :class="{ on: calls.includes(n) }">
        <rect :x="520 + k * 100" :y="440 - n * 6" width="60" :height="n * 6" rx="3" fill="#22d3ee" opacity="0.8" />
        <text :x="550 + k * 100" :y="458" text-anchor="middle" font-size="12" fill="#7a8194" class="mono">call {{ k + 1 }}</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.packet { animation: travel 0.9s var(--ease); }
.packet-back { animation: travelBack 0.9s var(--ease); }
@keyframes travel { from { transform: translateX(-130px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes travelBack { from { transform: translateX(130px); opacity: 0; } to { transform: none; opacity: 1; } }
</style>
