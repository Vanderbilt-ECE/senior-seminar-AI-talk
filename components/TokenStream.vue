<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { useStep } from '../composables/useStep'
const clicks = useStep()
// Click 1 shows the probabilities; the token steps start on click 2.
const s = computed(() => Math.max(0, clicks.value - 1))

// Next-token prediction as a loop, two clicks per token:
// input → LLM → "?" + probabilities → "?" resolves to the top pick →
// the pick flies back over the model and is appended to the input.
const base = ['The', 'cantilever', 'beam', 'deflects']
const picks = ['downward', 'under', 'its', 'own', 'weight', '.']
const cands: [string, number][][] = [
  [['downward', 0.62], ['under', 0.17], ['by', 0.11], ['slightly', 0.06]],
  [['under', 0.48], ['when', 0.22], ['by', 0.15], ['.', 0.08]],
  [['its', 0.41], ['the', 0.33], ['load', 0.12], ['a', 0.07]],
  [['own', 0.71], ['applied', 0.14], ['weight', 0.06], ['full', 0.04]],
  [['weight', 0.93], ['mass', 0.04], ['load', 0.02], ['self', 0.01]],
  [['.', 0.88], [',', 0.07], ['and', 0.03], ['when', 0.01]],
]
const N = picks.length

let printMode = false
try { printMode = !!useNav().isPrintMode?.value } catch {}

// Two clicks per token: odd click = "?" resolves to the pick,
// even click = the pick flies back and is appended to the input.
const settle = (n: number) => ({
  committed: Math.min(Math.floor(n / 2), N),
  phase: (n % 2 === 1 && n < 2 * N ? 'reveal' : 'idle') as 'idle' | 'reveal' | 'fly',
})
const init = settle(s.value)
// committed = tokens already appended to the input
const committed = ref(init.committed)
const phase = ref<'idle' | 'reveal' | 'fly'>(init.phase)
const fly = ref<{ x: number; y: number; dx: number; dy: number; text: string } | null>(null)

const wrap = ref<HTMLElement>()
const slot = ref<HTMLElement>()
const ghost = ref<HTMLElement>()

let timers: ReturnType<typeof setTimeout>[] = []
const clear = () => { timers.forEach(clearTimeout); timers = []; fly.value = null }
onBeforeUnmount(clear)

watch(s, (n, o) => {
  clear()
  const end = settle(n)
  // Reveals, jumps, going backwards, and PDF export snap straight to the state.
  if (printMode || n !== o + 1 || n % 2 === 1 || n > 2 * N) {
    committed.value = end.committed; phase.value = end.phase; return
  }

  // forward onto an even click: fly the revealed word into the input
  const target = end.committed
  committed.value = target - 1
  phase.value = 'fly'
  timers.push(setTimeout(async () => {
    await nextTick()
    const w = wrap.value, a = slot.value, b = ghost.value
    if (w && a && b) {
      const wr = w.getBoundingClientRect()
      const k = wr.width / w.offsetWidth || 1 // undo Slidev's slide scaling
      const ar = a.getBoundingClientRect(), br = b.getBoundingClientRect()
      const x = (ar.left - wr.left) / k, y = (ar.top - wr.top) / k
      fly.value = { x, y, dx: (br.left - wr.left) / k - x, dy: (br.top - wr.top) / k - y, text: picks[target - 1] }
    }
    timers.push(setTimeout(() => { committed.value = target; phase.value = 'idle'; fly.value = null }, 750))
  }, 0))
})

const done = computed(() => committed.value >= N && phase.value === 'idle')
const bars = computed(() => cands[Math.min(committed.value, N - 1)])
</script>

<template>
  <div ref="wrap" class="wrap">
    <!-- loop arrow: output back over the model into the input -->
    <svg class="loop st" :class="{ on: s >= 2 }" viewBox="0 0 1080 110" width="1080" height="110">
      <path d="M 778 104 C 778 18, 220 18, 220 98" fill="none" stroke="#f97316" stroke-width="2.5" class="flow" />
      <path d="M 212 92 L 220 106 L 228 92 Z" fill="#f97316" />
      <text x="500" y="28" text-anchor="middle" class="mono" font-size="15" fill="#f97316">append it → run the model again</text>
    </svg>

    <div class="row">
      <!-- input: everything so far -->
      <div class="col">
        <div class="cap">input: all text so far</div>
        <div class="input">
          <span v-for="(t, i) in base" :key="'b' + i" class="tok">{{ t }}</span>
          <span
            v-for="(t, i) in picks.slice(0, committed)" :key="'p' + i"
            class="tok new" :class="{ latest: i === committed - 1 && phase === 'idle' }"
          >{{ t }}</span>
          <span v-if="phase === 'fly'" ref="ghost" class="tok ghost">{{ picks[committed] }}</span>
        </div>
      </div>

      <div class="arrow">→</div>

      <!-- the model -->
      <div class="col">
        <div class="cap">&nbsp;</div>
        <div class="box">
          <span v-for="i in 16" :key="i" class="dot pulse" :style="{ animationDelay: `${(i * 0.3) % 2.4}s` }" />
        </div>
        <div class="lbl">LLM</div>
      </div>

      <div class="arrow">→</div>

      <!-- output: next token + probabilities -->
      <div class="col out">
        <div class="cap">next token</div>
        <div class="slot-row">
          <span v-if="phase === 'reveal'" ref="slot" :key="'r' + committed" class="tok chosen">{{ picks[committed] }}</span>
          <span v-else-if="phase === 'fly'" ref="slot" class="tok empty">{{ picks[committed] }}</span>
          <span v-else-if="!done" class="tok cursor blink">?</span>
          <span v-else class="tok empty">·</span>
        </div>
        <div class="bars" :class="{ faded: done || clicks < 1 }">
          <div class="bars-title">probabilities</div>
          <div
            v-for="([w, p], i) in bars" :key="committed + '-' + i"
            class="bar-row" :class="{ top: i === 0, picked: i === 0 && phase !== 'idle' }"
          >
            <span class="word">{{ w }}</span>
            <span class="track"><span class="fill" :style="{ width: `${p * 100}%` }" /></span>
            <span class="pct">{{ Math.round(p * 100) }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- the token in flight -->
    <div
      v-if="fly" class="flyer"
      :style="{ left: fly.x + 'px', top: fly.y + 'px', '--dx': fly.dx + 'px', '--dy': fly.dy + 'px' }"
    >
      <span class="tok chosen">{{ fly.text }}</span>
    </div>

    <div class="final st up" :class="{ on: done }">
      No plan for the sentence. Just <b class="c-llm">one likely next token</b>, six times.
    </div>
  </div>
</template>

<style scoped>
.wrap { position: relative; width: 1080px; height: 580px; margin: 0 auto; }
.loop { display: block; overflow: visible; }

.row { display: grid; grid-template-columns: 440px 60px 190px 60px 330px; align-items: start; margin-top: -4px; }
.col { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.cap { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--muted); letter-spacing: 0.06em; height: 18px; }
.arrow { font-size: 2rem; color: var(--muted); text-align: center; margin-top: 108px; }

.input {
  width: 100%; height: 190px; padding: 14px; border-radius: 14px;
  background: var(--panel); border: 1px solid var(--line);
  display: flex; flex-wrap: wrap; align-content: flex-start; gap: 8px;
}
.tok {
  font-size: 1.3rem; font-weight: 600; padding: 5px 11px; border-radius: 8px; line-height: 1.3;
  background: var(--panel-2); border: 1px solid var(--line); white-space: nowrap;
}
.tok.new { border-color: color-mix(in srgb, var(--llm) 50%, var(--line)); }
.tok.latest { background: color-mix(in srgb, var(--llm) 25%, var(--panel)); border-color: var(--llm); animation: land 0.4s var(--ease); }
@keyframes land { from { transform: scale(1.12); } to { transform: none; } }
.tok.ghost { visibility: hidden; }

.box {
  width: 190px; height: 190px; border-radius: 22px; background: #24160b; border: 3px solid var(--llm);
  display: grid; grid-template-columns: repeat(4, 1fr); place-items: center; padding: 20px;
}
.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--llm); }
.lbl { font-weight: 700; color: var(--llm); font-size: 1.1rem; }

.out { align-items: stretch; }
.slot-row { height: 190px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
.tok.cursor { color: var(--llm); border-style: dashed; border-color: var(--llm); background: transparent; padding: 5px 22px; }
.tok.chosen { background: color-mix(in srgb, var(--llm) 25%, var(--panel)); border-color: var(--llm); color: var(--text); box-shadow: 0 0 16px color-mix(in srgb, var(--llm) 45%, transparent); }
.slot-row .tok.chosen { animation: reveal 0.45s var(--ease); }
@keyframes reveal { from { transform: rotateX(90deg); opacity: 0; } to { transform: none; opacity: 1; } }
.tok.empty { color: transparent; border-style: dashed; background: transparent; }

.bars { position: absolute; left: 199px; width: 820px; top: 402px; transition: opacity 0.5s; }
.bars.faded { opacity: 0; }
.bars-title { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--muted); letter-spacing: 0.06em; margin-bottom: 10px; }
.bar-row { display: grid; grid-template-columns: 120px 1fr 60px; align-items: center; gap: 16px; margin: 7px 0; animation: fadein 0.5s var(--ease); }
@keyframes fadein { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: none; } }
.word { font-family: 'JetBrains Mono', monospace; font-size: 1.3rem; text-align: right; }
.track { height: 30px; background: var(--panel); border-radius: 5px; overflow: hidden; }
.fill { display: block; height: 100%; background: color-mix(in srgb, var(--llm) 45%, transparent); border-radius: 5px; }
.bar-row.top .fill { background: var(--llm); }
.bar-row.top .word { color: var(--llm); font-weight: 700; }
.bar-row.picked .fill { box-shadow: 0 0 14px color-mix(in srgb, var(--llm) 70%, transparent); }
.pct { font-family: 'JetBrains Mono', monospace; color: var(--muted); font-size: 1.1rem; }

/* flight: linear in x, arcing up over the model in y */
.flyer { position: absolute; z-index: 5; animation: fx 0.7s cubic-bezier(0.45, 0, 0.55, 1) forwards; }
.flyer .tok { display: inline-block; font-size: 1.3rem; animation: fy 0.7s cubic-bezier(0.45, 0, 0.55, 1) forwards; }
@keyframes fx { to { transform: translateX(var(--dx)); } }
@keyframes fy {
  0% { transform: translateY(0); }
  45% { transform: translateY(calc(min(0px, var(--dy)) - 150px)); }
  100% { transform: translateY(var(--dy)); }
}

.final { position: absolute; left: 0; width: 1080px; top: 480px; margin: 0; font-size: 1.6rem; font-weight: 600; text-align: center; }
</style>
