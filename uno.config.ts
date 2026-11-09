import { defineConfig } from 'unocss'

// Slidev enables UnoCSS attributify mode, which turns SVG presentation
// attributes like font-size="10" or opacity="0.7" into utility CSS
// (font-size: 2.5rem, opacity: 0.007, …). Block those for SVG attributes.
const svgAttrs = [
  'font-size', 'font-weight', 'font-family', 'letter-spacing', 'text-anchor',
  'opacity', 'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity',
  'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin',
  'x', 'y', 'width', 'height', 'r', 'rx', 'ry', 'transform', 'filter',
]

export default defineConfig({
  blocklist: [
    new RegExp(`^\\[(${svgAttrs.join('|')})~=`),
  ],
})
