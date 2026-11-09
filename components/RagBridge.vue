<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

const library = ['ACI 318', 'ASCE 7', 'IBC 2024', 'datasheets', 'project specs', 'SOPs', 'past reports', 'papers', 'lab notes']
const hits = [0, 4, 2]
const snippets = ['[1] ACI 318 · cover table', '[2] IBC · concrete ch. 19', '[3] Project spec 03 30 00']
</script>

<template>
  <svg viewBox="0 0 1180 470" class="w-full">
    <!-- context column -->
    <text x="40" y="40" font-size="13" fill="#22d3ee" class="mono" letter-spacing="2">CONTEXT</text>
    <rect x="30" y="52" width="230" height="390" rx="12" fill="none" stroke="#22d3ee" stroke-width="2" />
    <rect x="42" y="64" width="206" height="34" rx="6" fill="#262b38" />
    <text x="54" y="86" font-size="14" fill="#e6e8ee">System prompt</text>
    <rect x="42" y="104" width="206" height="54" rx="6" fill="#0f2a33" />
    <text x="54" y="126" font-size="14" fill="#e6e8ee">Min. concrete cover,</text>
    <text x="54" y="146" font-size="14" fill="#e6e8ee">beam exposed to weather?</text>
    <g v-for="(sn, i) in snippets" :key="sn" class="st left" :class="{ on: s >= 3 }" :style="{ transitionDelay: `${i * 0.15}s` }">
      <rect x="42" :y="168 + i * 44" width="206" height="38" rx="6" fill="#132447" stroke="#3b82f6" />
      <text x="54" :y="192 + i * 44" font-size="13" fill="#93c5fd">{{ sn }}</text>
    </g>

    <!-- frozen model -->
    <rect x="300" y="150" width="160" height="160" rx="22" fill="#132235" stroke="#7dd3fc" stroke-width="3" />
    <circle v-for="i in 16" :key="i" :cx="330 + ((i - 1) % 4) * 33" :cy="180 + Math.floor((i - 1) / 4) * 33" r="4.5" fill="#7dd3fc" />
    <text x="380" y="135" text-anchor="middle" font-size="18" font-weight="700" fill="#7dd3fc">LLM ❄</text>
    <path d="M262 230 L 296 230" stroke="#22d3ee" stroke-width="2.5" />

    <!-- wall -->
    <g class="st" :class="{ on: s >= 1 }">
      <line x1="560" y1="30" x2="560" y2="450" stroke="#e6e8ee" stroke-width="3" stroke-dasharray="10 8" />
      <text x="575" y="40" font-size="13" fill="#7a8194" class="mono">cutoff · private</text>
    </g>

    <!-- library -->
    <g v-for="(d, i) in library" :key="d">
      <rect :x="640 + (i % 3) * 172" :y="70 + Math.floor(i / 3) * 120" width="150" height="96" rx="10"
        :fill="s >= 2 && hits.includes(i) ? '#132447' : '#131722'"
        :stroke="s >= 2 && hits.includes(i) ? '#3b82f6' : '#2a3142'" stroke-width="2" style="transition: all .6s" />
      <rect v-for="k in 3" :key="k" :x="656 + (i % 3) * 172" :y="88 + Math.floor(i / 3) * 120 + k * 12" :width="[100, 80, 110][k - 1]" height="5" rx="2" fill="#4a5163" />
      <text :x="715 + (i % 3) * 172" :y="150 + Math.floor(i / 3) * 120" text-anchor="middle" font-size="14" fill="#e6e8ee">{{ d }}</text>
    </g>

    <!-- search pipe -->
    <g class="st" :class="{ on: s >= 2 }">
      <path d="M262 390 C 380 450, 560 450, 640 330" stroke="#3b82f6" stroke-width="3" fill="none" class="flow" />
      <rect x="330" y="404" width="250" height="34" rx="17" fill="#0b0d12" stroke="#3b82f6" />
      <text x="455" y="426" text-anchor="middle" font-size="14" fill="#93c5fd" class="mono">search("concrete cover…")</text>
    </g>

    <g class="st up" :class="{ on: s >= 4 }">
      <text x="860" y="455" text-anchor="middle" font-size="18" font-weight="600" fill="#e6e8ee">Search results get pasted into the context.</text>
    </g>
  </svg>
</template>
