# Hardik Shali – Portfolio

Hand-built with HTML, CSS and JavaScript, deployed on Vercel: https://hardik-shali-portfolio.vercel.app

## Ask my portfolio (AI assistant)

Visitors can ask questions about my work and get a streamed answer from a language model.

- `api/ask.js` is a Vercel serverless function. It calls an OpenAI-compatible Chat Completions endpoint (Google Gemini's free tier by default) with `stream: true` and re-streams only the text to the browser.
- Answers are grounded in `api/profile.js`: the model is told to use only those facts and to say when it doesn't know, instead of inventing details.
- The API key stays on the server. Questions are length-limited, conversation history is trimmed to the last few turns, output tokens are capped, and a per-IP rate limit protects the budget.
- `script.js` streams the answer into the page with an accessible live region; it works with keyboard and screen readers and respects reduced motion.

### Configure (free)

1. Create a free Gemini API key in Google AI Studio (https://aistudio.google.com/apikey).
2. In the Vercel project settings, add the environment variable `AI_API_KEY` with that key, then redeploy.

It uses Google's free Gemini tier through its OpenAI-compatible endpoint by default. Optional: `AI_MODEL` (default `gemini-flash-latest`) and `AI_BASE_URL` to switch to another OpenAI-compatible provider such as OpenAI or Groq.
