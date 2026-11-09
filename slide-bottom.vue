<script setup lang="ts">
import { useSlideContext } from '@slidev/client'

// Slide number in the lower-right corner (hidden on the cover).
const { $page, $nav } = useSlideContext()
</script>

<template>
  <div v-if="$page > 1" class="page-num">{{ $page }} / {{ $nav.total }}</div>
</template>

<style scoped>
.page-num {
  position: absolute;
  bottom: 14px;
  right: 1.4rem;
  z-index: 10;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--muted);
}
</style>
