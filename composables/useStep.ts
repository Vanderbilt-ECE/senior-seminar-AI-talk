import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

/** Current click count on this slide, as a number. Components compare it
 *  against their beat (`s >= 3`) to decide what is visible. */
export function useStep() {
  const { $clicks } = useSlideContext()
  return computed(() => $clicks.value)
}
