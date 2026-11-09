<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

const log = [
  { at: 4, call: 'read_file("test_rig_07.csv")', res: '✕ file not found', bad: true },
  { at: 5, call: 'list_files("data/")', res: 'TestRig07_final.csv, …' },
  { at: 6, call: 'read_file("TestRig07_final.csv")', res: '4,812 rows' },
  { at: 7, call: 'done', res: 'max load 18.4 kN at t = 212 s', good: true },
]
</script>

<template>
  <div class="task mono"><span class="lbl">Task:</span>"Find the max load in test_rig_07.csv"</div>
  <div class="grid">
    <!-- single shot -->
    <div class="side">
      <div class="head">Single-shot tool use</div>
      <svg viewBox="0 0 520 300" class="w-full st" :class="{ on: s >= 1 }">
        <g font-size="15">
          <rect x="10" y="110" width="80" height="50" rx="10" fill="#131722" stroke="#e6e8ee" />
          <text x="50" y="140" text-anchor="middle" fill="#e6e8ee">Ask</text>
          <rect x="130" y="110" width="80" height="50" rx="10" fill="#24160b" stroke="#f97316" />
          <text x="170" y="140" text-anchor="middle" fill="#f97316">LLM</text>
          <rect x="250" y="110" width="110" height="50" rx="10" fill="#0b1d12" :stroke="s >= 2 ? '#ef4444' : '#22c55e'" />
          <text x="305" y="140" text-anchor="middle" :fill="s >= 2 ? '#ef4444' : '#22c55e'" class="mono" font-size="13">read_file</text>
          <rect x="400" y="110" width="110" height="50" rx="10" fill="#24160b" stroke="#f97316" />
          <text x="455" y="140" text-anchor="middle" fill="#f97316">LLM</text>
        </g>
        <path d="M92 135 H126 M212 135 H246 M362 135 H396" stroke="#7a8194" stroke-width="2" />
        <g class="st up" :class="{ on: s >= 2 }">
          <text x="305" y="95" text-anchor="middle" font-size="22" fill="#ef4444" font-weight="700">✕</text>
          <text x="305" y="190" text-anchor="middle" font-size="13" fill="#ef4444" class="mono">file not found</text>
          <rect x="250" y="220" width="260" height="56" rx="10" fill="#1d1012" stroke="#ef4444" />
          <text x="380" y="245" text-anchor="middle" font-size="14" fill="#e6e8ee">"Sorry, I couldn't find that file."</text>
          <text x="380" y="265" text-anchor="middle" font-size="12" fill="#7a8194">end of the line</text>
          <path d="M455 162 V 216" stroke="#ef4444" stroke-width="2" />
        </g>
      </svg>
    </div>

    <!-- loop -->
    <div class="side st up" :class="{ on: s >= 3 }">
      <div class="head c-loop">Agent loop</div>
      <div class="loopbox">
        <svg viewBox="0 0 160 160" class="loopring">
          <circle cx="80" cy="80" r="62" fill="none" stroke="#2a3142" stroke-width="6" />
          <circle cx="80" cy="80" r="62" fill="none" stroke="#2dd4bf" stroke-width="6" class="flow" />
          <text x="80" y="76" text-anchor="middle" font-size="13" fill="#e6e8ee">think</text>
          <text x="80" y="93" text-anchor="middle" font-size="13" fill="#e6e8ee">act · observe</text>
        </svg>
        <div class="log">
          <div v-for="(l, i) in log" :key="i" class="entry st left" :class="{ on: s >= l.at, bad: l.bad, good: l.good }">
            <span class="call mono">{{ l.call }}</span>
            <span class="res mono">→ {{ l.res }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task { display: inline-block; font-size: 1.2rem; line-height: 1.4; color: var(--text); background: var(--panel); border: 1px solid var(--line); border-left: 4px solid var(--loop); border-radius: 8px; padding: 6px 14px; }
.task .lbl { color: var(--loop); font-weight: 700; margin-right: 6px; }
.grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 36px; margin-top: 16px; }
.side { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; padding: 16px 18px; min-height: 380px; }
.head { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
.loopbox { display: grid; grid-template-columns: 150px 1fr; gap: 16px; align-items: center; }
.loopring { width: 150px; }
.log { display: flex; flex-direction: column; gap: 10px; }
.entry { display: flex; flex-direction: column; background: #0b0d12; border-left: 3px solid var(--loop); border-radius: 6px; padding: 7px 10px; }
.call { font-size: 1rem; color: var(--tool); }
.res { font-size: 0.95rem; color: var(--muted); }
.entry.bad { border-left-color: var(--bad); }
.entry.bad .res { color: var(--bad); }
.entry.good { border-left-color: var(--tool); }
.entry.good .call { color: var(--loop); }
.entry.good .res { color: var(--text); font-weight: 600; }
</style>
