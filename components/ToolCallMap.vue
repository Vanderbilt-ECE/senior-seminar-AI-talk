<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()
// 1: tools.py · 2: both tool calls · 3: match read_file · 4: match write_file
// 5: your code dispatches the call · 6: the key idea
</script>

<template>
  <div class="grid">
    <!-- left: plain Python -->
    <div class="col st left" :class="{ on: s >= 1 }">
      <div class="head">tools.py · ordinary functions you write</div>
      <pre class="code"><span class="kw">def</span> <span class="nm" :class="{ on: s >= 3 }">read_file</span>(<span class="ar" :class="{ on: s >= 3 }">path</span>: <span class="ty">str</span>) -> <span class="ty">str</span>:
    <span class="doc">"""Return the contents of a text file."""</span>
    <span class="kw">with</span> open(path) <span class="kw">as</span> f:
        <span class="kw">return</span> f.read()

<span class="kw">def</span> <span class="nm" :class="{ on: s >= 4 }">write_file</span>(<span class="ar" :class="{ on: s >= 4 }">path</span>: <span class="ty">str</span>, <span class="ar" :class="{ on: s >= 4 }">content</span>: <span class="ty">str</span>):
    <span class="doc">"""Write text to a file, replacing it."""</span>
    <span class="kw">with</span> open(path, <span class="str">"w"</span>) <span class="kw">as</span> f:
        f.write(content)</pre>
      <div class="cap">The model is shown each function's <b>name</b>, <b>docstring</b>, and <b>argument types</b>.</div>
    </div>

    <!-- middle arrows -->
    <div class="mid">
      <div class="arrow st" :class="{ on: s >= 3 }">→</div>
      <div class="arrow st" :class="{ on: s >= 4 }">→</div>
    </div>

    <!-- right: the same functions as structured output -->
    <div class="col st" :class="{ on: s >= 2 }">
      <div class="head c-tool">What the model writes · a tool call</div>
      <pre class="card">{
  <span class="k">"tool"</span>: <span class="nm" :class="{ on: s >= 3 }">"read_file"</span>,
  <span class="k">"args"</span>: {
    <span class="ar" :class="{ on: s >= 3 }">"path"</span>: <span class="str">"specs/bracket.md"</span>
  }
}</pre>
      <pre class="card">{
  <span class="k">"tool"</span>: <span class="nm" :class="{ on: s >= 4 }">"write_file"</span>,
  <span class="k">"args"</span>: {
    <span class="ar" :class="{ on: s >= 4 }">"path"</span>: <span class="str">"notes/summary.md"</span>,
    <span class="ar" :class="{ on: s >= 4 }">"content"</span>: <span class="str">"Max load: 1.2 kN"</span>
  }
}</pre>
    </div>
  </div>

  <div class="dispatch st up" :class="{ on: s >= 5 }">
    <span class="lbl">your code runs it</span>
    <code><span class="nm on">TOOLS[call["tool"]]</span>(**<span class="ar on">call["args"]</span>)</code>
    <span class="eq">→ read_file(path="specs/bracket.md")</span>
  </div>

  <div class="note st up" :class="{ on: s >= 6 }">
    Function name → <span class="c-tool">"tool"</span>. Parameters → <span class="c-json">"args"</span>. The model doesn't call anything. It <b class="c-tool">writes a request</b>.
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1.08fr 54px 1fr; gap: 14px; align-items: stretch; }
.col { display: flex; flex-direction: column; gap: 12px; }
.head { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }

pre { margin: 0; font-family: 'JetBrains Mono', monospace; line-height: 1.55; }
.code { background: #07080c; border: 1px solid var(--line); border-radius: 14px; padding: 18px 22px; font-size: 1.08rem; flex: 1; }
.card { background: #0b1d12; border: 1px solid var(--tool); border-radius: 14px; padding: 14px 22px; font-size: 1.05rem; }
.kw { color: #c084fc; }
.ty { color: var(--ctx); }
.doc { color: var(--muted); font-style: italic; }
.str { color: #fca5a5; }
.k { color: var(--muted); }
.cap { font-size: 1rem; color: var(--muted); }
.cap b { color: var(--text); }

/* matched highlights: function name ↔ "tool", parameters ↔ "args" keys */
.nm, .ar { border-radius: 5px; padding: 0 2px; transition: background 0.5s, color 0.5s, box-shadow 0.5s; }
.nm.on { color: var(--tool); font-weight: 700; background: color-mix(in srgb, var(--tool) 16%, transparent); box-shadow: 0 0 0 1px color-mix(in srgb, var(--tool) 60%, transparent); }
.ar.on { color: var(--json); background: color-mix(in srgb, var(--json) 14%, transparent); box-shadow: 0 0 0 1px color-mix(in srgb, var(--json) 55%, transparent); }
.nm:not(.on) { color: var(--tool); }
.card .ar:not(.on) { color: var(--text); }

.mid { display: flex; flex-direction: column; justify-content: space-around; align-items: center; padding-top: 30px; }
.arrow { font-size: 2.2rem; color: var(--tool); }

.dispatch {
  margin-top: 22px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
  background: var(--panel); border: 1px dashed var(--tool); border-radius: 12px; padding: 12px 20px;
  font-family: 'JetBrains Mono', monospace; font-size: 1.1rem;
}
.dispatch .lbl { font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
.dispatch code { background: none; padding: 0; font-size: 1.1rem; }
.dispatch .eq { color: var(--muted); }
.note { margin-top: 16px; font-size: 1.3rem; font-weight: 600; text-align: center; }
</style>
