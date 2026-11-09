---
clicks: 10
---

# Same request. Two very different systems.

<HookBeforeAfter />

<!--
Here's the same request given to two systems.

[click] On the left is a chatbot. We ask it: "Our CI test for the unit converter is failing. Fix it."

[click] It gives you a plausible snippet and wishes you luck.

[click] You still copy it, paste it, run it, and find out whether it worked.

[click] On the right is an agent, given the exact same request.

[click] First it reads the actual file.

[click] It runs the test suite and sees a real failure: the PSI-to-kPa test.

[click] It reasons about why. The conversion factor was truncated to 6.89, but the test expects 6.894757.

[click] It makes a one-line edit.

[click] And then, the important part, it re-runs the tests to check its own work. 42 passed.

[click] Then it reports back. Same underlying model in both cases. The difference is everything we wrap around it, and that's what this talk is about.

(DEMO OPTION: if you have a screen recording of a real agent doing this, play it here instead, or right after this slide.)
-->

---
layout: center
clicks: 2
---

<div class="promise">
  <div class="kicker" style="--k: var(--loop)">Goal for the next 50 minutes</div>
  <div class="big">Understand what makes AI <span class="c-tool">agentic</span><span v-click="1"> and when to <span class="c-loop">trust</span> it.</span></div>
  <div v-click="2" class="mt-12">
    <ConceptStack mode="preview" />
  </div>
</div>

<style>
.promise { text-align: left; max-width: 1000px; }
.promise .big { font-size: 2.6rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
</style>

<!--
My goal: by the end of this hour you understand what actually makes AI agentic. Not the hype, the ingredients.

[click] And, maybe more important for engineers, when to trust it. So you can point one at a hard problem and know whether to believe what comes back.

[click] We'll build up a stack, one layer at a time. Each layer is a small, simple idea: a text predictor, a loop, a format, a tool, a standard plug for tools, a search, and a loop again. Then we finish with how to check its work. None of them is magic on its own. Stacked together they give you something that can do real work. Keep an eye on the bar in the top-right corner. It tracks where we are in the stack.
-->
