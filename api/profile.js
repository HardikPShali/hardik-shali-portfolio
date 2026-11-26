// The only facts the portfolio assistant may use. Keep this in sync with index.html and the CV.
module.exports = `
Name: Hardik Shali. Role: Frontend Developer (Vue.js, React, TypeScript). Based in Berlin, Germany.
Availability: available immediately. Languages: English C1, German A2 (improving).
Contact: hardikshali1612@gmail.com, linkedin.com/in/hardikshali, github.com/HardikPShali.

Experience:
- Software Engineer (independent), Berlin, Jul 2025 to present. Designed, built and deployed four live TypeScript frontend products. Business logic in plain TypeScript reducers covered by unit tests. Keyboard-operable, responsive UIs with Radix primitives, non-colour status cues, reduced-motion support and mobile drawer layouts.
- Implementation Consultant, ThoughtSpark, Apr 2023 to Sep 2023. Turned unclear client requirements into data models, workflow logic and validation rules; worked with Product and Engineering.
- Software Engineer (Frontend), Accubits, Apr 2022 to Apr 2023. Shipped customer-facing Vue.js and React features in TypeScript for products used by 10,000+ users, in teams of 8 to 12. Cut page load time by 40% through profiling, code splitting and lazy loading. Built reusable, accessible components from Figma designs.
- Software Developer Intern, Accubits, Dec 2021 to Apr 2022. TypeScript features from system designs, REST API integration, validation and unit tests.

Projects:
- Agent Trace: debugger for AI agent runs with step replay, latency waterfall, side-by-side run comparison and evaluations that re-score when budgets change. Includes an AI review: the run and its evaluations go to a language model through a Cloudflare Worker, which streams back what happened, the root cause and a suggested prompt fix. React, TypeScript, Radix UI.
- Contract Lab: API contract review tool that classifies schema changes as breaking, risky or safe, flags affected consumers and blocks merges until acknowledged. Exports OpenAPI 3.1. Includes an AI migration guide: the classified changes and affected consumers go to a language model, which streams back a release summary, migration steps for each consumer team and a message for their owners, ready to copy. React, TypeScript.
- Access Lens: role-based access designer with permission matrix, least-privilege checks, four-eyes approvals, permission simulator and CSV audit export. Includes an AI explanation: a role's permissions, draft changes, guardrail findings and member counts go to a language model, which explains in plain English what the role allows, why each risk matters and the smallest fix; no names or emails are sent. React, TypeScript.
- OpsPilot: incident operations workbench with decision queue, SLA timers, error-budget burn tracking and keyboard shortcuts. Includes an AI postmortem: the decision log, remediations with their reasons, SLA result and runbook progress go to a language model, which streams back a blameless postmortem with a timeline and action items; if no root cause is logged it says so instead of guessing. React, TypeScript.
- FutureGrail (Accubits, 12-person team): auction and catalogue UI for a luxury watch platform in Next.js, TypeScript and Redux Toolkit; about 30% faster loads through lazy loading, component reuse and fewer requests.
- HealthierU (Accubits, 8-person team): React and Material UI frontend for video consultations (Agora SDK) and appointment scheduling.
- Resort Map (code test): interactive cabana-booking app; owned the parser, Node.js/Express API, React interface, booking flow, persistence and Jest tests.

AI engineering: built five streaming LLM features (Agent Trace, Contract Lab, OpsPilot, Access Lens and this portfolio's assistant) using OpenAI-compatible Chat Completions APIs with Google Gemini's free tier by default. API keys stay server-side (Cloudflare Workers and Vercel functions); requests are validated, size-limited and rate-limited; prompts are grounded in supplied facts so the model does not invent details. Built with AI-supported development tools, including Claude Code.

Skills: TypeScript, JavaScript (ES6+), HTML5, CSS3, Vue.js, React, Next.js, Redux Toolkit, React Context, Tailwind CSS, Radix UI, Material UI, Figma, design systems, accessibility, REST APIs, LLM API integration, Python, Jest, Playwright, code reviews, Git, CI/CD, Vite, webpack, Vercel, AWS (S3, Lambda), workflow design, data modelling.

Education: M.Sc. Data Science, IU International University of Applied Sciences, Berlin (2024 to 2025, grade 1.9, English-taught). M.Sc. Information Technology (2020 to 2022) and B.Sc. Information Technology (2017 to 2020), Veer Narmad South Gujarat University, Surat, India.
`.trim();
