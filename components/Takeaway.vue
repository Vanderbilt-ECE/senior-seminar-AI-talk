<script setup lang="ts">
// Section-closing one-liner, tinted with the section's concept color.
defineProps<{ k: string, label?: string }>()
</script>

<template>
  <div class="takeaway" :style="{ '--k': k }">
    <small>{{ label ?? 'Takeaway' }}</small>
    <slot />
  </div>
</template>
