import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'
import { onSlideEnter } from '@slidev/client'
import { useStep } from './useStep'

export interface Box { l: number; r: number; t: number; b: number; cx: number; cy: number }

/** Measure elements relative to `wrap`, in unscaled slide pixels, and call
 *  `draw` with the measurements. Used to draw arrows between HTML/SVG elements
 *  that live in different parts of a slide.
 *
 *  Slidev mounts upcoming slides while they are still hidden, where every
 *  element measures as 0×0 at the origin. So we never draw from a hidden slide,
 *  and we re-measure whenever the slide becomes visible or changes size, when
 *  it is entered, after every click, and once the .st reveal transitions
 *  (0.7 s) have settled. */
export function useLinks(wrap: Ref<HTMLElement | undefined>, draw: (box: (el?: Element | null) => Box | null) => void) {
  const box = (el?: Element | null): Box | null => {
    const w = wrap.value
    if (!w || !el) return null
    const wr = w.getBoundingClientRect()
    const k = wr.width / w.offsetWidth || 1 // undo Slidev's slide scaling
    const r = el.getBoundingClientRect()
    const l = (r.left - wr.left) / k, t = (r.top - wr.top) / k
    const rr = (r.right - wr.left) / k, b = (r.bottom - wr.top) / k
    return { l, r: rr, t, b, cx: (l + rr) / 2, cy: (t + b) / 2 }
  }

  const visible = () => {
    const w = wrap.value
    return !!w && w.offsetWidth > 0 && w.offsetHeight > 0 && w.getClientRects().length > 0
  }
  const run = () => { if (visible()) draw(box) }

  let timers: ReturnType<typeof setTimeout>[] = []
  let frame = 0
  const schedule = () => {
    timers.forEach(clearTimeout)
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(run)
    timers = [setTimeout(run, 150), setTimeout(run, 450), setTimeout(run, 900)]
  }

  let ro: ResizeObserver | undefined
  onMounted(() => {
    schedule()
    if (wrap.value && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(run) })
      ro.observe(wrap.value)
    }
    document.fonts?.ready.then(run)
  })
  onSlideEnter(schedule)
  watch(useStep(), schedule) // layout can shift on a click
  onBeforeUnmount(() => { timers.forEach(clearTimeout); cancelAnimationFrame(frame); ro?.disconnect() })
  return run
}

/** Horizontal S-curve from (x1,y1) to (x2,y2). */
export const sCurve = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`
}
