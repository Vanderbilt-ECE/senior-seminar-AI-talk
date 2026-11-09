<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

// Same request sampled three times: three different texts.
const runs = [
  'Sure! I\'ll order 450 of the BRK-2207 brackets at ±0.05 mm. 😊',
  'Placing order: BRK-2207 × 450, tolerance 0.05 mm.',
  'Got it, four hundred fifty brackets (BRK-2207), tol. about ±0.05mm.',
]
</script>

<template>
  <div class="ask">
    <span class="lbl">Request</span> "Order 450 BRK-2207 brackets, ±0.05 mm tolerance."
  </div>

  <div class="grid">
    <!-- the LLM side -->
    <div class="side llm st left" :class="{ on: s >= 1 }">
      <div class="kind">The LLM</div>
      <div class="trait">Probabilistic</div>
      <div class="sub">samples the next token · only ever outputs <b>text</b></div>
      <div class="runs">
        <div v-for="(r, i) in runs" :key="i" class="run st up" :class="{ on: s >= 2 }" :style="{ transitionDelay: `${i * 0.25}s` }">
          <span class="n">run {{ i + 1 }}</span>{{ r }}
        </div>
      </div>
      <div class="foot st" :class="{ on: s >= 2 }">Same request, three different answers.</div>
    </div>

    <!-- the gap -->
    <div class="gap">
      <div class="chasm st" :class="{ on: s >= 4, off: s >= 5 }">
        <div class="q">?</div>
        <div class="gq">text → action</div>
      </div>
      <div class="bridge st pop" :class="{ on: s >= 5 }">
        <div class="plank">{ }</div>
        <div class="bname">structured output</div>
      </div>
    </div>

    <!-- the software side -->
    <div class="side sw st left" :class="{ on: s >= 3 }">
      <div class="kind">Your software</div>
      <div class="trait">Deterministic</div>
      <div class="sub">exact names · exact types · same input, same action</div>
      <pre class="code"><span class="kw">def</span> <span class="fn">place_order</span>(
    part_no: str,
    qty: int,
    tolerance_mm: float)</pre>
      <div class="acts">
        <span>🗄 database</span><span>🌐 API call</span><span>⚙ machine</span>
      </div>
      <div class="foot">Needs exactly one thing, every time.</div>
    </div>
  </div>

  <div class="q-line st up" :class="{ on: s >= 4 }">
    <template v-if="s < 5">How does a model that only writes <span class="c-llm">text</span> make software <span class="c-tool">do</span> something?</template>
    <template v-else>Make the model write text in a <span class="c-json">shape software can't misread</span>.</template>
  </div>
</template>

<style scoped>
.ask { margin-top: 38px; font-size: 1.6rem; font-weight: 600; color: var(--text); text-align: center; }
.ask .lbl { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-right: 14px; vertical-align: middle; }

.grid { display: grid; grid-template-columns: 1fr 190px 1fr; gap: 18px; margin-top: 30px; align-items: stretch; }
.side { border-radius: 16px; padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; }
.side.llm { background: #1c130b; border: 2px solid var(--llm); }
.side.sw { background: #0c1a10; border: 2px solid var(--tool); }
.kind { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.trait { font-size: 1.9rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1; }
.llm .trait { color: var(--llm); }
.sw .trait { color: var(--tool); }
.sub { font-size: 0.95rem; color: var(--muted); }

.runs { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
.run { background: #2a1a0e; border: 1px solid color-mix(in srgb, var(--llm) 45%, transparent); border-radius: 10px; padding: 8px 12px; font-size: 0.98rem; line-height: 1.35; }
.run .n { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--llm); margin-right: 8px; }

.code { margin: 4px 0 0; background: #07080c; border: 1px solid var(--line); border-radius: 10px; padding: 10px 14px; font-family: 'JetBrains Mono', monospace; font-size: 1rem; line-height: 1.5; }
.kw { color: var(--muted); } .fn { color: var(--tool); }
.acts { display: flex; gap: 8px; flex-wrap: wrap; }
.acts span { font-size: 0.9rem; padding: 4px 10px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--tool) 50%, transparent); color: var(--text); }
.foot { margin-top: auto; font-size: 1rem; font-weight: 600; }

.gap { position: relative; display: grid; place-items: center; }
.chasm, .bridge { grid-area: 1 / 1; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
.q { font-size: 5rem; font-weight: 700; color: var(--bad); line-height: 1; }
.gq { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--muted); }
.plank {
  width: calc(100% + 40px); padding: 14px 0; border-radius: 12px; background: #241a07; border: 2px solid var(--json);
  color: var(--json); font-family: 'JetBrains Mono', monospace; font-size: 2rem; font-weight: 700;
  box-shadow: 0 0 22px color-mix(in srgb, var(--json) 40%, transparent);
}
.bname { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--json); font-weight: 700; }

.q-line { margin-top: 28px; text-align: center; font-size: 1.45rem; font-weight: 600; }
</style>
