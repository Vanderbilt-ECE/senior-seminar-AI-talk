<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

// The three things an MCP server can expose to an AI app.
const offers = [
  { name: 'Tools', plain: 'Things the AI can do', ex: 'export_gerbers() · run_sim(netlist)' },
  { name: 'Resources', plain: 'Things the AI can read', ex: 'notes · datasheets · channel history' },
  { name: 'Prompts', plain: 'Ready-made workflows you can pick', ex: '"Summarize this week\'s messages"' },
]
</script>

<template>
  <div class="arch">
    <div class="box">
      <div class="bt">AI app</div>
      <div class="bd">Where you work with the model</div>
      <div class="bx mono">Claude · ChatGPT · Cursor</div>
    </div>
    <div class="wire mcp"><span>MCP</span></div>
    <div class="box srv">
      <div class="bt">MCP server</div>
      <div class="bd">A small adapter program</div>
      <div class="bx mono">one per application</div>
    </div>
    <div class="wire"><span>its own API</span></div>
    <div class="box">
      <div class="bt">The application</div>
      <div class="bd">Software you already use</div>
      <div class="bx mono">email · notes · CAD · simulation software</div>
    </div>
  </div>

  <div class="panel st up" :class="{ on: s >= 1 }">
    <div class="head mono">What a server can give the AI</div>
    <div class="rows">
      <div v-for="it in offers" :key="it.name" class="row">
        <div class="name">{{ it.name }}</div>
        <div class="plain">{{ it.plain }}</div>
        <div class="ex mono">{{ it.ex }}</div>
      </div>
    </div>
  </div>

  <div class="where">
    <div class="card st up" :class="{ on: s >= 2 }">
      <carbon-laptop class="ic" />
      <div>
        <b>Local</b>
        <p>Apps running on your computer</p>
        <div class="bx mono">Fusion · Obsidian · Eagle · SPICE</div>
      </div>
    </div>
    <div class="card st up" :class="{ on: s >= 2 }">
      <carbon-cloud class="ic" />
      <div>
        <b>Remote</b>
        <p>Web apps and online services</p>
        <div class="bx mono">Google Drive · calendars · email</div>
      </div>
    </div>
    <div class="card key st up" :class="{ on: s >= 3 }">
      <carbon-locked class="ic" />
      <div>
        <b>Secure sign-in</b>
        <p>Sign in to your personal accounts: your files, calendar, and mail</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.arch { display: flex; align-items: stretch; }
.box { flex: 0 0 auto; background: var(--panel); border: 1.5px solid var(--line); border-radius: 12px; padding: 14px 22px; display: flex; flex-direction: column; justify-content: center; }
.box.srv { border-color: var(--mcp); background: color-mix(in srgb, var(--mcp) 9%, var(--panel)); }
.bt { font-weight: 700; font-size: 1.23rem; color: var(--text); }
.srv .bt { color: var(--mcp); }
.bd { font-size: 0.95rem; color: var(--text); opacity: 0.85; }
.bx { font-size: 0.83rem; color: var(--muted); margin-top: 2px; }
.wire { flex: 1; align-self: center; height: 2px; background: var(--dim); position: relative; min-width: 60px; }
.wire.mcp { background: var(--mcp); }
.wire span { position: absolute; left: 50%; top: -20px; transform: translateX(-50%); font-family: 'JetBrains Mono', monospace; font-size: 0.81rem; color: var(--muted); white-space: nowrap; }
.wire.mcp span { color: var(--mcp); font-weight: 700; font-size: 0.9rem; }

.panel { margin-top: 30px; background: var(--panel); border: 1px solid color-mix(in srgb, var(--mcp) 30%, var(--line)); border-radius: 14px; padding: 18px 26px 20px; display: flex; flex-direction: column; gap: 14px; }
.rows { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.head { font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.row { border-left: 3px solid var(--mcp); padding-left: 12px; line-height: 1.3; }
.name { font-weight: 700; font-size: 1.29rem; color: var(--mcp); }
.plain { color: var(--text); font-size: 1.1rem; }
.ex { font-size: 0.85rem; color: var(--muted); margin-top: 2px; }

.where { display: grid; grid-template-columns: 1.1fr 1fr 1.15fr; gap: 22px; margin-top: 30px; }
.card { display: flex; gap: 14px; align-items: flex-start; background: var(--panel); border: 1.5px solid var(--line); border-radius: 12px; padding: 16px 20px; }
.card.key { border-color: var(--mcp); background: color-mix(in srgb, var(--mcp) 9%, var(--panel)); }
.ic { font-size: 1.9rem; color: var(--mcp); flex: 0 0 auto; margin-top: 2px; }
.card b { font-size: 1.18rem; color: var(--text); }
.card p { margin: 0; font-size: 0.99rem; color: var(--text); opacity: 0.85; line-height: 1.35; }
</style>
