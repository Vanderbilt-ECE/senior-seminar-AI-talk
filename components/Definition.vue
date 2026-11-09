<script setup lang="ts">
// Section-closing definition: one sentence, with the term in the section's color.
defineProps<{ term: string; c: string }>()
</script>

<template>
  <div class="def" :style="{ '--c': c }">
    <div class="kicker" :style="{ '--k': c }">In one sentence</div>
    <p class="sentence"><span class="term">{{ term }}</span> <slot /></p>
  </div>
</template>

<style scoped>
.def { text-align: left; max-width: 1040px; border-left: 6px solid var(--c); padding: 8px 0 8px 40px; }
.sentence { margin: 14px 0 0; font-size: 3rem; font-weight: 700; line-height: 1.22; letter-spacing: -0.02em; color: var(--text); }
.term { color: var(--c); text-decoration: underline; text-decoration-color: var(--c); text-decoration-thickness: 5px; text-underline-offset: 10px; }
</style>
