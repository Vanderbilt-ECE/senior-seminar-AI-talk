---
layout: center
stage: 2
---

<SectionTitle title="The Chatbot" color="var(--ctx)" />

---
stage: 2
clicks: 6
---

# A conversation is the whole history, resent every turn

<ChatLoop />

<!--
So how do you get a chatbot out of a text predictor? Here's the part most people never see.

[click] You ask a question. Your app, meaning the ChatGPT website or whatever you're using, keeps a list of messages. It sends that list to the model. One message.

[click] The reply comes back and the app appends it to the list.

[click] You ask a follow-up: "Which is cheaper?" Look at what gets sent. Not just your new question. All three messages. The model has no idea what "which" refers to unless the earlier turns are sent again.

[click] Reply appended.

[click] Third turn: five messages go over the wire. Look at the tally at the bottom: every call sends more than the last.

[click] The model is stateless. Between calls it remembers nothing. The "memory" you feel in a chat is an illusion created by the app resending the transcript every time. This one fact explains a lot: why long chats get slow and expensive, and why a model can "forget" things from early in a long conversation.
-->

---
stage: 2
clicks: 5
---

# System prompts: the role and the rules

<SystemPrompt />

<!--
Before your first message, the app can slip in one more: a message pinned at the top of the list. That's the system prompt. It's how a developer gives the model a role and rules.

Same model, same question: "Is a 6 mm fillet weld OK for this bracket?"

[click] With no system prompt you get the generic, eager-to-please answer: "6 mm is common, it's probably fine." That's not what you want from a reviewer.

[click] Now add a system prompt: you're a design reviewer, be terse, state assumptions, flag anything safety-critical, never approve.

[click] Then the exact same question as before.

[click] Completely different behavior. It asks for the load, states its electrode assumption, and escalates to a PE.

[click] There's no special mechanism here. The system prompt is just text at the top of the list, resent with every call. Every product you've used has a long one you never see.
-->

---
stage: 2
clicks: 8
---

# The context window: the central constraint

<div class="grid grid-cols-[420px_1fr] gap-14 mt-4">
<ContextWindow :capacity="32" :height="400" :items="[
  { kind: 'system', label: 'System prompt', tokens: 2, pinned: true },
  { kind: 'user', label: 'Question', tokens: 0.5 },
  { kind: 'asst', label: 'Answer', tokens: 1 },
  { kind: 'file', label: 'Pasted: 40-page spec', tokens: 15 },
  { kind: 'asst', label: 'Summary of spec', tokens: 2 },
  { kind: 'user', label: 'Follow-up', tokens: 0.5 },
  { kind: 'file', label: 'Pasted: test log', tokens: 20 },
]" />

<div class="facts">
  <div v-click="1">Everything the model knows about <i>your task</i> has to fit in here.</div>
  <div v-click="4">Fixed size, measured in <b class="c-ctx">tokens</b>.</div>
  <div v-click="7" class="c-bad">Full? The oldest content falls out, <b>including the spec</b>.</div>
  <div v-click="7" class="small">Real windows are ~200K–1M tokens. Still finite, and answer quality degrades as they fill.</div>
</div>
</div>

<style>
.facts { display: flex; flex-direction: column; gap: 26px; font-size: 1.45rem; font-weight: 600; line-height: 1.3; padding-top: 40px; }
.facts .small { font-size: 1rem; color: var(--muted); font-weight: 400; }
</style>

<Takeaway v-click="8" k="var(--ctx)">A chatbot = the model + a loop + a growing message list.</Takeaway>

<!--
That growing list has a hard limit, and this is the single most important constraint in everything that follows. It's called the context window.

Think of it as the model's entire working memory for a task. Its knowledge lives in the weights. Everything about YOUR problem has to be in this window.

[click] The system prompt, pinned at the top, just like we saw.

[click] Your question.

[click] An answer.

[click] Now you paste in a 40-page spec. That's big. Look at the gauge. The window is a fixed size, measured in tokens.

[click] The model summarizes it.

[click] A short follow-up.

[click] Now you paste a big test log, and the window is over capacity. Something has to go. The app drops the oldest messages, and that includes the spec you pasted. The model will now confidently answer questions about a spec it can no longer see.

Real windows today hold roughly 200 thousand to a million tokens, which is a few novels' worth. That's big, but agents chew through it fast: every file read, every tool output, and every error message lands in here. Remember this picture. Managing it is a big part of making agents work.

[click] Takeaway for layer two: a chatbot is the model plus a loop plus a growing message list. Nothing more.
-->

---
layout: center
stage: 2
---

<Definition term="A chatbot" c="var(--ctx)">is an LLM in a loop that resends the whole conversation every turn, so it seems to remember.</Definition>

<!--
Before we move on, here's the whole section in one sentence: a chatbot is an LLM in a loop that resends the whole conversation every turn, so it seems to remember.
-->
