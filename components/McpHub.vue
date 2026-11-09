<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

const apps = [
  { name: 'Chat assistant', y: 110 },
  { name: 'IDE coding agent', y: 240 },
  { name: 'Your custom agent', y: 370 },
]
const tools = [
  { name: 'Files', y: 60 },
  { name: 'Database', y: 150 },
  { name: 'Slack', y: 240 },
  { name: 'CAD', y: 330 },
]
const glue = ['#ef4444', '#facc15', '#f97316', '#22d3ee', '#2dd4bf', '#7a8194']
const hub = { x: 590, y: 240 }
</script>

<template>
  <svg viewBox="0 0 1180 480" class="w-full">
    <!-- N×M spaghetti -->
    <g :class="{ gone: s >= 2 }" class="mesh">
      <template v-for="(a, i) in apps" :key="a.name">
        <path v-for="(t, j) in tools" :key="t.name"
          :d="`M300 ${a.y} C 520 ${a.y + (j - 1.5) * 30}, 660 ${t.y + (i - 1) * 30}, 880 ${t.y}`"
          :stroke="glue[(i * 4 + j) % glue.length]" stroke-width="2" fill="none"
          :stroke-dasharray="['', '6 4', '2 4', '10 3 2 3'][(i + j) % 4]" opacity="0.75" />
      </template>
      <g class="st pop" :class="{ on: s >= 1 }">
        <rect x="455" y="420" width="270" height="40" rx="10" fill="#1d1012" stroke="#ef4444" />
        <text x="590" y="446" text-anchor="middle" font-size="17" fill="#ef4444" font-weight="600">3 × 4 = 12 custom integrations</text>
      </g>
    </g>

    <!-- hub -->
    <g class="st pop" :class="{ on: s >= 2 }">
      <path v-for="a in apps" :key="'h' + a.name" :d="`M300 ${a.y} C 420 ${a.y}, 470 ${hub.y}, ${hub.x - 70} ${hub.y}`" stroke="#a3e635" stroke-width="3" fill="none" class="flow" />
      <path v-for="t in tools" :key="'t' + t.name" :d="`M${hub.x + 70} ${hub.y} C 710 ${hub.y}, 760 ${t.y}, 880 ${t.y}`" stroke="#a3e635" stroke-width="3" fill="none" class="flow" />
      <rect :x="hub.x - 70" :y="hub.y - 48" width="140" height="96" rx="18" fill="#17200a" stroke="#a3e635" stroke-width="3" />
      <rect :x="hub.x - 26" :y="hub.y - 30" width="52" height="22" rx="4" fill="none" stroke="#a3e635" stroke-width="2.5" />
      <rect :x="hub.x - 16" :y="hub.y - 24" width="10" height="8" fill="#a3e635" />
      <rect :x="hub.x + 6" :y="hub.y - 24" width="10" height="8" fill="#a3e635" />
      <text :x="hub.x" :y="hub.y + 26" text-anchor="middle" font-size="24" font-weight="800" fill="#a3e635">MCP</text>
      <rect x="455" y="420" width="270" height="40" rx="10" fill="#17200a" stroke="#a3e635" />
      <text x="590" y="446" text-anchor="middle" font-size="17" fill="#a3e635" font-weight="600">{{ s >= 3 ? '3 + 5 = 8 · no new glue code' : '3 + 4 = 7 connections' }}</text>
    </g>

    <!-- new tool -->
    <g class="st left" :class="{ on: s >= 3 }">
      <path :d="`M${hub.x + 70} ${hub.y} C 710 ${hub.y}, 760 420, 880 420`" stroke="#a3e635" stroke-width="3" fill="none" class="flow" />
      <rect x="880" y="395" width="240" height="50" rx="12" fill="#17200a" stroke="#a3e635" stroke-width="2" />
      <text x="1000" y="426" text-anchor="middle" font-size="17" fill="#e6e8ee" font-weight="600">+ Lab instrument</text>
    </g>

    <!-- endpoints -->
    <g v-for="a in apps" :key="a.name">
      <rect x="60" :y="a.y - 28" width="240" height="56" rx="12" fill="#131722" :stroke="s >= 3 ? '#a3e635' : '#f97316'" stroke-width="2" style="transition: stroke .6s" />
      <text x="180" :y="a.y + 6" text-anchor="middle" font-size="17" fill="#e6e8ee">{{ a.name }}</text>
    </g>
    <g v-for="t in tools" :key="t.name">
      <rect x="880" :y="t.y - 25" width="240" height="50" rx="12" fill="#0b1d12" stroke="#22c55e" stroke-width="2" />
      <text x="1000" :y="t.y + 6" text-anchor="middle" font-size="17" fill="#e6e8ee">{{ t.name }}</text>
    </g>
    <text x="180" y="40" text-anchor="middle" font-size="13" fill="#7a8194" class="mono" letter-spacing="2">AI APPS</text>
    <text x="1000" y="20" text-anchor="middle" font-size="13" fill="#7a8194" class="mono" letter-spacing="2">TOOLS &amp; DATA</text>
  </svg>
</template>

<style scoped>
.mesh { transition: opacity 0.7s; }
.mesh.gone { opacity: 0.06; }
</style>
