<script setup lang="ts">
import { computed } from 'vue'
import { useStep } from '../composables/useStep'
const s = useStep()

// RC low-pass: fc = 1 / (2πRC). R = 4.7k → 3.39 kHz; R = 16k → 995 Hz.
const C = 10e-9
const R = computed(() => (s.value >= 5 ? 16e3 : 4.7e3))
const fc = computed(() => 1 / (2 * Math.PI * R.value * C))
const xOf = (f: number) => 50 + (Math.log10(f) - 1) * 95
const yOf = (db: number) => 40 + -db * 5
const path = computed(() => {
  const pts: string[] = []
  for (let i = 0; i <= 80; i++) {
    const f = 10 ** (1 + (4 * i) / 80)
    const db = -10 * Math.log10(1 + (f / fc.value) ** 2)
    pts.push(`${i ? 'L' : 'M'}${xOf(f).toFixed(1)} ${yOf(db).toFixed(1)}`)
  }
  return pts.join(' ')
})
const ok = computed(() => s.value >= 5)
const fcLabel = computed(() => (fc.value >= 1000 ? `${(fc.value / 1000).toFixed(2)} kHz` : `${fc.value.toFixed(0)} Hz`))
</script>

<template>
  <DemoFrame
    task="RC low-pass filter with a −3 dB cutoff at 1 kHz, using C = 10 nF."
    :tools="['write_file', 'ngspice', 'read_plot']"
    verify="Hand calculation 1/(2πRC) agrees with the simulation; R is a standard E24 value."
    :verify-on="s >= 6"
  >
    <div class="split">
      <pre class="code st" :class="{ on: s >= 1 }"><span class="cm">* RC low-pass, target fc = 1 kHz</span>
V1 in  0   AC 1
R1 in  out <span :class="{ old: s === 3, new: s >= 4 }">{{ s >= 4 ? '16k' : '4.7k' }}</span>
C1 out 0   10n
.ac dec 50 10 100k
.end</pre>

      <div class="plot st" :class="{ on: s >= 2 }">
        <svg viewBox="0 0 460 300" class="w-full">
          <g stroke="#1f2533">
            <line v-for="d in [10, 100, 1000, 10000, 100000]" :key="d" :x1="xOf(d)" y1="40" :x2="xOf(d)" y2="245" />
            <line v-for="db in [0, -10, -20, -30, -40]" :key="db" x1="50" :y1="yOf(db)" x2="430" :y2="yOf(db)" />
          </g>
          <text v-for="(l, i) in ['10', '100', '1k', '10k', '100k']" :key="l" :x="50 + i * 95" y="264" text-anchor="middle" font-size="11" fill="#7a8194" class="mono">{{ l }}</text>
          <text v-for="db in [0, -20, -40]" :key="'d' + db" x="42" :y="yOf(db) + 4" text-anchor="end" font-size="11" fill="#7a8194" class="mono">{{ db }}</text>
          <text x="240" y="284" text-anchor="middle" font-size="11" fill="#7a8194" class="mono">frequency (Hz) · |H| dB</text>
          <!-- -3 dB line -->
          <line x1="50" :y1="yOf(-3)" x2="430" :y2="yOf(-3)" stroke="#7a8194" stroke-dasharray="3 4" />
          <text x="428" :y="yOf(-3) - 5" text-anchor="end" font-size="10" fill="#7a8194" class="mono">−3 dB</text>
          <!-- target -->
          <g class="st" :class="{ on: s >= 3 }">
            <line :x1="xOf(1000)" y1="30" :x2="xOf(1000)" y2="245" stroke="#facc15" stroke-width="2" stroke-dasharray="6 4" />
            <text :x="xOf(1000) - 6" y="26" text-anchor="end" font-size="12" fill="#facc15" class="mono">target 1 kHz</text>
          </g>
          <!-- response -->
          <path class="curve" :style="{ d: `path('${path}')` }" fill="none" stroke="#22d3ee" stroke-width="3" />
          <circle class="mk" :style="{ cx: `${xOf(fc)}px` }" :cy="yOf(-3)" r="7" :fill="ok ? '#22c55e' : s >= 3 ? '#ef4444' : '#22d3ee'" />
          <text class="mono" :x="xOf(fc) + 10" :y="yOf(-3) + 24" font-size="13" font-weight="700" :fill="ok ? '#22c55e' : s >= 3 ? '#ef4444' : '#e6e8ee'">fc = {{ fcLabel }}</text>
        </svg>
      </div>
    </div>

    <template #trace>
      <TraceStep kind="act" :on="s >= 1">write_file("rc.cir")</TraceStep>
      <TraceStep kind="act" :on="s >= 2">ngspice -b rc.cir</TraceStep>
      <TraceStep kind="obs" :on="s >= 2">bode.csv · −3 dB at 3.39 kHz</TraceStep>
      <TraceStep kind="bad" :on="s >= 3">3.39 kHz ✕ target 1 kHz</TraceStep>
      <TraceStep kind="think" :on="s >= 4">R = 1/(2π·1 kHz·10 nF) = 15.9 kΩ → nearest E24: 16 kΩ</TraceStep>
      <TraceStep kind="act" :on="s >= 4">edit R1: 4.7k → 16k</TraceStep>
      <TraceStep kind="act" :on="s >= 5">ngspice -b rc.cir</TraceStep>
      <TraceStep kind="good" :on="s >= 5">−3 dB at 995 Hz ✓</TraceStep>
      <TraceStep kind="good" :on="s >= 6">hand calc 995 Hz = sim ✓ → done</TraceStep>
    </template>
  </DemoFrame>
</template>

<style scoped>
.split { display: grid; grid-template-columns: 0.85fr 1.25fr; height: 100%; }
.code { margin: 0; padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; line-height: 1.9; border-right: 1px solid var(--line); }
.cm { color: var(--dim); }
.old { background: color-mix(in srgb, var(--bad) 25%, transparent); outline: 1px solid var(--bad); border-radius: 3px; }
.new { background: color-mix(in srgb, var(--tool) 22%, transparent); outline: 1px solid var(--tool); border-radius: 3px; }
.plot { display: flex; align-items: center; padding: 6px; }
.curve { transition: d 1s var(--ease); }
.mk { transition: cx 1s var(--ease), fill 0.4s; }
</style>
