<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// Concept "stack" rail. Each slide sets `stage: n` in frontmatter
// (1 = LLM … 7 = Loop, 8 = Verification, 9 = everything lit for the wrap-up).
const { $frontmatter } = useSlideContext()

const stages = [
  { label: 'LLM', color: 'var(--llm)' },
  { label: 'Chatbot', color: 'var(--ctx)' },
  { label: 'Structured', color: 'var(--json)' },
  { label: 'Tools', color: 'var(--tool)' },
  { label: 'MCP', color: 'var(--mcp)' },
  { label: 'RAG', color: 'var(--rag)' },
  { label: 'Loop', color: 'var(--loop)' },
  { label: 'Verification', color: 'var(--human)' },
]
const stage = computed(() => Number($frontmatter?.stage ?? 0))
</script>

<template>
  <div v-if="stage > 0" class="rail">
    <div
      v-for="(s, i) in stages"
      :key="s.label"
      class="seg"
      :class="{ lit: i < stage, cur: i === stage - 1 }"
      :style="{ '--c': s.color }"
    >
      <span class="bar" />
      <span class="lbl">{{ s.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.rail {
  position: absolute;
  top: 14px;
  right: 3.2rem;
  display: flex;
  gap: 6px;
  z-index: 10;
}
.seg { display: flex; flex-direction: column; align-items: center; gap: 3px; width: 66px; }
.bar { width: 100%; height: 4px; border-radius: 2px; background: var(--line); transition: background 0.5s; }
.lbl {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--dim);
}
.seg.lit .bar { background: var(--c); opacity: 0.55; }
.seg.lit .lbl { color: var(--muted); }
.seg.cur .bar { opacity: 1; box-shadow: 0 0 8px var(--c); }
.seg.cur .lbl { color: var(--c); }
</style>
