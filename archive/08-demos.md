---
layout: center
stage: 8
---

<SectionTitle title="Demos" color="var(--text)" />

---
stage: 8
clicks: 3
---

# Same loop. Different tools.

<DemoIntro />

<!--
That's the whole stack. Now let's see it do engineering work. Every demo has the same four parts, so you can compare them side by side:

- the task, in one sentence
- the tools the agent is allowed to call
- the loop, meaning what it actually did step by step
- and how you'd verify the result

[click] Mechanical and biomedical: a CAD part from a spec.

[click] Electrical and computer: a filter designed in SPICE.

[click] Civil and chemical: a code question answered with citations.

Watch for the moment something goes wrong. That's the most important part.

(TIMING: section 8 is budgeted ~9.5 min, trimmed from 11 to make room for the verification techniques in section 10. Keep the quick-hits slide to ~1 min.)
-->

---
stage: 8
clicks: 6
---

# CAD from a spec, with a mistake on purpose

<CadDemo />

<!--
First demo, and this is the one where it fails on screen. The task: a mounting bracket, a 60 by 30 by 5 millimeter plate, with two 6.5 mm holes 40 millimeters apart, center to center. The tools: write a file, run CadQuery (a Python CAD library), render it, and measure the result.

[click] The agent writes CadQuery code. A box, then a workplane on the top face, two hole positions, and the holes.

[click] It runs the code and renders the part. Looks like a bracket. A chatbot would stop here and say "here's your bracket!"

[click] But the agent was told to measure. Hole spacing: 38 millimeters. The spec says 40. FAIL. Look at line 7: it put the holes at plus and minus 19 from the center.

[click] It reasons: 40 center-to-center means plus and minus 20. It edits that one line.

[click] Re-runs, re-renders, re-measures: 40.0. Pass.

[click] Then it checks the rest of the spec, wall thickness, hole diameter, and envelope, and only then says it's done.

The lesson: the agent was wrong at first, which is normal. What saved it was a measurement step. Without "measure," that 2 mm error ships.

(To swap in a real recording: save it as public/demo-cad.mp4 and add video="/demo-cad.mp4" to the CadDemo's DemoFrame. Tools to try live: CadQuery or OpenSCAD with a coding agent.)
-->

---
stage: 8
clicks: 6
---

# Filter design: simulate, read, revise

<SpiceDemo />

<!--
Second demo, from ECE. The task: an RC low-pass filter with a 1 kHz cutoff, using a 10 nanofarad capacitor. The tools: write a netlist, run ngspice, read the plot.

[click] It writes a netlist: a source, R1, C1, and an AC sweep from 10 Hz to 100 kHz.

[click] It runs the simulation and reads the Bode plot. The cutoff, the minus 3 dB point, is at 3.39 kHz.

[click] Against the 1 kHz target, that's way off. It started with a 4.7k resistor, a "typical" value, not a computed one.

[click] Now it does the math: R equals 1 over 2 pi f C, which is 15.9 kilohms. And it picks the nearest standard E24 value, 16k. That's a domain-aware detail: you can't buy a 15.9k resistor off the shelf.

[click] It re-simulates. The curve slides left and the cutoff lands at 995 Hz.

[click] And it verifies two independent ways: the hand calculation agrees with the simulator. When two methods agree, you can trust the answer much more than either one alone.

(Swap-in: public/demo-spice.mp4. Live version: a coding agent with ngspice or LTspice in batch mode.)
-->

---
stage: 8
clicks: 5
---

# A code question, answered with receipts

<RagDemo />

<!--
Third demo: retrieval. The task: minimum concrete cover for #8 bars in a spread footing cast directly against soil. The tools: search the codes, read a clause.

[click] It searches. The top hit is the ACI 318 cover table. Notice the other hits: a geotech report and ACI 350, which are relevant-ish but not the answer.

[click] It reads the actual table rows instead of answering from memory.

[click] The answer: 3 inches, any bar size, with a citation.

[click] And it adds something a junior engineer often gets wrong: the 2-inch row is for formed surfaces exposed to earth, not for concrete cast against it.

[click] Verification: click the citation and it highlights the exact row. You can check the claim in five seconds. One caveat for real projects: confirm which code edition your jurisdiction has adopted.

(Chemical-engineering variant: the same pattern over SDS sheets, NFPA/OSHA references, or a reaction-kinetics literature set. "What's the max storage temperature for X, with citations.")
-->

---
stage: 8
clicks: 3
---

# Your field has one of these too

<QuickHits />

<!--
Quick hits for other fields. Same loop, different tools.

[click] Chemistry and pharma: give the agent a property calculator like RDKit. It can screen 200 candidate molecules, compute molecular weight and logP, filter by drug-likeness rules, and rank them. You verify by spot-checking a few against PubChem.

[click] Biology and materials: database lookups through UniProt or the Materials Project APIs. The agent fetches records, reconciles conflicts, and gives you a table where every row links to its source.

[click] Computer science: the coding agent is the most mature example of all of this. It reads the codebase, writes the feature, runs the tests, fixes the failures, and opens a pull request. Verification is CI plus a human code review.

(Keep this to ~1 minute.)
-->
