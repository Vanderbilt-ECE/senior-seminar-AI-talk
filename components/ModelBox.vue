<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

// 6×6 lattice of "weights" inside the model box
const nodes = Array.from({ length: 36 }, (_, i) => ({ x: 500 + (i % 6) * 36, y: 150 + Math.floor(i / 6) * 34 }))
const edges: [number, number][] = []
for (let i = 0; i < 36; i++) {
  if (i % 6 < 5) edges.push([i, i + 1])
  if (i < 30) edges.push([i, i + 6])
  if (i % 6 < 5 && i < 30 && (i * 7) % 3 === 0) edges.push([i, i + 7])
}
</script>

<template>
  <svg viewBox="0 0 1180 470" class="w-full">
    <!-- inputs -->
    <g class="st left" :class="{ on: s >= 1 }">
      <rect x="70" y="95" width="190" height="120" rx="12" fill="#131722" stroke="#2a3142" />
      <rect v-for="i in 5" :key="i" x="92" :y="112 + i * 15" :width="[140, 120, 146, 100, 80][i - 1]" height="6" rx="3" fill="#7a8194" opacity="0.6" />
      <text x="165" y="245" text-anchor="middle" font-size="18" fill="#e6e8ee" font-weight="600">Text</text>
      <path d="M268 155 C 360 155, 380 200, 462 215" stroke="#e6e8ee" stroke-width="2.5" fill="none" class="flow" />
    </g>
    <g class="st left" :class="{ on: s >= 2 }">
      <rect x="70" y="275" width="190" height="120" rx="12" fill="#131722" stroke="#2a3142" />
      <circle cx="210" cy="305" r="12" fill="#facc15" opacity="0.8" />
      <path d="M85 382 L140 318 L178 360 L205 335 L248 382 Z" fill="#3b82f6" opacity="0.55" />
      <text x="165" y="425" text-anchor="middle" font-size="18" fill="#e6e8ee" font-weight="600">Images</text>
      <path d="M268 335 C 360 335, 380 270, 462 255" stroke="#e6e8ee" stroke-width="2.5" fill="none" class="flow" />
    </g>

    <!-- the model -->
    <rect x="470" y="115" width="240" height="240" rx="26" fill="#24160b" stroke="#f97316" stroke-width="3" />
    <g opacity="0.85">
      <line v-for="([a, b], i) in edges" :key="'e' + i" :x1="nodes[a].x" :y1="nodes[a].y" :x2="nodes[b].x" :y2="nodes[b].y" stroke="#f97316" stroke-opacity="0.35" stroke-width="1.2" />
      <circle v-for="(n, i) in nodes" :key="i" :cx="n.x" :cy="n.y" r="4.5" fill="#f97316" class="pulse" :style="{ animationDelay: `${(i * 0.23) % 2.4}s` }" />
    </g>
    <text x="590" y="95" text-anchor="middle" font-size="26" font-weight="700" fill="#f97316">LLM</text>
    <text x="590" y="388" text-anchor="middle" font-size="15" fill="#7a8194">learned numbers ("weights")</text>

    <!-- output -->
    <g class="st left" :class="{ on: s >= 3 }">
      <path d="M718 235 L 840 235" stroke="#22d3ee" stroke-width="2.5" fill="none" class="flow" />
      <path d="M840 227 L852 235 L840 243 Z" fill="#22d3ee" />
      <rect x="860" y="165" width="250" height="140" rx="12" fill="#0f2129" stroke="#22d3ee" />
      <text x="880" y="200" font-size="15" fill="#e6e8ee">"The photo shows a</text>
      <text x="880" y="224" font-size="15" fill="#e6e8ee">cantilever bracket with</text>
      <text x="880" y="248" font-size="15" fill="#e6e8ee">a crack near the weld…"</text>
      <text x="985" y="335" text-anchor="middle" font-size="18" fill="#22d3ee" font-weight="600">Text</text>
    </g>

    <g class="st up" :class="{ on: s >= 4 }">
      <text x="590" y="450" text-anchor="middle" font-size="22" fill="#e6e8ee" font-weight="600">That's the entire interface: text (and images) in, text out.</text>
    </g>
  </svg>
</template>
