---
layout: center
stage: 4
---

<SectionTitle title="Tools" color="var(--tool)" />

---
stage: 4
clicks: 6
---

# A tool call is structured output with a name

<ToolCallMap />

<!--
Layer four, and this is where it gets interesting.

[click] On the left is a tiny Python file. Two ordinary functions: read_file opens a file and returns its text, write_file writes text to a file. Nothing AI about them. You've written code like this a hundred times.

How does the model know these exist? You tell it. The function's name, its docstring, and its argument types all go into the context as more text. That's the menu the model gets to pick from.

[click] The model can't run Python. But it can write structured output, exactly like the last section. Here's what it writes when it wants to use one of these functions: a tool call. Two of them.

[click] Match them up. The "tool" field is the function name, read_file. The "args" are its parameters: path. Same names, same types. The function maps one-to-one onto a JSON object.

[click] Same thing for write_file. Name goes in "tool", and both parameters, path and content, go in "args."

[click] And on your side, one line of code turns that JSON back into a real function call: look up the function by name, unpack the args. That's how text becomes an action.

[click] So: function name becomes "tool," parameters become "args." A tool call really is just structured output with a name. And the key mental model: the model doesn't call anything. It writes a request, and your code decides whether to run it.
-->

---
stage: 4
clicks: 3
---

# What can be a tool?

<ToolGallery />

<!--
So what can be a tool?

[click] The basics: a calculator (models are surprisingly bad at arithmetic, so give them one). A code executor. Web search. A file reader.

[click] And the engineering ones: a circuit simulator, a database query, a CAD API, an EDA design-rule check.

[click] The rule of thumb: if you can call it from code, you can make it a tool. Anything with a Python API, a command-line interface, or a REST endpoint is fair game. That includes your lab's instrument-control scripts.
-->

---
stage: 4
clicks: 8
---

# One tool call, step by step

<ToolCallChat />

<!--
Let's trace one tool call all the way through. On the right is a chatbot window, the kind you've used a hundred times. On the left, outside the chatbot, is a small Python function: a calculator. It runs on a computer, not inside the model.

[click] You ask for the max bending stress in a cantilever.

[click] The model doesn't answer right away. It reasons first: this needs a precise number, and doing arithmetic token by token is exactly where it slips.

[click] So it writes a tool call: structured output naming the calculator tool, with the expression 6M over b h squared. That's the bending formula for a rectangular section. It hasn't computed anything. It just wrote a request.

[click] The chatbot sees the tool call, parses the JSON, and actually runs the Python. This is the moment text turns into an action, and notice who does it: the chatbot, not the model.

[click] The function returns 1.2 times 10 to the 8 pascals, and the chatbot puts that result back into the conversation. Remember, the model is stateless, so the whole history goes back to it, now with the result in it.

[click] Now the model has a real number. It answers: the max bending stress is about 120 megapascals, a safety factor of roughly 2 against A36 yield.

[click] The model only wrote a request; the chatbot ran real code. And notice that the model ran twice: once to write the tool call, once to write the answer. One question, two model calls, with a tool run in between. Hold on to that, because it's the seed of the agent loop.

[click] And here's what you actually see in most chatbots. All of that, the thinking, the tool call, the result, gets folded into one line: "Estimating the bending stress." Then the answer. The products hide the machinery, but this is what's happening underneath every time.
-->

---
stage: 4
clicks: 5
---

# The LLM never executes anything

<NeverExecutes />

<Takeaway v-click="5" k="var(--tool)">Tools turn text output into action, and your code decides which actions are allowed.</Takeaway>

<!--
I want to hammer this point, because it matters for safety later: the LLM never executes anything. It produces text. Your code, often called the harness, decides what actually happens.

[click] So when tool requests come in, reading a file or running tests in a sandbox, your code can simply allow them.

[click] Some requests should go to a human first, like sending an email to a vendor.

[click] Some should never run at all.

[click] This is where permissions, sandboxes, and approval prompts live. It's your code, under your control. When a coding agent asks "may I run this command?", that's the harness doing its job.

[click] Takeaway: tools turn text into action, and you decide which actions are allowed.
-->

---
layout: center
stage: 4
---

<Definition term="A tool" c="var(--tool)">is a function your code runs when the model asks for it with a structured call.</Definition>

<!--
Before we move on, here's the whole section in one sentence: a tool is a function your code runs when the model asks for it with a structured call.
-->
