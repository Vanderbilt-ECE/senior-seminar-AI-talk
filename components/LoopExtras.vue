<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="grid">
    <div class="card st up" :class="{ on: s >= 1 }">
      <carbon-list-checked class="ic" />
      <b>Planning</b>
      <p>Break the goal into steps. Revise the plan as results come in.</p>
      <div class="mini mono">☑ find data<br>☑ compute overshoot<br>☐ write summary</div>
    </div>
    <div class="card st up" :class="{ on: s >= 2 }">
      <carbon-notebook class="ic" />
      <b>Memory</b>
      <p>Context is finite, so write notes to files and reload only what's needed.</p>
      <div class="mini mono">NOTES.md<br>· logs use omega_rad_s<br>· target ≤ 10 % overshoot</div>
    </div>
    <div class="card st up" :class="{ on: s >= 3 }">
      <carbon-stop-sign class="ic" />
      <b>Knowing when to stop</b>
      <p>Clear done criteria, a step budget, and asking a human when stuck.</p>
      <div class="mini mono">done if: tests pass<br>max steps: 30<br>stuck → ask</div>
    </div>
  </div>
  <div class="defn st up" :class="{ on: s >= 4 }">
    <span class="c-loop">Agentic</span> = the model chooses its next action, in a loop, until the goal is met.
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 24px; }
.card { background: var(--panel); border: 1px solid color-mix(in srgb, var(--loop) 35%, var(--line)); border-radius: 16px; padding: 20px 22px; display: flex; flex-direction: column; gap: 8px; }
.ic { font-size: 2.2rem; color: var(--loop); }
b { font-size: 1.25rem; }
p { margin: 0; color: var(--muted); font-size: 0.98rem; line-height: 1.45; }
.mini { margin-top: 6px; background: #07080c; border-radius: 8px; padding: 10px 12px; font-size: 0.8rem; line-height: 1.6; color: var(--text); }
.defn { margin-top: 30px; font-size: 1.7rem; font-weight: 700; text-align: center; letter-spacing: -0.01em; }
</style>
