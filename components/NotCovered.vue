<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
// Topics this talk deliberately skipped, grouped for further reading.
const groups = [
  {
    name: 'Using models well', c: 'var(--llm)', icon: 'carbon-chat',
    items: ['Prompt engineering', 'Context engineering', 'Fine-tuning', 'Embeddings & vector search', 'Reasoning models', 'Images, audio & video input'],
  },
  {
    name: 'Building agents', c: 'var(--loop)', icon: 'carbon-tool-kit',
    items: ['Harness design', 'Evaluation (evals)', 'Multi-agent systems', 'Long-term memory', 'Computer use', 'Observability & tracing', 'Guardrails'],
  },
  {
    name: 'How models are made', c: 'var(--rag)', icon: 'carbon-machine-learning-model',
    items: ['Pretraining & scaling laws', 'Reinforcement learning', 'Open-weight & local models', 'Quantization & inference', 'Image & video generation', 'Interpretability'],
  },
  {
    name: 'Risks & society', c: 'var(--bad)', icon: 'carbon-warning-alt',
    items: ['Prompt injection & security', 'Alignment & AI safety', 'Bias & fairness', 'Privacy, copyright & IP', 'Cost & energy use', 'Regulation', 'Jobs & education'],
  },
]
</script>

<template>
  <div class="grid">
    <div v-for="(g, i) in groups" :key="g.name" class="col st up" :class="{ on: s >= i + 1 }" :style="{ '--c': g.c }">
      <div class="head">
        <carbon-chat v-if="g.icon === 'carbon-chat'" class="ic" />
        <carbon-tool-kit v-else-if="g.icon === 'carbon-tool-kit'" class="ic" />
        <carbon-machine-learning-model v-else-if="g.icon === 'carbon-machine-learning-model'" class="ic" />
        <carbon-warning-alt v-else class="ic" />
        <span>{{ g.name }}</span>
      </div>
      <div class="items">
        <div v-for="it in g.items" :key="it" class="item">{{ it }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 18px; }
.col { background: var(--panel); border: 1px solid color-mix(in srgb, var(--c) 35%, var(--line)); border-top: 4px solid var(--c); border-radius: 14px; padding: 16px 18px 18px; }
.head { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 1.12rem; color: var(--text); margin-bottom: 14px; line-height: 1.2; }
.ic { font-size: 1.5rem; color: var(--c); flex: 0 0 auto; }
.items { display: flex; flex-direction: column; gap: 8px; }
.item { font-size: 1rem; color: var(--text); background: #07080c; border-left: 3px solid color-mix(in srgb, var(--c) 70%, transparent); border-radius: 6px; padding: 6px 10px; }
</style>
