---
layout: center
stage: 3
---

<SectionTitle title="Structured Output" color="var(--json)" />

---
stage: 3
clicks: 5
---

# How does text become an action?

<TheGap />

<!--
Layer three. Before we get into structured output, here's the problem it solves, and honestly it's the question behind the rest of this talk.

So far everything our model produces is text. But we don't just want text. We want it to order the part, run the simulation, update the database. How does something that only writes text actually do anything?

Here's a request: order 450 BRK-2207 brackets at plus or minus 0.05 millimeters.

[click] On the left is the LLM. It's probabilistic: remember, it samples the next token.

[click] So ask it the same thing three times and you get three different texts. Same information, different words, different order, sometimes "four hundred fifty" spelled out, sometimes an emoji.

[click] On the right is your software. It's deterministic. A function like place_order has exact names and exact types. Give it the same input and it does the same thing every time. This is the side that touches the real world: the database, the API, the machine. And it needs exactly one shape of input.

[click] So there's a gap. On one side, text that's a little different every time. On the other, code that can't tolerate any ambiguity. How does a model that only writes text make software do something?

[click] The answer: we don't change what the model is. It still only writes text. We make it write text in a shape that software can't misread. That's structured output, and it's the bridge every layer from here on is built on.
-->

---
stage: 3
clicks: 4
---

# Functions need arguments, not prose

<FunctionArgs />

<!--
So what does "a shape software can't misread" actually look like? Let's zoom in on that right-hand side.

Code does things through functions. Here's one: place_order. You've written a thousand of these. It takes three arguments, each in its own slot, each with a type. A string, an int, a float.

[click] Now here's what the model naturally gives you: a friendly sentence. All the information is in there. But which part goes in which slot? Pass the whole reply in and Python tells you exactly what's wrong: one argument, three slots. Natural language has no slots. You could write a regex to dig the numbers out, but the next reply will be phrased differently.

[click] So instead, we ask the model to answer in JSON. Same information, but now every value has a label.

[click] Look at the keys: part_no, qty, tolerance_mm. They line up one-to-one with the function's parameters. One, two, three. JSON is basically an argument list written as text.

[click] Now one line of code unpacks it straight into the function, and the order goes through. That's the whole idea of structured output: it's how the model's text plugs into your code. Hold on to that, because in the next section we'll let the model pick which function to call, too.
-->

---
stage: 3
clicks: 4
---

# Messy email → clean JSON

<JsonMorph />

<!--
Here's a realistic use. An email from your supply chain team. Not a form, just a human writing.

[click] There are three facts buried in it: the part number, the quantity, and the tolerance.

[click] You give the model a schema, a template with field names and types: part_no is a string, qty is an integer, tolerance_mm is a number.

[click] It fills in the template.

[click] Notice "four hundred fifty" became the integer 450. A regex would never manage that. The model reads like a person and then writes like a program.

This is a big deal for engineering work: purchase orders, test reports, inspection notes, lab notebooks. Unstructured text goes in, a database row comes out.
-->

---
stage: 3
clicks: 5
---

# Enforced schemas: it <i>can't</i> break the format

<SchemaGate />

<Takeaway v-click="5" k="var(--json)">Structured output makes the model's text machine-readable, and that's the foundation for tools.</Takeaway>

<!--
"But what if it messes up the format?" Asking nicely in the prompt works most of the time. Many APIs go further and enforce the schema. Here's how, using the token picture from earlier.

On the left is the schema you provide.

[click] On the right, the model is partway through writing the JSON. Next comes the value for qty.

[click] These are its candidate next tokens. "450" is likely, but so is the string "about 450", and even "lots".

[click] With schema enforcement, the system knows qty must be an integer. Before picking, it zeroes out every token that would break the schema. Only valid continuations survive.

[click] So the output is guaranteed to parse. Not most of the time. Every time. Look for "structured outputs" or "strict mode" in the API docs.

[click] The takeaway: structured output makes text machine-readable. And as you're about to see, it's the foundation for everything that lets a model actually do things.
-->

---
layout: center
stage: 3
---

<Definition term="Structured output" c="var(--json)">is model output in a fixed format, like JSON, that a program can reliably read.</Definition>

<!--
Before we move on, here's the whole section in one sentence: Structured output is model output in a fixed format, like JSON, that a program can reliably read.
-->
