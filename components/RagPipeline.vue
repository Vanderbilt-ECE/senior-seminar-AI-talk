<script setup lang="ts">
import { useStep } from '../composables/useStep'
const s = useStep()

// A 2-D cartoon of embedding space: passages with similar meaning sit close.
const clusters = [
  { name: 'concrete cover & durability', cx: 170, cy: 170, c: '#3b82f6' },
  { name: 'steel connections', cx: 420, cy: 120, c: '#7a8194' },
  { name: 'wind loads', cx: 430, cy: 290, c: '#7a8194' },
  { name: 'fire ratings', cx: 170, cy: 290, c: '#7a8194' },
]
const offs = [[-48, -29], [38, -42], [58, 22], [-13, 48], [-70, 29], [19, 3]]
const query = { x: 205, y: 158 }
const nearest = [[189, 173], [208, 128], [228, 192]] // cluster 0 points nearest the query
const passages = [
  { n: 1, src: 'ACI 318-19 · Table 20.5.1.3.1', text: 'Exposed to weather or in contact with ground: No. 6–18 bars → 2 in.; No. 5 and smaller → 1.5 in.' },
  { n: 2, src: 'ACI 318-19 · Table 20.5.1.3.1', text: 'Cast against and permanently in contact with ground → 3 in.' },
  { n: 3, src: 'Project spec 03 30 00 §3.6', text: 'Concrete cover per ACI 318 unless noted on drawings.' },
]
</script>

<template>
  <div class="grid">
    <div>
      <svg viewBox="0 0 560 420" class="w-full">
        <rect x="1" y="1" width="558" height="418" rx="14" fill="#0e1119" stroke="#2a3142" />
        <g v-for="(c, ci) in clusters" :key="c.name" class="st" :class="{ on: s >= 1 }">
          <circle v-for="(o, k) in offs" :key="k" :cx="c.cx + o[0]" :cy="c.cy + o[1]" r="6" :fill="c.c" :opacity="ci === 0 ? 0.9 : 0.55" />
          <text :x="c.cx" :y="ci === 0 ? c.cy - 62 : c.cy + 76" text-anchor="middle" font-size="13" :fill="ci === 0 ? '#93c5fd' : '#7a8194'">{{ c.name }}</text>
        </g>
        <g class="st pop" :class="{ on: s >= 2 }">
          <path :d="`M${query.x} ${query.y - 13} L${query.x + 4} ${query.y - 4} L${query.x + 13} ${query.y - 4} L${query.x + 6} ${query.y + 3} L${query.x + 9} ${query.y + 13} L${query.x} ${query.y + 7} L${query.x - 9} ${query.y + 13} L${query.x - 6} ${query.y + 3} L${query.x - 13} ${query.y - 4} L${query.x - 4} ${query.y - 4} Z`" fill="#22d3ee" />
          <text x="300" y="232" font-size="14" fill="#22d3ee">your question</text>
          <path :d="`M296 228 L ${query.x + 14} ${query.y + 6}`" stroke="#22d3ee" stroke-width="1.5" />
        </g>
        <g class="st" :class="{ on: s >= 3 }">
          <circle :cx="query.x" :cy="query.y" r="50" fill="#22d3ee" fill-opacity="0.06" stroke="#22d3ee" stroke-dasharray="5 5" />
          <g v-for="(p, i) in nearest" :key="i">
            <circle :cx="p[0]" :cy="p[1]" r="10" fill="none" stroke="#e6e8ee" stroke-width="2" />
            <text :x="p[0] + 14" :y="p[1] - 8" font-size="13" font-weight="700" fill="#e6e8ee">{{ i + 1 }}</text>
          </g>
        </g>
        <text x="20" y="400" font-size="12" fill="#4a5163" class="mono">meaning space ("embeddings"), squashed to 2-D</text>
      </svg>
    </div>

    <div class="right">
      <div v-for="p in passages" :key="p.n" class="psg st left" :class="{ on: s >= 4 }">
        <div class="src"><span class="n">{{ p.n }}</span>{{ p.src }}</div>
        <div>{{ p.text }}</div>
      </div>
      <div class="answer st up" :class="{ on: s >= 5 }">
        <div class="tag">answer</div>
        Beam exposed to weather: <b>2 in.</b> for No. 6–18 bars, <b>1.5 in.</b> for No. 5 and smaller <span class="cite">1</span>. The project spec defers to ACI 318 <span class="cite">3</span>.
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 500px 1fr; gap: 30px; margin-top: 14px; }
.right { display: flex; flex-direction: column; gap: 10px; }
.psg { background: #101a33; border: 1px solid color-mix(in srgb, var(--rag) 60%, transparent); border-radius: 10px; padding: 9px 14px; font-size: 0.92rem; line-height: 1.4; }
.src { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #93c5fd; margin-bottom: 3px; display: flex; align-items: center; gap: 8px; }
.n, .cite { display: inline-flex; width: 18px; height: 18px; border-radius: 50%; background: var(--rag); color: white; font-size: 11px; font-weight: 700; align-items: center; justify-content: center; font-family: 'JetBrains Mono', monospace; }
.cite { vertical-align: 2px; }
.answer { margin-top: 6px; background: #2a1a0e; border: 1px solid var(--llm); border-radius: 12px; padding: 12px 16px; font-size: 1.02rem; line-height: 1.5; }
.tag { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--llm); margin-bottom: 4px; }
</style>
