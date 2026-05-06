import type { Category } from '../types'

const responses: Record<Category | 'default', string[]> = {
  Productivity: [
    "I've analyzed your request and prioritized the top 3 action items for today. Want me to add them to your task list?",
    "Great! I've scheduled that for you and set a reminder 30 minutes before. Anything else to add to your calendar?",
    "I found 5 tasks that are overdue. Should I reschedule them or mark the low-priority ones as skipped?",
    "Your productivity score this week is 78% — up 12% from last week. Here's what's driving the improvement...",
    "I've drafted a summary of your meeting notes. Action items: 3 assigned to you, 2 to the team. Shall I send it out?",
  ],
  Code: [
    "I spotted the issue — you're mutating state directly inside the render cycle. Here's the corrected version with a `useEffect` guard...",
    "The root cause is a race condition in your async handler. I'd suggest wrapping it in a try/catch with a debounce of 300ms.",
    "Code review complete. Found 2 critical issues, 1 warning, and 4 style suggestions. Want me to walk through each?",
    "That function has O(n²) complexity — I can refactor it to O(n log n) using a hash map. Want to see the diff?",
    "Tests are failing because the mock isn't resetting between test cases. Add `jest.clearAllMocks()` in your `beforeEach`.",
    "I've generated TypeScript types from your API schema. 12 interfaces, fully annotated with JSDoc comments.",
  ],
  Writing: [
    "Here's a polished version of your paragraph — tighter, more active voice, and punchy opener. Want me to adjust the tone?",
    "I've drafted 3 subject line variations for your email campaign. Open-rate predictions: 32%, 28%, and 41% respectively.",
    "Blog post outline ready: 5 sections, 1,200-word target, 3 LSI keyword clusters included. Ready to expand?",
    "I rewrote the product description with a stronger value prop in the first sentence. Conversion copy best practices applied.",
    "The copy is clear but buries the CTA. I'd move it to paragraph 2 and make it a standalone sentence. Try this version...",
  ],
  Research: [
    "I've analyzed 12 competitor pricing pages. Key insight: 8 of them lead with annual savings, not monthly price. Here's the breakdown...",
    "Market research complete. The segment is growing at 23% YoY. Top 3 unmet needs: speed, integrations, and transparent pricing.",
    "I found 6 relevant studies from the last 2 years. Here's a synthesis with key findings and confidence levels for each claim.",
    "Survey data analyzed. NPS: 62. Top detractor theme: onboarding complexity. Top promoter theme: customer support quality.",
    "Trend report: AI adoption in your vertical jumped 40% this quarter. Main drivers: cost reduction and staff augmentation.",
  ],
  Finance: [
    "Budget forecast updated. At current spend rate, you'll hit Q3 target 2 weeks early. Want me to flag savings opportunities?",
    "Invoice #INV-2024-047 is 14 days overdue. I've drafted a follow-up email — friendly but firm. Should I send it?",
    "Expense report reviewed. 3 items flagged as potential duplicates. Total anomalies: $847. Want me to query the submitter?",
    "Cash flow projection for the next 90 days: positive through month 2, tightest point is week 8 at $12K reserve. Options to improve...",
    "I've reconciled 243 transactions. 98.3% matched automatically. 4 need manual review — I've highlighted them with context.",
  ],
  default: [
    "That's a great question! Let me process that and get back to you with a detailed answer.",
    "Understood. I'm analyzing your request now — give me just a moment.",
    "I've processed your input. Here's what I found: the data suggests a clear pattern worth exploring further.",
    "Great input! Based on what you've shared, I'd recommend focusing on the highest-impact items first.",
    "I've completed the analysis. Want me to summarize the key takeaways or dive deeper into a specific area?",
  ],
}

export function getFakeResponse(category: Category): string {
  const pool = responses[category] ?? responses.default
  return pool[Math.floor(Math.random() * pool.length)]
}
