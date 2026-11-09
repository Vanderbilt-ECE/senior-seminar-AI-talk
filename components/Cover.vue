<script setup lang="ts">
// Title slide: the subtitle as a typographic statement, chatbots struck out for agents.
</script>

<template>
  <div class="cv">
    <div class="top">
      <div class="kicker" style="--k: var(--loop)">Agentic AI</div>
      <div class="kicker">Vanderbilt University · Fall 2026</div>
    </div>
    <div class="stmt">
      <div class="line struck">Chatbots</div>
      <div class="line">Agents<span class="dot">.</span></div>
    </div>
    <div class="kicker">By Dr. Jonathan Jaramillo</div>
  </div>
</template>

<style scoped>
.cv { position: absolute; inset: 0; background: var(--bg); padding: 56px 96px; display: flex; flex-direction: column; }
.top { display: flex; justify-content: space-between; }
.stmt { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.line { font-size: 9.5rem; font-weight: 700; letter-spacing: -0.055em; line-height: 0.95; }
.struck { color: var(--dim); position: relative; width: fit-content; }
.struck::after { content: ''; position: absolute; left: -2%; right: -2%; top: 52%; height: 10px; background: var(--llm); border-radius: 5px; transform: rotate(-2deg); }
.dot { color: var(--loop); }
</style>
