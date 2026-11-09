<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="grid">
    <div class="left">
      <div class="bubble">
        Fillet welds under 6 mm on static brackets don't require inspection,
        per Henderson &amp; Liu (2021), <i>J. Struct. Eng.</i> 147(9). <span class="cite">↗</span>
        <div class="conf mono">confidence: sounds 100 %</div>
      </div>
      <div class="check st up" :class="{ on: s >= 1 }">
        <div class="mono q">search_scholar("Henderson Liu 2021 fillet weld inspection")</div>
        <div class="mono r">→ 0 results · DOI does not resolve</div>
        <div class="stamp st pop" :class="{ on: s >= 2 }">NOT FOUND</div>
      </div>
    </div>
    <div class="lessons">
      <div class="l st left" :class="{ on: s >= 3 }"><b>Fluent ≠ correct.</b> It predicts plausible text, including plausible citations.</div>
      <div class="l st left" :class="{ on: s >= 4 }"><b>Tone tells you nothing.</b> Wrong answers sound exactly as confident as right ones.</div>
      <div class="l st left" :class="{ on: s >= 5 }"><b>Errors compound.</b> In a loop, a bad fact at step 3 becomes the foundation for step 4.</div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; margin-top: 26px; }
.bubble { background: #2a1a0e; border: 1px solid var(--llm); border-radius: 14px; padding: 18px 20px; font-size: 1.2rem; line-height: 1.5; }
.cite { color: var(--rag); font-weight: 700; }
.conf { margin-top: 8px; font-size: 0.75rem; color: var(--llm); }
.check { position: relative; margin-top: 18px; background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 14px 16px; }
.q { font-size: 0.85rem; color: var(--tool); }
.r { font-size: 0.85rem; color: var(--muted); margin-top: 4px; }
.stamp { position: absolute; right: 18px; bottom: -34px; border: 4px solid var(--bad); color: var(--bad); font-weight: 900; font-size: 1.6rem; letter-spacing: 0.08em; padding: 2px 14px; border-radius: 8px; transform: rotate(-8deg) scale(1.6); background: var(--bg); }
.stamp.on { transform: rotate(-8deg) scale(1); }
.lessons { display: flex; flex-direction: column; gap: 18px; }
.l { font-size: 1.15rem; line-height: 1.45; padding: 12px 16px; border-left: 4px solid var(--bad); background: color-mix(in srgb, var(--bad) 6%, transparent); border-radius: 4px; }
.l b { display: block; font-size: 1.3rem; }
</style>
