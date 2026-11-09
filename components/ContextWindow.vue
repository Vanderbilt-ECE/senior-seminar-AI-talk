<script setup lang="ts">
import { computed } from 'vue'
import { useStep } from '../composables/useStep'

// A fixed-size context window. Items appear on their click (`at`); when the
// total exceeds `capacity`, the oldest unpinned items are evicted.
interface CtxItem { kind: 'system' | 'user' | 'asst' | 'tool' | 'result' | 'doc' | 'goal' | 'file'; label: string; tokens: number; at?: number; pinned?: boolean }
const props = withDefaults(defineProps<{ items: CtxItem[]; capacity: number; height?: number; unit?: string; title?: string }>(), {
  height: 430, unit: 'K tokens', title: 'Context window',
})
const s = useStep()

const colors: Record<string, string> = {
  system: '#e6e8ee', user: '#22d3ee', asst: '#f97316', tool: '#22c55e', result: '#22c55e', doc: '#3b82f6', goal: '#facc15', file: '#3b82f6',
}

const state = computed(() => {
  const visible = props.items.map((it, i) => ({ ...it, i, shown: s.value >= (it.at ?? i + 1), evicted: false }))
  let used = visible.filter(v => v.shown).reduce((a, v) => a + v.tokens, 0)
  for (const v of visible) {
    if (used <= props.capacity) break
    if (v.shown && !v.pinned) { v.evicted = true; used -= v.tokens }
  }
  const demand = visible.filter(v => v.shown).reduce((a, v) => a + v.tokens, 0)
  return { visible, used, overflow: demand > props.capacity }
})
const px = (t: number) => Math.max(26, (t / props.capacity) * (props.height - 20))
</script>

<template>
  <div class="cw">
    <div class="title">{{ title }}</div>
    <div class="frame" :style="{ height: `${height}px` }" :class="{ full: state.overflow }">
      <TransitionGroup name="blk">
        <div
          v-for="v in state.visible.filter(v => v.shown)"
          :key="v.i"
          class="blk"
          :class="[v.kind, { evicted: v.evicted, pinned: v.pinned }]"
          :style="{ height: v.evicted ? '22px' : `${px(v.tokens)}px`, '--c': colors[v.kind] }"
        >
          <span class="lbl">{{ v.pinned ? '📌 ' : '' }}{{ v.label }}</span>
          <span class="tk">{{ v.evicted ? 'dropped' : `${v.tokens}${unit.startsWith('K') ? 'K' : ''}` }}</span>
        </div>
      </TransitionGroup>
    </div>
    <div class="gauge">
      <div class="gfill" :style="{ width: `${Math.min(100, (state.used / capacity) * 100)}%` }" :class="{ hot: state.used / capacity > 0.8 }" />
    </div>
    <div class="gtxt mono">{{ Math.round(state.used * 10) / 10 }} / {{ capacity }} {{ unit }}</div>
  </div>
</template>

<style scoped>
.cw { width: 100%; }
.title { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ctx); margin-bottom: 6px; }
.frame {
  border: 2px solid var(--ctx); border-radius: 12px; padding: 8px; display: flex; flex-direction: column; gap: 4px;
  background: color-mix(in srgb, var(--ctx) 4%, transparent); overflow: hidden; transition: border-color 0.4s, box-shadow 0.4s;
}
.frame.full { border-color: var(--bad); box-shadow: 0 0 22px color-mix(in srgb, var(--bad) 35%, transparent); }
.blk {
  flex-shrink: 0; border-radius: 6px; padding: 3px 10px; display: flex; justify-content: space-between; align-items: center;
  background: color-mix(in srgb, var(--c) 18%, var(--panel)); border-left: 4px solid var(--c);
  font-size: 0.82rem; transition: height 0.6s var(--ease), opacity 0.6s, background 0.6s; overflow: hidden;
}
.blk .tk { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--muted); }
.blk.evicted { opacity: 0.45; background: color-mix(in srgb, var(--bad) 15%, transparent); border-left-color: var(--bad); text-decoration: line-through; }
.blk.evicted .tk { color: var(--bad); text-decoration: none; }
.blk.pinned { border: 1px dashed var(--c); border-left-width: 4px; border-left-style: solid; }
.gauge { height: 8px; border-radius: 4px; background: var(--panel); margin-top: 8px; overflow: hidden; }
.gfill { height: 100%; background: var(--ctx); transition: width 0.6s var(--ease), background 0.4s; }
.gfill.hot { background: var(--bad); }
.gtxt { font-size: 0.72rem; color: var(--muted); margin-top: 4px; text-align: right; }
.blk-enter-active { transition: all 0.6s var(--ease); }
.blk-enter-from { opacity: 0; transform: translateY(20px); }
</style>
