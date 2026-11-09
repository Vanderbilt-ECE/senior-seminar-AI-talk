---
layout: center
stage: 7
---

<SectionTitle title="The Agent Loop" color="var(--loop)" />

---
stage: 7
clicks: 7
---

# One shot vs. a loop

<SingleVsLoop />

<!--
Layer seven. This is where "agentic" comes from.

Remember the model ran twice in the tool-call example? Now let it run as many times as it needs.

Here's a task: find the max load in test_rig_07.csv.

[click] Single-shot tool use: ask, the model calls read_file, then answers. One tool call, then done.

[click] But the file's actually named something slightly different. The tool returns "not found," and that's the end of the line. "Sorry, I couldn't find that file."

[click] Now the loop version: think, act, observe, and repeat.

[click] Same first attempt, same error. But the error isn't the end. It's just another observation that goes back into the context.

[click] So the model does what you'd do: lists the directory and spots the real filename...

[click] ...and reads it.

[click] Then it decides it's done and answers. Same model, same tools. The only difference is that it keeps going.
-->

---
stage: 7
clicks: 5
---

# Think → act → observe → repeat

<AgentLoop />

<!--
Let's watch the loop in slow motion. Every iteration has three beats: think about what to do next, act by calling a tool, and observe by reading the result back into context.

The task: report the overshoot of a motor controller's step response.

[click] Iteration 1. Think: "I need the data." Act: list the logs folder. Observe: there's a step-test CSV.

[click] Iteration 2. It loads the file and computes overshoot on a column called "velocity." KeyError. That column doesn't exist.

[click] Iteration 3. This is the important one. It doesn't give up and it doesn't make up a number. It reads the error, reasons that the column name is wrong, and inspects the header. The real name is omega_rad_s.

[click] Iteration 4. It runs again with the right column: 12.4% overshoot, and it saves a plot.

[click] Then it checks the done condition, stops, and reports, including a note that the column names don't match the spec. A good agent tells you what surprised it.

Every one of those observations landed in the context window. This is why the context window matters so much: the loop fills it.
-->

---
stage: 7
clicks: 5
---

# What makes a loop work

<LoopExtras />

<Takeaway v-click="5" k="var(--loop)">The loop lets the model recover from errors and take on open-ended tasks.</Takeaway>

<!--
Three ingredients turn a loop into a good agent.

[click] Planning. For bigger tasks the agent writes a plan, often literally a checklist, and revises it as it learns things.

[click] Memory. The context window is finite, so good agents write notes to files and reload what they need, the same way you keep a lab notebook instead of memorizing everything.

[click] Knowing when to stop. Clear done criteria, like "all tests pass." A budget on the number of steps. And the ability to ask a human when it's stuck instead of spinning.

[click] So here's my definition. A system is agentic when the model chooses its next action, in a loop, until the goal is met. Not a single answer. A sequence of decisions.

[click] Takeaway: the loop lets the model recover from errors and handle open-ended tasks.
-->

---
layout: center
stage: 7
---

<Definition term="An agent loop (harness)" c="var(--loop)">lets the model choose an action, observe the result, and repeat until the goal is met.</Definition>

<!--
Before we move on, here's the whole section in one sentence: an agent loop, or harness, lets the model choose an action, observe the result, and repeat until the goal is met.
-->
