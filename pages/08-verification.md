---
layout: center
stage: 8
---

<SectionTitle title="Verification" color="var(--text)" />

---
stage: 8
clicks: 4
---

# Small errors compound over many steps

<div class="mt-10">
<ErrorCompounding />
</div>

<!--
Now the part I most want engineers to take seriously: how this goes wrong.

Suppose each step of an agent's work is 95% reliable. That sounds great. One step: 95%.

[click] Five steps in a row: 77%.

[click] Ten steps: 60%.

[click] Twenty steps, a modest agent task: about one in three chance the whole thing is right. That's just 0.95 to the 20th. Same compounding math as reliability in series, which you've all seen.

[click] Now add a check after every step: a test, a measurement, a simulation. When a check catches an error, the agent retries. If the checks catch most errors, the per-step error drops from 5% to about a quarter of a percent, and twenty steps lands around 95%. Same model, same task. Checking turns a coin flip into something you can use.
-->

---
stage: 8
clicks: 4
---

# Stack independent checks

<SwissCheese />

<!--
So how do we verify? Engineers already know the model for this: Swiss cheese. Every layer of defense has holes. You stack layers whose holes don't line up.

Here are five hidden errors coming out of an agent.

[click] Layer one: automated checks, meaning tests, simulations, and assertions. They catch most of them, cheaply, every time. But two errors slip through holes.

[click] Layer two: an independent check. A second method, a hand calculation, or a separate reviewer agent with fresh context. It catches the next one.

[click] Layer three: a human, for the decisions that matter. Domain judgment catches what the other layers can't.

[click] No single check is perfect. Stack independent ones. The cheap automated layers are what let the human layer focus on what only a human can judge.
-->

---
stage: 8
clicks: 2
---

# Give the agent eyes

<GiveEyes />

<!--
Let's zoom in on that first layer, because it's where you get the most leverage.

Remember the loop: think, act, observe. Without good observation tools, "observe" just means rereading its own code and saying "looks right to me." It's guessing.

[click] So you plug in sensors: a test runner, browser screenshots, a simulator, a renderer for CAD and plots, a linter. Each one turns "I think it works" into "I checked, and here's the result."

[click] Here's the principle: an agent can only fix what it can observe. A big part of your job when you set up an agent is giving it ways to see its own work.
-->

---
stage: 8
clicks: 4
---

# Ways to let an agent check its own work

<VerifyTechniques />

<!--
Here's a toolkit. Pick whatever fits your domain.

[click] For software: browser automation with a tool like Playwright, so the agent can open the page, click things, take screenshots, and read the console. Unit and integration tests, which give pass/fail output the agent can read. Type checkers and linters, which catch whole classes of bugs before anything runs.

[click] For engineering: simulators as ground truth. SPICE, FEA, and CFD don't hallucinate. Render-and-look: have the agent render the CAD part or the plot and look at the image. And sanity assertions: units, physical ranges, conservation of mass and energy. Cheap, and they catch a surprising amount.

[click] Meta-techniques: a second agent as a reviewer, with fresh context, critiquing the work rather than re-reading its own reasoning. Golden cases: problems with known answers that it must reproduce before you trust it on new ones. And logs: pipe errors and tracebacks back in instead of hiding them.

[click] And the most practical tip: put verification in the instructions. "After every change, run the tests and screenshot the page. Show me the evidence." Agents follow that kind of instruction very reliably.
-->

---
stage: 8
clicks: 3
---

# Where you fit: the outer loop

<InnerOuterLoop />

<!--
So where does the human fit, if the agent is checking itself?

[click] The agent runs the inner loop. Does the code run, do the tests pass, does the dimension match, does the page render? Those are mechanical checks, and the agent should do them all, every time.

[click] You run the outer loop, and you check what it can't: Is this the right problem? Are the requirements right? Is it safe? Who signs the drawing? Those are judgment calls, and for high-stakes work they stay with a human, often a licensed one.

[click] And the habit that connects the two: ask for evidence, not claims. "Tests pass" means show me the output. "Looks right" means show me the screenshot.
-->

---
stage: 8
clicks: 3
---

# Scale autonomy with the stakes

<RiskQuadrant />

<Takeaway v-click="3" k="var(--tool)" label="Takeaway">Trust, but verify, and scale autonomy with the stakes.</Takeaway>

<!--
So how much should you let it run on its own? Two questions: how bad is it if it's wrong, and how easy is it to verify?

[click] Low stakes and easy to verify: let it run. High stakes but easy to verify: let it run, but gate the result on checks and review. Low stakes and hard to verify: spot-check. High stakes and hard to verify: the human decides and the agent assists.

[click] Some examples: restyling a plot, let it go. A unit converter with tests, same. A literature summary is low stakes but hard to verify fully, so spot-check the citations. A change to production code is high stakes but CI and review can gate it. Structural sign-off and medical-device firmware: the human decides.

[click] The takeaway: trust, but verify, and scale autonomy with the stakes.
-->

---
layout: center
stage: 8
---

<Definition term="Verification" c="var(--human)">means checking an agent's work with independent tests, tools, and people before you trust it.</Definition>

<!--
Before we move on, here's the whole section in one sentence: Verification means checking an agent's work with independent tests, tools, and people before you trust it.
-->
