<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
</script>

<template>
  <div class="grid">
    <pre class="code"><span class="cm"># lab_bench_server.py</span>
<span class="kw">from</span> mcp.server.fastmcp <span class="kw">import</span> FastMCP

mcp = FastMCP(<span class="str">"lab-bench"</span>)

<span :class="{ hl: s === 1 }">@mcp.tool()
<span class="kw">def</span> <span class="fn">read_thermocouple</span></span>(<span :class="{ hl: s === 2 }">channel: <span class="ty">int</span></span>) -&gt; <span :class="{ hl: s === 2 }"><span class="ty">float</span></span>:
    <span :class="{ hl: s === 3 }"><span class="str">"""Temperature in °C from a DAQ channel (0–7)."""</span></span>
    <span class="kw">return</span> daq.read_temp(channel)

mcp.run()</pre>

    <div class="notes">
      <div class="n st left" :class="{ on: s >= 1, cur: s === 1 }"><b>Function name</b> → tool name</div>
      <div class="n st left" :class="{ on: s >= 2, cur: s === 2 }"><b>Type hints</b> → input schema <span class="c-muted">(section 3!)</span></div>
      <div class="n st left" :class="{ on: s >= 3, cur: s === 3 }"><b>Docstring</b> → description the model reads</div>

      <div class="chat st up" :class="{ on: s >= 4 }">
        <div class="u">What's the oven temp on channel 3?</div>
        <div class="call mono">read_thermocouple(channel=3) → 23.7</div>
        <div class="a">Channel 3 reads <b>23.7 °C</b>.</div>
        <div class="tag mono">works in any MCP-compatible assistant</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 34px; margin-top: 20px; align-items: start; }
.code { margin: 0; background: #07080c; border: 1px solid var(--line); border-radius: 14px; padding: 20px 22px; font-family: 'JetBrains Mono', monospace; font-size: 1rem; line-height: 1.65; }
.kw { color: #fb923c; } .str { color: #a3e635; } .fn { color: #60a5fa; } .ty { color: #facc15; } .cm { color: var(--dim); }
.hl { background: color-mix(in srgb, var(--mcp) 22%, transparent); outline: 1px solid var(--mcp); border-radius: 4px; }
.notes { display: flex; flex-direction: column; gap: 12px; }
.n { font-size: 1.2rem; padding: 10px 14px; border-left: 4px solid var(--line); border-radius: 4px; transition: all 0.5s; }
.n.cur { border-left-color: var(--mcp); background: color-mix(in srgb, var(--mcp) 8%, transparent); }
.n b { color: var(--mcp); }
.chat { margin-top: 10px; background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; display: flex; flex-direction: column; gap: 8px; }
.u { align-self: flex-end; background: #0f2a33; border-radius: 10px; padding: 6px 12px; font-size: 0.95rem; }
.call { font-size: 0.82rem; color: var(--tool); }
.a { background: #2a1a0e; border-radius: 10px; padding: 6px 12px; font-size: 0.95rem; align-self: flex-start; }
.tag { font-size: 0.7rem; color: var(--mcp); letter-spacing: 0.06em; }
</style>
