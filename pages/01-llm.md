---
layout: center
stage: 1
---

<SectionTitle title="The LLM" color="var(--llm)" />

---
stage: 1
clicks: 4
---

# A model with one job

<ModelBox />

<!--
Let's start at the bottom of the stack: the large language model itself. ChatGPT, Claude, and Gemini all have one of these at their core.

From the outside, the interface is tiny.

[click] Text goes in.

[click] Modern models also accept images: a photo of a whiteboard, a plot, a CAD screenshot.

[click] And text comes out. That's it. It never clicks anything, runs anything, or saves anything. It produces text.

[click] Inside is a huge pile of learned numbers, the weights. Quick question: how many weights do you think a model like this has? (Take a few guesses. Answer: billions; the largest models are estimated to be in the trillions.) They were tuned during training on a large fraction of the written internet. Keep this picture in mind: a box that turns text into more text. Everything else today is built around this box.
-->

---
stage: 1
clicks: 13
---

# How it writes: one token at a time

<TokenStream />

<!--
So how does it produce text? Here's the intuition, no math.

On the left is the input: "The cantilever beam deflects." The model reads all of it and, on the right, works out how likely every possible next word-piece is. We call those pieces "tokens." A token is roughly three-quarters of a word. Right now the next token is a question mark.

[click] Here's what the model actually produces: a probability for each candidate. "downward" is at 62%.

[click] "downward" is most likely, so we pick it.

[click] And here's the key move: "downward" gets appended to the input, and the whole thing runs through the model again. That loop is how every word gets written.

[click] Now the whole sentence, including "downward," goes back in. Next: "under."

[click] Append it, run again.

[click] "its"

[click] Append.

[click] "own"

[click] Append.

[click] "weight": 93%. The model is very sure here because that phrase shows up constantly in engineering text.

[click] Append.

[click] And a period.

[click] Append. Done.

Notice what did NOT happen. There's no plan and no lookup in a physics database. It's autocomplete, extraordinarily good autocomplete, trained on so much text that predicting the next token well forces it to pick up grammar, facts, code, and a fair amount of reasoning.

(If asked: it doesn't always take the top choice. It samples, which is why you can get different answers to the same question. That knob is called "temperature.")
-->

---
stage: 1
clicks: 5
---

# Frozen at training time

<FrozenWeights />

<Takeaway v-click="5" k="var(--llm)">An LLM is a powerful but <span class="c-llm">isolated</span> text predictor.</Takeaway>

<!--
One more property that matters a lot for the rest of the talk.

[click] The model learns from a giant pile of text: web pages, books, code, papers.

[click] Then training stops and the weights are frozen. Every time you use the model afterwards, those numbers stay exactly the same. It doesn't learn from your conversation.

[click] So it can't know anything that happened after its cutoff: today's news, the current price of a part, the standard that got revised last spring.

[click] And it has never seen your data: your files, your company's design docs, your lab results. None of that was in the training set.

[click] So here's the takeaway for layer one: an LLM is a powerful but isolated text predictor. Everything else in this talk is about connecting that box to the world.
-->

---
layout: center
stage: 1
---

<Definition term="An LLM" c="var(--llm)">is a model that takes a sequence of text as input and predicts the next token in that sequence.</Definition>

<!--
Before we move on, here's the whole section in one sentence: an LLM is a model that takes a sequence of text as input and predicts the next token in that sequence.
-->
