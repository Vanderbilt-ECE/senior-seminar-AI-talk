<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="grid">
    <div class="col">
      <div class="head">No system prompt</div>
      <div class="msg user">Is a 6 mm fillet weld OK for this bracket?</div>
      <div class="msg asst st up" :class="{ on: s >= 1 }">
        Great question! Fillet weld sizing depends on many factors, such as the load, the base material, and the weld length. Generally, 6 mm is a common size for many applications, so it may well be fine. 😊
      </div>
    </div>

    <div class="col">
      <div class="head">With a system prompt</div>
      <div class="msg system st left" :class="{ on: s >= 2 }">
        <div class="tag">📌 SYSTEM · resent every turn · user never sees it</div>
        You are a design reviewer for a structural team. Be terse. SI units. State assumptions. Flag anything safety-critical. Never approve a design; recommend.
      </div>
      <div class="msg user st up" :class="{ on: s >= 3 }">Is a 6 mm fillet weld OK for this bracket?</div>
      <div class="msg asst st up" :class="{ on: s >= 4 }">
        Can't confirm. Need: factored load, weld length, electrode (assume E70XX).<br>
        <span class="warn">⚠ Load-bearing joint → route to PE review.</span>
      </div>
    </div>
  </div>
  <div class="note st up" :class="{ on: s >= 5 }">
    Same model, same question. The system prompt is just the <b class="c-ctx">first message in the list</b>.
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 14px; }
.col { display: flex; flex-direction: column; gap: 12px; }
.head { font-family: 'JetBrains Mono', monospace; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
.msg { border-radius: 12px; padding: 12px 16px; font-size: 1rem; line-height: 1.45; }
.msg.user { align-self: flex-end; background: #0f2a33; border: 1px solid color-mix(in srgb, var(--ctx) 50%, transparent); max-width: 90%; }
.msg.asst { background: #2a1a0e; border: 1px solid color-mix(in srgb, var(--llm) 50%, transparent); max-width: 95%; }
.msg.system { background: #1a1f2e; border: 1px dashed var(--human); font-size: 0.95rem; }
.tag { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.08em; color: var(--muted); margin-bottom: 4px; }
.warn { color: var(--json); font-weight: 600; }
.note { margin-top: 18px; font-size: 1.2rem; }
</style>
