<script setup lang="ts">
import { useStep } from '../composables/useStep'

// preview: a quiet row of the seven layers (used on the promise slide)
// full:    the recap, assembling bottom-up one layer per click, then the
//          verification frame around everything.
defineProps<{ mode?: 'preview' | 'full' }>()
const s = useStep()

const layers = [
  { name: 'LLM', line: 'predicts the next token; frozen, isolated', c: 'var(--llm)' },
  { name: 'Chatbot', line: 'a loop that resends the whole history', c: 'var(--ctx)' },
  { name: 'Structured output', line: 'text a program can parse', c: 'var(--json)' },
  { name: 'Tools', line: 'structured output that triggers your code', c: 'var(--tool)' },
  { name: 'MCP', line: 'one plug for every tool', c: 'var(--mcp)' },
  { name: 'Retrieval', line: 'search results pasted into context', c: 'var(--rag)' },
  { name: 'Agent loop', line: 'think → act → observe until done', c: 'var(--loop)' },
]
</script>

<template>
  <div v-if="mode === 'preview'" class="row">
    <div v-for="l in layers" :key="l.name" class="chip" :style="{ '--c': l.c }">{{ l.name }}</div>
    <div class="chip" style="--c: var(--human)">Verification</div>
  </div>

  <div v-else class="stack-wrap">
    <div class="verify st" :class="{ on: s >= 8 }">
      <span>Verification: tests · sims · checks · humans</span>
    </div>
    <div class="stack">
      <div
        v-for="(l, i) in layers"
        :key="l.name"
        class="layer st up"
        :class="{ on: s >= i + 1 }"
        :style="{ '--c': l.c }"
      >
        <span class="name">{{ l.name }}</span>
        <span class="line">{{ l.line }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row { display: flex; gap: 10px; flex-wrap: wrap; }
.chip {
  font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;
  padding: 8px 14px; border-radius: 8px;
  border: 1px solid var(--c); color: var(--c);
  background: color-mix(in srgb, var(--c) 10%, transparent);
}
.stack-wrap { position: relative; width: 880px; margin: 28px auto 0; padding: 22px 26px 26px; }
.stack { display: flex; flex-direction: column-reverse; gap: 7px; }
.layer {
  display: flex; align-items: baseline; gap: 18px;
  padding: 10px 18px; border-radius: 10px;
  background: color-mix(in srgb, var(--c) 13%, var(--panel));
  border-left: 5px solid var(--c);
}
.name { font-weight: 700; font-size: 1.1rem; min-width: 190px; color: var(--c); }
.line { color: var(--text); font-size: 0.95rem; opacity: 0.85; }
.verify {
  position: absolute; inset: 0;
  border: 2px dashed var(--human); border-radius: 18px;
}
.verify span {
  position: absolute; top: -12px; left: 24px; padding: 0 10px;
  background: var(--bg); font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;
  letter-spacing: 0.08em; text-transform: uppercase;
}
</style>
