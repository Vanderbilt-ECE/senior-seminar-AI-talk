<script setup lang="ts">
// Topics from the "What we didn't cover" slide that the course picks up.
// Colors match that slide's columns.
const topics = [
  { t: 'Prompt & context engineering', c: 'var(--llm)' },
  { t: 'Embeddings & vector search', c: 'var(--llm)' },
  { t: 'Fine-tuning', c: 'var(--llm)' },
  { t: 'Reasoning models', c: 'var(--llm)' },
  { t: 'Harness design', c: 'var(--loop)' },
  { t: 'Evaluation (evals)', c: 'var(--loop)' },
  { t: 'Multi-agent systems', c: 'var(--loop)' },
  { t: 'Long-term memory', c: 'var(--loop)' },
  { t: 'Observability & guardrails', c: 'var(--loop)' },
  { t: 'Open-weight & local models', c: 'var(--rag)' },
  { t: 'Security & prompt injection', c: 'var(--bad)' },
  { t: 'Cost & energy use', c: 'var(--bad)' },
]
</script>

<template>
  <div class="wrap">
    <div class="kicker mono">New course · Spring 2027</div>
    <div class="code mono">ECE 4602</div>
    <div class="name">AI Systems Engineering</div>
    <div class="pitch">Go deeper on what we skipped today, and build these systems yourself.</div>
    <div class="prereq"><carbon-checkmark-outline class="pi" /> <b>Prerequisite:</b> familiarity with Python</div>
    <div class="chips">
      <span v-for="x in topics" :key="x.t" class="chip" :style="{ '--c': x.c }">{{ x.t }}</span>
    </div>
  </div>
</template>

<style scoped>
.wrap { text-align: left; max-width: 1100px; }
.kicker { font-size: 0.95rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--loop); }
.code { margin-top: 14px; font-size: 2.6rem; font-weight: 700; color: var(--loop); line-height: 1.1; }
.name { font-size: 4rem; font-weight: 800; letter-spacing: -0.02em; line-height: 1.05; color: var(--text); }
.pitch { margin-top: 14px; font-size: 1.45rem; color: var(--text); opacity: 0.85; }
.prereq { margin-top: 18px; font-size: 1.2rem; color: var(--text); display: flex; align-items: center; gap: 8px; }
.prereq b { color: var(--loop); }
.pi { color: var(--loop); }
.chips { margin-top: 30px; display: flex; flex-wrap: wrap; gap: 10px 12px; }
.chip { font-size: 1.02rem; color: var(--text); background: var(--panel); border: 1px solid color-mix(in srgb, var(--c) 45%, var(--line)); border-left: 4px solid var(--c); border-radius: 8px; padding: 7px 14px; }
</style>
