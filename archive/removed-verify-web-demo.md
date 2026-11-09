---
stage: 8
clicks: 7
---

# Let it see the page: browser automation

<VerifyWebDemo />

<!--
Concrete example. You ask an agent to build a dashboard for wind-tunnel data. The tools include Playwright, a browser-automation library. It works as a command-line tool or an MCP server, so the agent can open a page, click things, take screenshots, and read the browser console.

[click] The agent writes the HTML, CSS, and JavaScript.

[click] Without Playwright it would stop here and say "done!" Instead it opens the page in a real browser and takes a screenshot. That screenshot goes back into its context as an image. Remember, models take images as input.

[click] And it sees what you'd see: the legend is on top of the title, and the Export button is cut off at the right edge.

[click] It fixes the CSS. The legend moves below the title and the header wraps.

[click] Then it does what a QA tester would: it clicks "Export CSV" and reads the console. TypeError. Nothing downloaded. This bug is invisible in a screenshot. You only find it by interacting.

[click] It reasons that the export ran before the data loaded, and adds an await on the fetch.

[click] It re-runs everything: the screenshot is clean, and the download has 31 rows. And it hands you the screenshots and the file as evidence, not just "it works."

Setup tip: in Claude Code or similar, add the Playwright MCP server, or tell the agent "use npx playwright to screenshot the page after every change." It takes one sentence to set up.
-->

