---
layout: center
stage: 6
---

<SectionTitle title="Retrieval" color="var(--rag)" />

---
stage: 6
clicks: 7
---

# Looking it up: retrieval from the web

<WebSearchChat />

<!--
Layer six. Remember the frozen weights? The model can't know anything that happened after its training cutoff. So what happens when you ask it something current?

[click] Here's a simple one: what's the weather in Nashville right now?

[click] A well-built model knows what it doesn't know. Its training data is frozen, so it can't possibly know today's weather. It needs to look it up.

[click] And it has a tool for that. Same pattern as the calculator: it writes a tool call. This time the tool is web_search, and the argument is a search query.

[click] The chatbot runs the search and gets back a web page. Look at it: the temperature, humidity, an hourly forecast, an ad, pollen counts. A lot of stuff.

[click] The page's text gets pasted into the context, right next to the question. The model doesn't learn anything; it just has the page in front of it now.

[click] And now it can answer: 58 degrees and light rain.

[click] That's retrieval-augmented generation, RAG. Retrieve the right text, add it to the context, then generate the answer. The model reads before it answers, like an open-book exam.
-->

---
stage: 6
clicks: 7
---

# Retrieval from your own documents

<DocRetrieval />

<Takeaway v-click="7" k="var(--rag)">Retrieval gives the model up-to-date, domain-specific knowledge without retraining.</Takeaway>

<!--
The web is one source. The more valuable one in engineering is your own documents: datasheets, specs, drawings, test reports. The model has never seen any of these. They weren't on the internet when it was trained.

[click] You can't paste all of them into every conversation; remember the context window. So first, you chop every document into small chunks, a paragraph or a table row each.

[click] And you store those chunks in a database. This happens once, ahead of time, and whenever a document changes you just update its chunks.

[click] Now someone asks: what's the max operating temperature of the TS-40 sensor?

[click] The model writes a tool call, search_docs, and the chatbot queries the database.

[click] The database hands back the chunk that best matches the question: page 2 of the TS-40 datasheet. Only that chunk goes into the context, not the whole library.

[click] And the model answers: 125 degrees C, and it cites the datasheet page. That citation matters. You can open the datasheet and check it, which is a big part of why RAG is so useful in engineering.

[click] Takeaway: retrieval gives the model current, domain-specific knowledge without retraining. When a spec changes, you update the database, not the model.
-->

---
layout: center
stage: 6
---

<Definition term="Retrieval (RAG)" c="var(--rag)">means searching for relevant information and adding it to the model's context before it answers.</Definition>

<!--
Before we move on, here's the whole section in one sentence: Retrieval (RAG) means searching for relevant information and adding it to the model's context before it answers.
-->
