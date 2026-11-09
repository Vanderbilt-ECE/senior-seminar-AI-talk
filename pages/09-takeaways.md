---
layout: center
stage: 9
---

<SectionTitle title="Takeaways" color="var(--text)" />

---
stage: 9
clicks: 8
---

# The whole stack

<ConceptStack mode="full" />

<!--
Let's put the whole stack back together.

[click] At the bottom, the LLM: it predicts the next token, its weights are frozen, and it's isolated.

[click] Wrap a loop and a message list around it and you have a chatbot. The whole history is resent every turn, and the context window is the constraint.

[click] Ask for structured output and programs can read what it writes.

[click] Give that output a name and arguments and you have a tool call. Your code does the work.

[click] MCP makes the tools portable, so you write a tool once and every assistant can use it.

[click] Make one of those tools a search and you have retrieval: fresh, domain-specific knowledge without retraining.

[click] Let the model keep choosing its next action until it's done, and you have an agent.

[click] And wrapped around everything: verification. Tests, simulations, checks, and humans. That's what turns a clever demo into something you can trust with real engineering work.
-->

---
stage: 9
clicks: 4
---

# What we didn't cover

<NotCovered />

<!--
Before I let you go: an honest map of everything I skipped. Fifty minutes is not enough for all of AI, and I'd rather you know where the edges of today's talk are.

[click] First, using models well: prompt and context engineering, fine-tuning a model on your own data, the embeddings behind document search, reasoning models that think before they answer, and models that take images, audio, and video.

[click] Building agents: how to design the harness around the model, how to evaluate whether an agent is actually good, systems of several agents working together, long-term memory, agents that operate a computer's screen and mouse, and the logging and guardrails that keep them in check.

[click] How models are made: pretraining and scaling, reinforcement learning, which is how models are taught to be helpful, open-weight models you can run on your own machine, making models smaller and faster, image and video generation, and interpretability, the research on what's actually going on inside.

[click] And risks and society: security attacks like prompt injection, AI safety and alignment, bias, privacy and copyright, cost and energy use, regulation, and what all of this means for jobs and education.

Any of these would be a talk on its own. If one caught your eye, that's a good place to start reading.
-->

---
layout: center
stage: 9
---

<CoursePitch />

<!--
If that list made you want more, I have good news. This spring, Spring 2027, I'm teaching a new course: ECE 4602, AI Systems Engineering.

It picks up most of what we just skipped: prompt and context engineering, embeddings and search, fine-tuning, harness design, how to evaluate an agent properly, multi-agent systems, memory, guardrails, running models locally, and security.

The only prerequisite is familiarity with Python.

Today was the map. That course is where you build these systems yourself.
-->

---
stage: 9
clicks: 3
---

# Three places to start

<MondayStarters />

<!--
So what do you actually do on Monday?

[click] Try a coding agent: Claude Code, Cursor, or Copilot's agent mode. Give it a small, checkable task, like writing tests for some lab-data code and making them pass. Watch the loop happen.

[click] Try a deep-research tool. Ask a real design question and then click every citation. That builds the verification habit.

[click] And try an MCP-connected assistant. Hook a desktop assistant up to a folder of your own documents, like datasheets or lab notes, and ask it questions. Once that works, connecting it to your own instruments is a small next step.
-->

---
layout: center
clicks: 2
---

<div class="challenge">
  <div class="kicker c-loop">The challenge</div>
  <div class="big">Pick <span class="c-loop">one</span> repetitive task in your field.</div>
  <div v-click="1" class="big">Automate a <span class="c-tool">piece</span> of it this month.</div>
  <div v-click="2" class="qa">Questions?</div>
</div>

<style>
.challenge { text-align: left; max-width: 1050px; }
.challenge .big { font-size: 3rem; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; margin-top: 0.4rem; }
.challenge .qa { margin-top: 4rem; font-size: 1.6rem; color: var(--muted); font-family: 'JetBrains Mono', monospace; }
</style>

<!--
Here's my challenge. Pick one repetitive task in your field: the lab report formatting, the unit-conversion spreadsheet, the datasheet lookup, the test you rerun by hand every week.

[click] And automate a piece of it this month. Not the whole thing, a piece. Give it a clear goal, give it tools, give it a way to check its work, and keep yourself in the outer loop.

You now know how every layer of these systems works. That puts you ahead of most people using them.

[click] Thanks. I'm happy to take questions.
-->
