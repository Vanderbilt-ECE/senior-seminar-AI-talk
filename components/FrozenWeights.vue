<script setup lang="ts">
import { useStep } from '../composables/useStep'
// `final` pins the diagram in its last state (used as a callback in section 5).
const props = defineProps<{ final?: boolean }>()
const step = useStep()
const s = (n: number) => props.final || step.value >= n

const sources = ['web pages', 'books', 'code', 'papers', 'forums']
</script>

<template>
  <svg viewBox="0 0 1180 470" class="w-full">
    <!-- training data stream -->
    <g class="st left" :class="{ on: s(1) }">
      <g v-for="(src, i) in sources" :key="src">
        <rect :x="40" :y="60 + i * 62" width="150" height="44" rx="9" fill="#131722" stroke="#2a3142" />
        <text :x="115" :y="88 + i * 62" text-anchor="middle" font-size="16" fill="#e6e8ee">{{ src }}</text>
        <path :d="`M195 ${82 + i * 62} C 300 ${82 + i * 62}, 330 220, 420 225`" stroke="#7a8194" stroke-width="1.6" fill="none" :class="{ flow: !s(2) }" />
      </g>
      <text x="115" y="400" text-anchor="middle" font-size="14" fill="#7a8194">training data</text>
    </g>

    <!-- the model -->
    <rect x="425" y="125" width="200" height="200" rx="24" :fill="s(2) ? '#132235' : '#24160b'" :stroke="s(2) ? '#7dd3fc' : '#f97316'" stroke-width="3" style="transition: all .8s" />
    <circle v-for="i in 25" :key="i" :cx="455 + ((i - 1) % 5) * 35" :cy="155 + Math.floor((i - 1) / 5) * 35" r="5" :fill="s(2) ? '#7dd3fc' : '#f97316'" style="transition: fill .8s" />
    <text x="525" y="105" text-anchor="middle" font-size="22" font-weight="700" :fill="s(2) ? '#7dd3fc' : '#f97316'">LLM</text>

    <g class="st pop" :class="{ on: s(2) }">
      <text x="525" y="365" text-anchor="middle" font-size="17" fill="#7dd3fc" font-weight="600">❄ weights frozen</text>
      <!-- cutoff wall -->
      <line x1="700" y1="40" x2="700" y2="430" stroke="#e6e8ee" stroke-width="3" stroke-dasharray="10 8" />
      <rect x="640" y="440" width="120" height="26" rx="6" fill="#0b0d12" />
      <text x="700" y="458" text-anchor="middle" font-size="15" fill="#e6e8ee" class="mono">training cutoff</text>
    </g>

    <!-- outside the wall: today -->
    <g class="st left" :class="{ on: s(3) }">
      <rect x="790" y="70" width="110" height="110" rx="12" fill="#131722" stroke="#facc15" stroke-width="2" />
      <rect x="790" y="70" width="110" height="28" rx="12" fill="#facc15" />
      <text x="845" y="152" text-anchor="middle" font-size="38" font-weight="700" fill="#e6e8ee">28</text>
      <text x="920" y="112" font-size="18" fill="#e6e8ee" font-weight="600">Today</text>
      <text x="920" y="138" font-size="15" fill="#7a8194">news · prices · new standards</text>
      <path d="M785 125 L 712 190" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6 6" />
      <text x="742" y="165" font-size="28" fill="#ef4444" font-weight="700">✕</text>
    </g>

    <!-- outside the wall: private data -->
    <g class="st left" :class="{ on: s(4) }">
      <path d="M790 270 h40 l12 14 h58 v96 h-110 z" fill="#131722" stroke="#3b82f6" stroke-width="2" />
      <rect x="828" y="318" width="34" height="28" rx="4" fill="#3b82f6" />
      <path d="M835 318 v-10 a10 10 0 0 1 20 0 v10" stroke="#3b82f6" stroke-width="4" fill="none" />
      <text x="920" y="312" font-size="18" fill="#e6e8ee" font-weight="600">Your data</text>
      <text x="920" y="338" font-size="15" fill="#7a8194">files · company docs · lab results</text>
      <path d="M785 320 L 712 260" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6 6" />
      <text x="742" y="305" font-size="28" fill="#ef4444" font-weight="700">✕</text>
    </g>
  </svg>
</template>
