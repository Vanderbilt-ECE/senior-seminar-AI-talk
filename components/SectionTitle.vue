<script setup lang="ts">
// Section divider: one big title in the section's concept color.
defineProps<{ title: string; color?: string }>()
</script>

<template>
  <div class="section-title" :style="{ '--c': color ?? 'var(--text)' }">
    <span class="rule" />
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
.section-title { display: flex; flex-direction: column; align-items: center; gap: 1.4rem; }
.rule { width: 72px; height: 5px; border-radius: 3px; background: var(--c); box-shadow: 0 0 14px var(--c); }
h1 {
  font-size: 5rem !important;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 !important;
  color: var(--c);
}
</style>
