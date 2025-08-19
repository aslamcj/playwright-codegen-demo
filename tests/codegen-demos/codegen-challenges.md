# Codegen Demo Challenges

Interactive scenarios designed to engage audiences and demonstrate Playwright's codegen capabilities. Perfect for workshops, training sessions, and live demonstrations.

## Quick Start

```bash
# Start any challenge with:
npm run codegen


### Setup Command
```bash
npm run codegen:todomvc
```

### Teaching Moments
- "CRUD operations are easily automated"
- "Dynamic content testing is straightforward"
- "State changes are captured automatically"

---

### Setup Commands
```bash
# Desktop version
npx playwright codegen --device="Desktop Chrome" https://todomvc.com/examples/react/#/

# Mobile version  
npx playwright codegen --device="iPhone 12" https://todomvc.com/examples/react/#/
```

## Troubleshooting Common Issues

### Codegen Not Starting
```bash
# Make sure Playwright is installed
npx playwright install

# Try specific browser
npx playwright codegen --browser=chromium
```
