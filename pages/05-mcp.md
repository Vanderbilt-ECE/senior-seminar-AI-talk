---
layout: center
stage: 5
---

<SectionTitle title="MCP" color="var(--mcp)" />

---
stage: 5
clicks: 3
---

# Like USB, but for tools

<McpHub />

<!--
Layer five. Once everyone realized tools were the key, everyone built them, and everyone built them differently.

On the left are AI apps: a chat assistant, a coding agent in your IDE, an agent you build yourself. On the right are the things you want them to reach: files, databases, Slack, CAD.

[click] Until recently each pair needed its own custom glue code. Three apps times four tools is twelve integrations, and every new app or tool multiplies the work. This is what computer peripherals were like before USB.

[click] MCP, the Model Context Protocol, is the USB port. It's an open standard: a tool speaks MCP once, an app speaks MCP once, and they all just work together. Three plus four is seven.

[click] And here's the payoff. Your lab writes one MCP server for its instrument, and every compatible assistant can use it immediately. No changes on the AI side. In any MCP-compatible assistant, Claude, ChatGPT, or a coding agent in your IDE, you could ask "what's the oven temp on channel 3?" and it would call your instrument.

There are already MCP servers for file systems, databases, GitHub, Slack, and browsers, and people are building them for CAD packages and lab software.
-->

---
stage: 5
clicks: 4
---

# What MCP actually does

<McpAnatomy />

<Takeaway v-click="4" k="var(--mcp)">MCP makes tools portable and lets you connect agents to your own systems.</Takeaway>

<!--
So what does MCP actually give you? Across the top are the three pieces. The AI app is where you work with the model: Claude, ChatGPT, Cursor. The application is software you already use: email, notes, CAD, simulation software. In between is an MCP server, a small adapter program. On one side it speaks MCP; on the other it talks to the application through that application's own API. You need one per application, and for a lot of popular software someone has already written it.

[click] A server can give the AI three kinds of things. Tools are things it can do, like exporting Gerber files from Eagle or running a SPICE simulation. Resources are things it can read, like your Obsidian notes or a Slack channel's history, pulled into the context. Prompts are ready-made workflows you pick from a menu, like "summarize this week's messages."

[click] Servers come in two flavors. Local servers connect to apps running on your own computer: Fusion, Obsidian, Eagle, SPICE. Remote servers connect to web apps and online services, like Google Drive, your calendar, or your email.

[click] And for those remote services, MCP includes secure sign-in. You log in to your own account through the normal login page, the AI never sees your password, and now it can reach your files, calendar, and mail with your permission. That's what turns a general chatbot into your assistant.

[click] Takeaway: MCP makes tools portable and lets you connect agents to your own systems.
-->

---
layout: center
stage: 5
---

<Definition term="MCP" c="var(--mcp)">is an open standard that lets any AI app connect to any application through one common plug.</Definition>

<!--
Before we move on, here's the whole section in one sentence: MCP is an open standard that lets any AI app connect to any application through one common plug.
-->
