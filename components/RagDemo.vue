<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

const hits = [
  { src: 'ACI 318-19 · Table 20.5.1.3.1', score: 0.91 },
  { src: 'Project geotech report §4.2', score: 0.66 },
  { src: 'ACI 350-20 · environmental structures', score: 0.58 },
]
const rows = [
  ['Cast against and permanently in contact with ground', 'All', '3 in.'],
  ['Exposed to weather or in contact with ground', 'No. 6–18', '2 in.'],
  ['', 'No. 5 and smaller', '1.5 in.'],
  ['Not exposed to weather or in contact with ground', 'slabs, walls…', '¾ in.'],
]
</script>

<template>
  <DemoFrame
    task="Minimum concrete cover for #8 bars in a spread footing cast directly against soil?"
    :tools="['search_codes', 'read_clause']"
    verify="Every number links to a clause you can open. Confirm the adopted code edition with the local building official."
    :verify-on="s >= 5"
  >
    <div class="pane">
      <div class="hits st" :class="{ on: s >= 1 }">
        <div class="sub mono">search_codes("cover cast against earth footing")</div>
        <div v-for="(h, i) in hits" :key="h.src" class="hit" :class="{ top: i === 0 }">
          <span>{{ h.src }}</span><span class="mono score">{{ h.score.toFixed(2) }}</span>
        </div>
      </div>

      <div class="tbl st up" :class="{ on: s >= 2 }">
        <div class="sub mono">read_clause("ACI 318-19 Table 20.5.1.3.1")  ·  cast-in-place, nonprestressed</div>
        <table>
          <thead><tr><th>Exposure</th><th>Member / bar</th><th>Cover</th></tr></thead>
          <tbody>
            <tr v-for="(r, i) in rows" :key="i" :class="{ pick: s >= 5 && i === 0 }">
              <td>{{ r[0] }}</td><td>{{ r[1] }}</td><td class="mono">{{ r[2] }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="ans st up" :class="{ on: s >= 3 }">
        A footing cast against soil needs <b>3 in. (76 mm)</b> of cover, for any bar size <span class="cite" :class="{ glow: s >= 5 }">1</span>.
        <span class="st" :class="{ on: s >= 4 }">The 2 in. value applies only to formed surfaces exposed to earth.</span>
      </div>
    </div>

    <template #trace>
      <TraceStep kind="think" :on="s >= 1">Key facts: cast against earth, #8 bars.</TraceStep>
      <TraceStep kind="act" :on="s >= 1">search_codes(…)</TraceStep>
      <TraceStep kind="obs" :on="s >= 1">3 hits · top: ACI 318 cover table</TraceStep>
      <TraceStep kind="act" :on="s >= 2">read_clause(Table 20.5.1.3.1)</TraceStep>
      <TraceStep kind="obs" :on="s >= 2">4 rows of cover requirements</TraceStep>
      <TraceStep kind="act" :on="s >= 3">answer with citation [1]</TraceStep>
      <TraceStep kind="think" :on="s >= 4">Common mix-up: 2 in. row is for formed faces. Say so.</TraceStep>
      <TraceStep kind="good" :on="s >= 5">citation [1] → row 1 ✓</TraceStep>
    </template>
  </DemoFrame>
</template>

<style scoped>
.pane { padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; height: 100%; }
.sub { font-size: 0.7rem; color: var(--tool); margin-bottom: 4px; }
.hit { display: flex; justify-content: space-between; font-size: 0.82rem; padding: 3px 8px; border-radius: 5px; color: var(--muted); }
.hit.top { background: #132447; color: var(--text); }
.score { color: #93c5fd; }
table { width: 100%; border-collapse: collapse; font-size: 0.78rem; }
th { text-align: left; color: var(--muted); font-weight: 500; border-bottom: 1px solid var(--line); padding: 3px 6px; }
td { padding: 4px 6px; border-bottom: 1px solid #161b26; transition: all 0.5s; }
tr.pick td { background: color-mix(in srgb, var(--rag) 25%, transparent); color: white; }
.ans { background: #2a1a0e; border: 1px solid var(--llm); border-radius: 10px; padding: 9px 12px; font-size: 0.9rem; line-height: 1.45; }
.cite { display: inline-flex; width: 17px; height: 17px; border-radius: 50%; background: var(--rag); color: white; font-size: 10px; font-weight: 700; align-items: center; justify-content: center; vertical-align: 2px; font-family: 'JetBrains Mono', monospace; }
.cite.glow { box-shadow: 0 0 0 4px color-mix(in srgb, var(--rag) 40%, transparent); }
</style>
