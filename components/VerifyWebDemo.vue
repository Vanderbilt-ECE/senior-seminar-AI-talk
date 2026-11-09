<script setup lang="ts">
import { computed } from 'vue'
import { useStep } from '../composables/useStep'
const s = useStep()

// Browser mock of the dashboard the agent is building. Layout bugs are
// visible until step 4; the export bug shows at step 5 and is fixed at 6.
const layoutFixed = computed(() => s.value >= 4)
const exportFailed = computed(() => s.value === 5 || s.value === 6)
const done = computed(() => s.value >= 7)
const pts = [8, 30, 22, 48, 44, 70, 64, 92, 88, 120, 112, 140, 150, 152, 182, 160, 210, 158, 240, 150, 268, 146, 300, 147]
// lift coefficient vs angle of attack: rises, then stalls
const curve = (dy: number) => pts.reduce((a, v, i) => a + (i % 2 ? `${140 - v * 0.82 + dy} ` : `${i ? 'L' : 'M'}${30 + v * 1.4},`), '')
</script>

<template>
  <DemoFrame
    task="Dashboard for wind-tunnel run 14: lift-vs-AoA chart, and a working 'Export CSV' button."
    :tools="['write_file', 'playwright: goto', 'screenshot', 'click', 'console']"
    verify="The agent sees what a user would see, and it shows you the screenshots and the downloaded file as evidence."
    :verify-on="s >= 7"
  >
    <div class="browser st" :class="{ on: s >= 2 }">
      <div class="bar"><span class="dots">● ● ●</span><span class="url mono">localhost:5173</span><span v-if="s >= 2" class="shot mono">📸 screenshot {{ s >= 7 ? 3 : s >= 5 ? 2 : 1 }}</span></div>
      <div class="page" :class="{ ok: layoutFixed }">
        <div class="hdr">
          <div class="title">Wind Tunnel · Run 14</div>
          <button class="btn" :class="{ clicked: s >= 5 }">↓ Export CSV</button>
        </div>
        <div class="legend">● C<sub>L</sub> measured ● C<sub>L</sub> CFD</div>
        <svg viewBox="0 0 480 160" class="chart">
          <line x1="30" y1="140" x2="470" y2="140" stroke="#334155" />
          <line x1="30" y1="10" x2="30" y2="140" stroke="#334155" />
          <path :d="curve(0)" fill="none" stroke="#3b82f6" stroke-width="2.5" />
          <path :d="curve(7)" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 4" />
          <text x="250" y="156" font-size="10" fill="#64748b" text-anchor="middle">angle of attack (°)</text>
        </svg>

        <!-- annotations the agent "sees" -->
        <div class="ann a1 st pop" :class="{ on: s === 3 }"><span>legend overlaps title</span></div>
        <div class="ann a2 st pop" :class="{ on: s === 3 }"><span>button clipped at 1280 px</span></div>
        <div class="console st up" :class="{ on: exportFailed }">✕ TypeError: Cannot read properties of undefined (reading 'map') at exportCsv (app.js:42) · no download</div>
        <div class="download st up" :class="{ on: done }">✓ wind_tunnel_run14.csv · 2.1 KB · 31 rows</div>
      </div>
    </div>
    <div v-if="s < 2" class="empty mono st" :class="{ on: s >= 1 }">writing index.html, styles.css, app.js…</div>

    <template #trace>
      <TraceStep kind="act" :on="s >= 1">write_file(index.html, styles.css, app.js)</TraceStep>
      <TraceStep kind="act" :on="s >= 2">playwright: goto localhost:5173 → screenshot</TraceStep>
      <TraceStep kind="bad" :on="s >= 3">sees: legend overlaps title; button clipped</TraceStep>
      <TraceStep kind="act" :on="s >= 4">edit styles.css: legend below title, header flex-wrap</TraceStep>
      <TraceStep kind="act" :on="s >= 5">playwright: click "Export CSV" · read console</TraceStep>
      <TraceStep kind="bad" :on="s >= 5">TypeError at app.js:42 · no download</TraceStep>
      <TraceStep kind="think" :on="s >= 6">Export runs before data loads. Await the fetch.</TraceStep>
      <TraceStep kind="act" :on="s >= 6">edit app.js:38–44</TraceStep>
      <TraceStep kind="good" :on="s >= 7">screenshot clean ✓ · download 31 rows ✓</TraceStep>
    </template>
  </DemoFrame>
</template>

<style scoped>
.browser { height: 100%; display: flex; flex-direction: column; }
.bar { display: flex; align-items: center; gap: 12px; padding: 7px 12px; background: #1a1f2e; border-bottom: 1px solid var(--line); font-size: 0.75rem; }
.dots { color: #4a5163; letter-spacing: 2px; font-size: 0.6rem; }
.url { background: #0b0d12; border-radius: 5px; padding: 2px 10px; color: var(--muted); }
.shot { margin-left: auto; color: var(--ctx); }
.page { position: relative; flex: 1; background: #f8fafc; color: #0f172a; padding: 16px 20px; overflow: hidden; }
.hdr { display: flex; align-items: center; justify-content: space-between; width: 118%; }
.title { font-size: 1.35rem; font-weight: 800; }
.btn { background: #2563eb; color: white; border: none; border-radius: 6px; padding: 7px 14px; font-weight: 600; font-size: 0.85rem; }
.btn.clicked { outline: 3px solid #facc15; }
.legend { position: absolute; top: 22px; left: 120px; font-size: 0.8rem; background: #e2e8f0; padding: 3px 10px; border-radius: 4px; color: #1e3a8a; transition: all 0.6s; }
.page.ok .hdr { width: 100%; flex-wrap: wrap; }
.page.ok .legend { position: static; display: inline-block; margin-top: 8px; }
.chart { width: 100%; margin-top: 18px; }
.ann { position: absolute; border: 3px solid #ef4444; font-weight: 700; font-size: 0.75rem; background: rgba(239, 68, 68, 0.08); border-radius: 6px; }
.ann span { position: absolute; top: 100%; left: -3px; margin-top: 4px; background: #ef4444; color: white; padding: 1px 7px; border-radius: 4px; white-space: nowrap; }
.a1 { top: 12px; left: 12px; width: 340px; height: 40px; }
.a2 { top: 10px; right: 0; width: 60px; height: 44px; }
.a2 span { left: auto; right: 0; }
.console { position: absolute; left: 0; right: 0; bottom: 0; background: #1d1012; color: #fca5a5; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; padding: 8px 12px; border-top: 2px solid var(--bad); }
.download { position: absolute; left: 0; right: 0; bottom: 0; background: #0b1d12; color: #86efac; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; padding: 8px 12px; border-top: 2px solid var(--tool); }
.empty { position: absolute; inset: 0; display: grid; place-items: center; color: var(--muted); font-size: 0.85rem; }
</style>
