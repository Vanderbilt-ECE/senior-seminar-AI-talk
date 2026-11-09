<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

// Click 1 reveals the chatbot panel with its request, clicks 2-3 finish it; click 4 reveals the agent panel; then one terminal line per click.
const lines = [
  { at: 5, tag: 'read', text: 'src/units.py', cls: '' },
  { at: 6, tag: 'run', text: 'pytest', cls: '' },
  { at: 6, tag: '', text: '✗ 1 failed · test_psi_to_kpa', cls: 'bad' },
  { at: 7, tag: 'think', text: 'PSI factor is 6.89 → should be 6.894757', cls: 'think' },
  { at: 8, tag: 'edit', text: 'src/units.py   −1 +1', cls: '' },
  { at: 9, tag: 'run', text: 'pytest', cls: '' },
  { at: 9, tag: '', text: '✓ 42 passed', cls: 'good' },
  { at: 10, tag: 'done', text: 'Fixed the conversion constant. All tests pass.', cls: 'done' },
]
</script>

<template>
  <div class="grid">
    <!-- BEFORE: chatbot -->
    <div class="panel st up" :class="{ on: s >= 1 }">
      <div class="head"><span class="dot" style="background: var(--ctx)" /> Chatbot</div>
      <div class="bubble user">Our CI test for the unit converter is failing. Fix it.</div>
      <div class="bubble bot st up" :class="{ on: s >= 2 }">
        Sure! Here's some code you could try:
        <pre>def psi_to_kpa(p):
    return p * 6.89</pre>
        Let me know if it works! 😊
      </div>
      <div class="verdict st up" :class="{ on: s >= 3 }">You still copy, paste, run, and check.</div>
    </div>

    <!-- AFTER: agent -->
    <div class="panel agent st up" :class="{ on: s >= 4 }">
      <div class="head"><span class="dot" style="background: var(--loop)" /> Agent</div>
      <div class="bubble user">Our CI test for the unit converter is failing. Fix it.</div>
      <div class="term">
        <div v-for="(l, i) in lines" :key="i" class="line st left" :class="[l.cls, { on: s >= l.at }]">
          <span v-if="l.tag" class="tag">{{ l.tag }}</span>
          <span v-else class="tag ghost" />
          <span>{{ l.text }}</span>
        </div>
        <span class="cursor blink" :class="{ hide: s >= 10 }">▍</span>
      </div>
      <div class="verdict st up" :class="{ on: s >= 10 }" style="color: var(--loop)">It does the work and checks it.</div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1.25fr; gap: 28px; margin-top: 18px; }
.panel { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; padding: 18px 20px; height: 470px; display: flex; flex-direction: column; gap: 12px; }
.panel.agent { border-color: color-mix(in srgb, var(--loop) 40%, var(--line)); }
.head { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); display: flex; align-items: center; gap: 8px; }
.dot { width: 9px; height: 9px; border-radius: 50%; }
.bubble { border-radius: 12px; padding: 10px 14px; font-size: 0.95rem; line-height: 1.45; max-width: 92%; }
.bubble.user { align-self: flex-end; background: #1f2a3a; }
.bubble.bot { background: var(--panel-2); }
.bubble pre { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; background: #0b0d12; padding: 8px 10px; border-radius: 8px; margin: 8px 0; }
.term { flex: 1; background: #07080c; border-radius: 10px; padding: 12px 14px; font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; line-height: 1.85; }
.line { display: flex; gap: 10px; }
.tag { display: inline-block; min-width: 54px; color: var(--tool); }
.tag.ghost { visibility: hidden; }
.line.bad { color: var(--bad); }
.line.good { color: var(--tool); font-weight: 600; }
.line.think { color: #fdba74; font-style: italic; }
.line.think .tag { color: var(--llm); }
.line.done .tag { color: var(--loop); }
.cursor { color: var(--muted); }
.cursor.hide { display: none; }
.verdict { margin-top: auto; font-weight: 600; font-size: 1.05rem; color: var(--muted); }
</style>
