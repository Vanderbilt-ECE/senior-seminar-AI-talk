---
layout: center
stage: 7
---

<SectionTitle title="Working Well" color="var(--text)" />

---
stage: 7
clicks: 6
---

# Context engineering > prompt engineering

<ContextEngineering />

<!--
So how do you get good results? You've probably heard of "prompt engineering," hunting for magic words. Mostly, forget that. What matters is context engineering: what you put in the window.

On the left, a typical first attempt: "make the bracket better." Better how? Lighter, cheaper, stronger? The agent has to guess, and it will guess confidently.

On the right, we fill the window deliberately.

[click] The goal: cut mass by at least 20%. Measurable.

[click] Constraints: material, safety factor, manufacturing process, and what can't change.

[click] An example of what good looked like last time.

[click] The relevant files, so it isn't working from imagination.

[click] And how to check: run the FEA script, and the max stress must stay under 138 MPa, which is 6061-T6 yield over a safety factor of 2. Now the agent knows what "done" means and can test for it.

[click] Clear goals, constraints, examples, and files beat clever wording, every time. It's the same thing you'd give a new co-op student on day one.
-->

---
stage: 7
clicks: 6
---

# Start small and checkable, then climb

<Staircase />

<!--
Second habit: don't start by handing it your whole senior design project.

[click] Start with something you can check at a glance, like explaining or documenting a function. You read it and you know whether it's right.

[click] Then one function plus its unit test. The test tells you whether it worked.

[click] Then fix a failing test suite. CI tells you.

[click] Then a feature across several files, with tests plus your review.

[click] Only then a multi-day project, with milestones where you check in.

Notice that every step pairs a task with a way to check it. You scale up autonomy as trust is earned, the same way you would with a new teammate.

[click] And the bigger the step, the more the agent needs ways to check its own work. That's where we're going next.
-->
