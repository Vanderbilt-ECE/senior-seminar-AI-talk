<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

const reqs = [
  { call: 'read_file("bracket.step")', verdict: 'allow', c: '#22c55e', mark: '✓' },
  { call: 'run_tests()', verdict: 'allow (sandbox)', c: '#22c55e', mark: '✓' },
  { call: 'send_email(to="vendor", …)', verdict: 'ask a human', c: '#facc15', mark: '?' },
  { call: 'delete("/shared/designs")', verdict: 'deny', c: '#ef4444', mark: '✕' },
]
</script>

<template>
  <svg viewBox="0 0 1180 440" class="w-full">
    <!-- model -->
    <rect x="30" y="110" width="200" height="200" rx="24" fill="#24160b" stroke="#f97316" stroke-width="3" />
    <text x="130" y="200" text-anchor="middle" font-size="24" font-weight="700" fill="#f97316">LLM</text>
    <text x="130" y="230" text-anchor="middle" font-size="14" fill="#7a8194">writes text.</text>
    <text x="130" y="250" text-anchor="middle" font-size="14" fill="#7a8194">that's all.</text>

    <!-- harness boundary -->
    <rect x="330" y="20" width="820" height="400" rx="22" fill="#22d3ee" fill-opacity="0.03" stroke="#22d3ee" stroke-width="2" stroke-dasharray="10 8" />
    <text x="356" y="52" font-size="15" fill="#22d3ee" class="mono" letter-spacing="2">YOUR CODE · "THE HARNESS"</text>

    <path d="M235 210 L 320 210" stroke="#22c55e" stroke-width="2.5" class="flow" />
    <path d="M318 202 L332 210 L318 218 Z" fill="#22c55e" />

    <!-- requests and verdicts -->
    <g v-for="(r, i) in reqs" :key="i" class="st left" :class="{ on: s >= (i < 2 ? 1 : i) }">
      <rect x="360" :y="80 + i * 80" width="350" height="54" rx="10" fill="#0b1d12" stroke="#22c55e" stroke-opacity="0.6" />
      <text x="378" :y="113 + i * 80" font-size="15" fill="#e6e8ee" class="mono">{{ r.call }}</text>
      <path :d="`M715 ${107 + i * 80} L 780 ${107 + i * 80}`" stroke="#7a8194" stroke-width="2" />
      <g class="st pop" :class="{ on: s >= (i < 2 ? 1 : i) }">
        <circle cx="810" :cy="107 + i * 80" r="22" :fill="r.c" fill-opacity="0.15" :stroke="r.c" stroke-width="2" />
        <text x="810" :y="114 + i * 80" text-anchor="middle" font-size="20" font-weight="700" :fill="r.c">{{ r.mark }}</text>
        <text x="850" :y="113 + i * 80" font-size="17" :fill="r.c" font-weight="600">{{ r.verdict }}</text>
      </g>
    </g>
    <g class="st up" :class="{ on: s >= 4 }">
      <text x="740" y="408" text-anchor="middle" font-size="17" fill="#22d3ee" font-weight="600">Permissions · sandboxes · approvals: all in your code</text>
    </g>
  </svg>
</template>
