<script setup lang="ts">
// Shared layout for every demo: Task / Tools / Verify strip on top,
// the "screen" (mock or recording) on the left, the loop trace on the right.
//
// To swap in a real recording: put the file in public/ and pass `video="/demo-cad.mp4"`.
defineProps<{ task: string; tools: string[]; verify?: string; verifyOn?: boolean; video?: string }>()
</script>

<template>
  <div class="demo">
    <div class="strip">
      <div class="cell">
        <div class="lbl">Task</div>
        <div class="txt">{{ task }}</div>
      </div>
      <div class="cell">
        <div class="lbl c-tool">Tools</div>
        <div class="chips"><span v-for="t in tools" :key="t" class="chip mono">{{ t }}</span></div>
      </div>
      <div class="cell verify" :class="{ on: verifyOn }">
        <div class="lbl">Verify</div>
        <div class="txt">{{ verify }}</div>
      </div>
    </div>
    <div class="body">
      <div class="screen">
        <video v-if="video" :src="video" controls muted class="vid" />
        <slot v-else />
      </div>
      <div class="trace">
        <div class="lbl c-loop">Loop</div>
        <slot name="trace" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo { margin-top: 8px; display: flex; flex-direction: column; gap: 12px; }
.strip { display: grid; grid-template-columns: 1.4fr 1.1fr 1.2fr; gap: 12px; }
.cell { background: var(--panel); border: 1px solid var(--line); border-radius: 10px; padding: 8px 12px; }
.lbl { font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
.txt { font-size: 0.9rem; line-height: 1.35; }
.chips { display: flex; flex-wrap: wrap; gap: 5px; }
.chip { font-size: 0.72rem; color: var(--tool); border: 1px solid color-mix(in srgb, var(--tool) 45%, transparent); border-radius: 5px; padding: 1px 6px; }
.verify { opacity: 0.25; transition: all 0.6s; }
.verify.on { opacity: 1; border-color: var(--human); }
.body { display: grid; grid-template-columns: 1.65fr 1fr; gap: 12px; }
.screen { background: #07080c; border: 1px solid var(--line); border-radius: 12px; height: 412px; overflow: hidden; position: relative; }
.vid { width: 100%; height: 100%; object-fit: contain; }
.trace { background: var(--panel); border: 1px solid color-mix(in srgb, var(--loop) 35%, var(--line)); border-radius: 12px; padding: 10px 12px; height: 412px; display: flex; flex-direction: column; gap: 6px; overflow: hidden; }
</style>
