<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="grid">
    <div class="email">
      <div class="meta"><b>From:</b> R. Okafor, Supply Chain<br><b>Re:</b> March build: brackets</div>
      <p>
        Hi team, following up on Tuesday's call. We'll need
        <span class="hl" :class="{ on: s >= 1 }" data-n="2">four hundred fifty</span>
        of the brackets (our PN
        <span class="hl" :class="{ on: s >= 1 }" data-n="1">BRK-2207</span>, rev C) for the March build.
        The bore has to hold
        <span class="hl" :class="{ on: s >= 1 }" data-n="3">±0.05 mm</span>
        or QA will bounce them. Thanks!
      </p>
    </div>

    <div class="arrow st" :class="{ on: s >= 2 }">
      <svg viewBox="0 0 80 40" width="80"><path d="M0 20 H 66" stroke="#facc15" stroke-width="3" class="flow" /><path d="M64 10 L80 20 L64 30 Z" fill="#facc15" /></svg>
      <div class="mono">LLM</div>
    </div>

    <div class="json st" :class="{ on: s >= 2 }">
      <div class="schema-tag">schema</div>
      <div class="ln">{</div>
      <div class="ln ind"><span class="key">"part_no"</span>: <span class="slot" :class="{ filled: s >= 3 }" data-n="1"><span class="type">string</span><span class="val">"BRK-2207"</span></span>,</div>
      <div class="ln ind"><span class="key">"qty"</span>: <span class="slot" :class="{ filled: s >= 3 }" data-n="2"><span class="type">integer</span><span class="val">450</span></span>,</div>
      <div class="ln ind"><span class="key">"tolerance_mm"</span>: <span class="slot" :class="{ filled: s >= 3 }" data-n="3"><span class="type">number</span><span class="val">0.05</span></span></div>
      <div class="ln">}</div>
    </div>
  </div>
  <div class="note st up" :class="{ on: s >= 4 }">
    "four hundred fifty" → <b class="c-json">450</b>. Unlike a regex, it understands the email, then writes the answer in your format.
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 110px 1fr; gap: 16px; align-items: center; margin-top: 24px; }
.email { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 20px 22px; font-size: 1.15rem; line-height: 1.75; }
.meta { font-size: 0.85rem; color: var(--muted); line-height: 1.5; border-bottom: 1px solid var(--line); padding-bottom: 10px; margin-bottom: 10px; }
.hl { white-space: nowrap; border-radius: 5px; padding: 1px 4px; transition: all 0.5s; position: relative; }
.hl.on { background: color-mix(in srgb, var(--json) 25%, transparent); outline: 1px solid var(--json); }
.hl.on::after, .slot.filled::after {
  content: attr(data-n); position: absolute; top: -10px; right: -10px; width: 18px; height: 18px; border-radius: 50%;
  background: var(--json); color: #000; font-size: 11px; font-weight: 700; line-height: 18px; text-align: center; font-family: 'JetBrains Mono', monospace;
}
.arrow { display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--llm); font-size: 0.85rem; }
.json { background: #1a1405; border: 1px solid var(--json); border-radius: 14px; padding: 22px 24px; font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; line-height: 2.1; position: relative; }
.schema-tag { position: absolute; top: -11px; left: 18px; background: var(--bg); padding: 0 8px; color: var(--json); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; }
.ind { padding-left: 1.6em; }
.key { color: var(--json); }
.slot { position: relative; display: inline-block; min-width: 120px; padding: 0 8px; border-radius: 6px; border: 1px dashed var(--dim); }
.slot .val { display: none; }
.slot .type { color: var(--dim); font-style: italic; }
.slot.filled { border: 1px solid var(--json); background: color-mix(in srgb, var(--json) 14%, transparent); animation: pop 0.5s var(--ease); }
.slot.filled .val { display: inline; color: var(--text); }
.slot.filled .type { display: none; }
@keyframes pop { from { transform: scale(0.85); } to { transform: none; } }
.note { margin-top: 28px; font-size: 1.25rem; }
</style>
