<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

// How an agent uses skills, in the order it happens.
const steps = [
  { t: 'Browse', d: 'The agent sees only each skill\'s name and one-line description.' },
  { t: 'Load', d: 'When a task matches, it reads the full instructions.' },
  { t: 'Follow', d: 'It works through the steps and runs the included scripts.' },
]
</script>

<template>
  <div class="pair">
    <div class="card">
      <carbon-plug class="ic mcp" />
      <div>
        <b class="c-mcp">MCP</b> gives the agent <b>access</b>
        <p>Connects it to your applications</p>
      </div>
    </div>
    <div class="card">
      <carbon-education class="ic sk" />
      <div>
        <b class="c-sk">A skill</b> gives the agent <b>know-how</b>
        <p>Teaches it how you do a specific task</p>
      </div>
    </div>
  </div>

  <div class="grid">
    <div class="panel st up" :class="{ on: s >= 1 }">
      <div class="head mono">Example skill: a folder</div>
      <div class="tree mono">
        <div><carbon-folder class="fi" /> test-report/</div>
        <div class="in"><carbon-document class="fi" /> <b>SKILL.md</b> <span class="dim">instructions</span></div>
        <div class="in"><carbon-document class="fi" /> template.docx <span class="dim">the lab's format</span></div>
        <div class="in"><carbon-document class="fi" /> check_totals.py <span class="dim">a built-in check</span></div>
      </div>
      <div class="md mono">
        <div class="dim">SKILL.md</div>
        <div><span class="k">description:</span> Write a lab test report from raw data</div>
        <div>1. Compute max, min, and mean from the CSV</div>
        <div>2. Fill in template.docx</div>
        <div>3. Run check_totals.py and fix any mismatch</div>
      </div>
    </div>

    <div class="panel st up" :class="{ on: s >= 2 }">
      <div class="head mono">How the agent uses it</div>
      <div v-for="(st, i) in steps" :key="st.t" class="step">
        <span class="n mono">{{ i + 1 }}</span>
        <div><b>{{ st.t }}.</b> {{ st.d }}</div>
      </div>
      <div class="note">Unused skills cost almost nothing: the context window stays small.</div>
    </div>
  </div>
</template>

<style scoped>
.pair { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 6px; }
.card { display: flex; gap: 14px; align-items: center; background: var(--panel); border: 1.5px solid var(--line); border-radius: 12px; padding: 14px 20px; font-size: 1.15rem; color: var(--text); }
.card p { margin: 2px 0 0; font-size: 0.95rem; color: var(--muted); }
.ic { font-size: 2rem; flex: 0 0 auto; }
.ic.mcp, .c-mcp { color: var(--mcp); }
.ic.sk, .c-sk { color: var(--json); }

.grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 24px; margin-top: 22px; }
.panel { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 16px 22px; display: flex; flex-direction: column; gap: 10px; }
.head { font-size: 0.8rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.tree { font-size: 0.95rem; color: var(--text); line-height: 1.6; }
.tree .in { padding-left: 26px; }
.fi { color: var(--json); vertical-align: -2px; }
.dim { color: var(--muted); font-size: 0.82rem; margin-left: 6px; }
.md { background: #07080c; border-radius: 8px; padding: 10px 14px; font-size: 0.85rem; line-height: 1.55; color: var(--text); }
.md .dim { margin-left: 0; }
.md .k { color: var(--json); }
.step { display: grid; grid-template-columns: 26px 1fr; gap: 8px; align-items: baseline; font-size: 1.05rem; color: var(--text); line-height: 1.4; }
.step b { color: var(--json); }
.n { color: var(--json); font-weight: 700; }
.note { margin-top: auto; border-left: 3px solid var(--json); padding: 6px 12px; font-size: 0.95rem; color: var(--text); background: color-mix(in srgb, var(--json) 8%, transparent); border-radius: 4px; }
</style>
