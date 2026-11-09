# From Chatbots to Agents

A Slidev presentation for Vanderbilt ECE's senior seminar.

[View the presentation](https://vanderbilt-ece.github.io/senior-seminar-AI-talk/)

## Local development

Use Node.js 24 and pnpm 11.7.0.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Deployment

GitHub Actions builds and deploys the presentation to GitHub Pages on every push
to `main`. You can also run **Deploy presentation** manually from the Actions tab.

To build the website locally:

```bash
pnpm build --base /senior-seminar-AI-talk/ --router-mode hash
```

The output is in `dist/`. Speaker notes are included in the website; add
`--without-notes` to the workflow's build command to omit them from the build.
