<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
const C = { x: 330, y: 240 }
</script>

<template>
  <div class="grid">
    <svg viewBox="0 0 660 480" class="w-full">
      <!-- outer loop: the human -->
      <g class="st" :class="{ on: s >= 2 }">
        <circle :cx="C.x" :cy="C.y" r="215" fill="none" stroke="#e5e7eb" stroke-width="3" stroke-dasharray="14 10" />
        <rect :x="C.x - 70" :y="C.y - 238" width="140" height="46" rx="23" fill="#0b0d12" stroke="#e5e7eb" stroke-width="2" />
        <text :x="C.x" :y="C.y - 209" text-anchor="middle" font-size="16" font-weight="700" fill="#e5e7eb">👤 You</text>
        <text :x="C.x + 160" :y="C.y + 200" font-size="13" fill="#e5e7eb" class="mono">OUTER LOOP</text>
      </g>
      <!-- inner loop: the agent -->
      <g class="st" :class="{ on: s >= 1 }">
        <circle :cx="C.x" :cy="C.y" r="120" fill="#2dd4bf" fill-opacity="0.05" stroke="#2dd4bf" stroke-width="4" class="flow" />
        <text :x="C.x" :y="C.y - 8" text-anchor="middle" font-size="18" font-weight="700" fill="#2dd4bf">Agent</text>
        <text :x="C.x" :y="C.y + 16" text-anchor="middle" font-size="13" fill="#e6e8ee">think · act · observe</text>
        <g v-for="(t, i) in ['tests', 'sims', 'screens', 'checks']" :key="t">
          <rect :x="C.x - 165 + i * 90" :y="C.y + 60" width="66" height="26" rx="13" fill="#0f2129" stroke="#22d3ee" />
          <text :x="C.x - 132 + i * 90" :y="C.y + 78" text-anchor="middle" font-size="12" fill="#22d3ee">{{ t }}</text>
        </g>
        <text :x="C.x + 70" :y="C.y + 140" font-size="13" fill="#2dd4bf" class="mono">INNER LOOP</text>
      </g>
    </svg>

    <div class="side">
      <div class="blk st left" :class="{ on: s >= 1 }">
        <div class="h c-loop">The agent checks</div>
        <div>Does the code run? Do tests pass? Does the dimension match? Does the page render?</div>
      </div>
      <div class="blk st left" :class="{ on: s >= 2 }">
        <div class="h">You check what it can't</div>
        <div>Is this the right problem? Are the requirements right? Is it safe? Who signs off?</div>
      </div>
      <div class="blk ev st left" :class="{ on: s >= 3 }">
        <div class="h c-tool">Ask for evidence, not claims</div>
        <div>"Tests pass" ← show the output. "Looks right" ← show the screenshot.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 560px 1fr; gap: 30px; margin-top: 4px; align-items: center; }
.side { display: flex; flex-direction: column; gap: 18px; }
.blk { font-size: 1.05rem; line-height: 1.45; color: var(--muted); }
.h { font-size: 1.3rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.ev { border-left: 4px solid var(--tool); padding-left: 14px; }
</style>
