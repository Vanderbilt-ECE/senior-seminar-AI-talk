<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

const cards = [
  {
    field: 'Chemistry · Pharma', icon: 'chem', title: 'Property calculator',
    tool: 'rdkit_descriptors(smiles)', loop: ['generate 200 candidates', 'compute MW, logP, HBD', 'filter by Lipinski', 'rank + explain'],
    verify: 'spot-check 5 against PubChem',
  },
  {
    field: 'Biology · Materials', icon: 'db', title: 'Database lookup',
    tool: 'uniprot.get(id) · mp.query(formula)', loop: ['parse gene / formula list', 'fetch records', 'reconcile conflicts', 'table with source IDs'],
    verify: 'every row links to its record',
  },
  {
    field: 'Computer science', icon: 'code', title: 'Coding agent',
    tool: 'read · edit · run_tests · git', loop: ['read the codebase', 'write the feature', 'run tests → fix failures', 'open a pull request'],
    verify: 'CI passes + human code review',
  },
]
</script>

<template>
  <div class="grid">
    <div v-for="(c, i) in cards" :key="c.title" class="card st up" :class="{ on: s >= i + 1 }">
      <div class="field mono">{{ c.field }}</div>
      <div class="title">
        <carbon-chemistry v-if="c.icon === 'chem'" class="ic" />
        <carbon-data-base v-else-if="c.icon === 'db'" class="ic" />
        <carbon-code v-else class="ic" />
        {{ c.title }}
      </div>
      <div class="tool mono">{{ c.tool }}</div>
      <ol class="loop">
        <li v-for="l in c.loop" :key="l">{{ l }}</li>
      </ol>
      <div class="verify">✓ {{ c.verify }}</div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 22px; }
.card { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; }
.field { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.title { font-size: 1.35rem; font-weight: 700; display: flex; align-items: center; gap: 10px; }
.ic { color: var(--tool); font-size: 1.6rem; }
.tool { font-size: 0.78rem; color: var(--tool); background: #0b1d12; border-radius: 6px; padding: 5px 8px; }
.loop { margin: 0; padding-left: 0; list-style: none; counter-reset: k; display: flex; flex-direction: column; gap: 5px; }
.loop li { counter-increment: k; font-size: 0.95rem; padding-left: 30px; position: relative; }
.loop li::before { content: counter(k); position: absolute; left: 0; top: 1px; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--loop); color: var(--loop); font-size: 11px; line-height: 17px; text-align: center; box-sizing: border-box; font-family: 'JetBrains Mono', monospace; }
.verify { margin-top: auto; font-size: 0.9rem; border-top: 1px solid var(--line); padding-top: 8px; color: var(--text); }
</style>
