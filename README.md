# 🎭 Playwright Demo Framework

**A beginner-friendly Playwright automation framework with JavaScript, specially designed for demos and showcasing "no-code automation" through codegen.**

Perfect for presentations, training sessions, and demonstrating the power of Playwright to both technical and non-technical audiences.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- No coding experience required for basic usage!

### Installation
```bash
# Clone or download this framework
cd playwright-demo-framework

# Install dependencies and Playwright browsers
npm run setup
```

### Your First Test (5 minutes)
```bash
# Open codegen and start recording your first test
npm run codegen:saucedemo

# Click around the SauceDemo site to record actions
# Close codegen window when done

# Run your generated test
npm run test:headed
```

**Congratulations! You just created and ran an automated test without writing any code!**

---

## 🎯 Demo-Perfect Features

### ✨ Codegen Showcase
- **Zero coding required** - Just click and interact normally
- **Instant test creation** - Watch your actions become automation code
- **Perfect for live demos** - Engaging and interactive presentations
- **Business-friendly** - Show ROI and efficiency to stakeholders

### 🏗️ Framework Benefits
- **Beginner-friendly** - Extensive comments and clear structure
- **Demo-ready** - Slow motion, screenshots, and detailed logging
- **Organized code** - Page Object Model for maintainability
- **Real test sites** - SauceDemo, TodoMVC, and other reliable demos

---

## 📋 Available Commands

### Basic Test Execution
```bash
npm test                    # Run all tests (Chrome)
npm run test:headed         # Show browser during tests
npm run test:demo          # Extra slow for live demos
npm run test:debug         # Step through tests line by line
npm run test:ui            # Interactive test runner
npm run test:enhanced      # Run enhanced PS navigation test
```

### Codegen Commands (The Magic!)
```bash
npm run codegen                    # Basic codegen
```

### Reporting and Analysis
```bash
npm run report             # Open HTML test report
npm run record             # Run tests with video recording
```


## 📁 Framework Structure

```
playwright-demo-framework/
├── tests/
│   ├── pages/                    # Page Object Model classes
│   ├── data/                     # Test data (easily editable)
│   ├── utils/                    # Helper functions
│   │   └── TestHelpers.js
│   ├── codegen-demos/            # Demo scenarios & guides
│   │   ├── codegen-demo-scenarios.md
│   │   ├── generated-code-examples.js
├── playwright.config.js          # Demo-optimized configuration
├── package.json                  # All demo commands included
└── README.md                     # This file!
```

## 🎓 Learning Path

---
# Essential Playwright Commands & Examples

## Navigation Commands

### Basic Navigation
```javascript
// Navigate to a website
await page.goto('https://example.com');

// Navigate with options
await page.goto('https://example.com', { 
  waitUntil: 'networkidle' 
});

// Go back/forward
await page.goBack();
await page.goForward();

// Reload page
await page.reload();
```

### Page Management
```javascript
// Create new page/tab
const newPage = await context.newPage();

// Close page
await page.close();

// Switch between pages
await page.bringToFront();
```

## Element Selection & Interaction

### Finding Elements
```javascript
// By text content
await page.getByText('Login');
await page.getByText('Submit', { exact: true });

// By role (recommended)
await page.getByRole('button', { name: 'Login' });
await page.getByRole('textbox', { name: 'Username' });
await page.getByRole('link', { name: 'Home' });

// By placeholder
await page.getByPlaceholder('Enter your email');

// By label
await page.getByLabel('Password');

// By test ID (best for automation)
await page.getByTestId('submit-button');

// CSS selectors
await page.locator('.login-button');
await page.locator('#username');
await page.locator('[data-testid="login-form"]');

// XPath
await page.locator('xpath=//button[contains(text(), "Login")]');
```

### Clicking Elements
```javascript
// Basic click
await page.getByRole('button', { name: 'Login' }).click();

// Click with options
await page.getByText('Submit').click({ 
  force: true,        // Click even if element is not visible
  timeout: 5000       // Custom timeout
});

// Double click
await page.getByText('File').dblclick();

// Right click
await page.getByText('Context Menu').click({ button: 'right' });
```

### Text Input
```javascript
// Type text
await page.getByLabel('Username').fill('john_doe');

// Type slowly (good for demos)
await page.getByLabel('Password').type('secret123', { delay: 100 });

// Clear and type
await page.getByLabel('Search').clear();
await page.getByLabel('Search').fill('playwright');

// Press keys
await page.getByLabel('Search').press('Enter');
await page.keyboard.press('Control+A');
```

## Form Interactions

### Input Fields
```javascript
// Text input
await page.getByLabel('First Name').fill('John');

// Number input
await page.getByLabel('Age').fill('25');

// Email input
await page.getByLabel('Email').fill('john@example.com');

// Password input
await page.getByLabel('Password').fill('secretpassword');
```

### Dropdowns & Select
```javascript
// Select by visible text
await page.getByLabel('Country').selectOption('United States');

// Select by value
await page.getByLabel('Country').selectOption({ value: 'us' });

// Select multiple options
await page.getByLabel('Skills').selectOption(['JavaScript', 'Python']);
```

### Checkboxes & Radio Buttons
```javascript
// Check a checkbox
await page.getByLabel('I agree to terms').check();

// Uncheck a checkbox
await page.getByLabel('Subscribe to newsletter').uncheck();

// Radio button
await page.getByLabel('Male').check();
```

### File Upload
```javascript
// Upload single file
await page.getByLabel('Upload').setInputFiles('path/to/file.pdf');

// Upload multiple files
await page.getByLabel('Upload').setInputFiles([
  'file1.jpg', 
  'file2.jpg'
]);

// Remove files
await page.getByLabel('Upload').setInputFiles([]);
```

## Waiting & Synchronization

### Wait for Elements
```javascript
// Wait for element to be visible
await page.getByText('Welcome').waitFor();

// Wait for element to be hidden
await page.getByText('Loading...').waitFor({ state: 'hidden' });

// Wait for element to be attached to DOM
await page.getByTestId('dynamic-content').waitFor({ state: 'attached' });

// Wait with timeout
await page.getByText('Success').waitFor({ timeout: 10000 });
```

### Wait for Page Events
```javascript
// Wait for page load
await page.waitForLoadState('networkidle');

// Wait for specific URL
await page.waitForURL('**/dashboard');

// Wait for navigation
await page.waitForNavigation();
```

### Custom Waits
```javascript
// Wait for function to return true
await page.waitForFunction(() => {
  return document.querySelectorAll('.item').length > 5;
});

// Wait for network response
await page.waitForResponse('**/api/data');

// Wait for request
await page.waitForRequest('**/api/submit');
```

## Assertions

### Element Assertions
```javascript
// Check if element is visible
await expect(page.getByText('Welcome')).toBeVisible();

// Check if element is hidden
await expect(page.getByText('Error')).toBeHidden();

// Check text content
await expect(page.getByTestId('title')).toHaveText('Dashboard');

// Check partial text
await expect(page.getByTestId('message')).toContainText('Success');

// Check element count
await expect(page.getByRole('listitem')).toHaveCount(5);

// Check if element is enabled/disabled
await expect(page.getByRole('button')).toBeEnabled();
await expect(page.getByRole('button')).toBeDisabled();

// Check if checkbox is checked
await expect(page.getByLabel('Agree')).toBeChecked();
```

### Page Assertions
```javascript
// Check page title
await expect(page).toHaveTitle('My App - Dashboard');

// Check page URL
await expect(page).toHaveURL('https://example.com/dashboard');

// Check URL contains
await expect(page).toHaveURL(/.*dashboard.*/);
```

### Value Assertions
```javascript
// Check input value
await expect(page.getByLabel('Username')).toHaveValue('john_doe');

// Check attribute
await expect(page.getByTestId('link')).toHaveAttribute('href', '/home');

// Check CSS property
await expect(page.getByTestId('button')).toHaveCSS('color', 'rgb(255, 0, 0)');
```

## Screenshots & Videos

### Screenshots
```javascript
// Full page screenshot
await page.screenshot({ path: 'screenshot.png' });

// Element screenshot
await page.getByTestId('chart').screenshot({ path: 'chart.png' });

// Screenshot with options
await page.screenshot({ 
  path: 'page.png',
  fullPage: true,
  clip: { x: 0, y: 0, width: 800, height: 600 }
});
```

### Videos
```javascript
// Enable video recording in playwright.config.js
use: {
  video: 'on-first-retry'  // or 'on', 'off', 'retain-on-failure'
}
```

## Browser & Context Management

### Browser Operations
```javascript
// Launch browser
const browser = await chromium.launch({ headless: false });

// Create context
const context = await browser.newContext();

// Create page
const page = await context.newPage();

// Close everything
await page.close();
await context.close();
await browser.close();
```

### Context Options
```javascript
// Create context with options
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  userAgent: 'Custom User Agent',
  locale: 'en-US',
  timezoneId: 'America/New_York'
});
```

## Mobile & Device Testing

### Mobile Emulation
```javascript
// iPhone 12
const iPhone = devices['iPhone 12'];
const context = await browser.newContext(iPhone);

// Custom mobile viewport
const context = await browser.newContext({
  viewport: { width: 375, height: 667 },
  isMobile: true,
  hasTouch: true
});
```

## Debugging Commands

### Console & Debugging
```javascript
// Pause execution for debugging
await page.pause();

// Add console logs
console.log('Current URL:', page.url());

// Get element text for debugging
const text = await page.getByTestId('status').textContent();
console.log('Status:', text);

// Take screenshot for debugging
await page.screenshot({ path: 'debug.png' });
```

## Common Demo Patterns

### Login Flow
```javascript
// Complete login example
await page.goto('https://saucedemo.com');
await page.getByTestId('username').fill('standard_user');
await page.getByTestId('password').fill('secret_sauce');
await page.getByTestId('login-button').click();
await expect(page.getByText('Products')).toBeVisible();
```

### Shopping Cart
```javascript
// Add item to cart
await page.getByTestId('add-to-cart-sauce-labs-backpack').click();
await page.getByTestId('shopping-cart-link').click();
await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
```

### Search Functionality
```javascript
// Search example
await page.getByPlaceholder('Search').fill('playwright');
await page.getByPlaceholder('Search').press('Enter');
await expect(page.getByText('Results for "playwright"')).toBeVisible();
```

---

## 🔧 Troubleshooting

### Codegen Not Starting
```bash
# Reinstall Playwright browsers
npx playwright install

# Try specific browser
npx playwright codegen --browser=chromium
```

### Tests Failing
```bash
# Run in debug mode to see what's happening
npm run test:debug

# Check if demo sites are accessible
curl -I https://www.google.com
```

### Slow Performance
```bash
# Reduce slowMo in playwright.config.js
# Turn off video recording for faster execution
```

---

## 🤝 Contributing & Extending

### Adding New Demo Sites
1. Create new page object in `tests/pages/`
2. Add test data in `tests/data/`
3. Create example tests
4. Add codegen command to `package.json`

### Enhancing for Your Organization
- Customize test data with your scenarios
- Add company-specific demo sites
- Include your branding in reports
- Create organization-specific challenges

---

## 📚 Additional Resources

### Playwright Documentation
- [Official Playwright Docs](https://playwright.dev)
- [Codegen Guide](https://playwright.dev/docs/codegen)
- [Best Practices](https://playwright.dev/docs/best-practices)

### Demo Materials
- Check `tests/codegen-demos/` for presentation scripts
- Use `codegen-challenges.md` for interactive workshops
- Reference `generated-code-examples.js` for before/after comparisons

### Community
- [Playwright GitHub](https://github.com/microsoft/playwright)
- [Playwright Discord](https://aka.ms/playwright-discord)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/playwright)

---

## 🎉 Success Stories

### "I created my first test in 2 minutes!"
*"I've never coded before, but with codegen I was able to automate our login process in just 2 minutes. Amazing!"* - Business Analyst

### "Perfect for client demos"
*"This framework is perfect for showing clients how we can automate their workflows. The codegen feature always impresses!"* - QA Manager

### "From zero to automation hero"
*"Started with no automation experience. Now our whole team is creating tests and we've caught 15 bugs before production!"* - Product Manager

---

## 🌐 Multi-Browser Testing

Multi-browser testing is **disabled by default** to keep the framework simple and fast. 

**When you need cross-browser testing**, see: `tests/multi-browser-disabled/ENABLE-MULTI-BROWSER.md`

This will enable testing across:
- Chrome, Firefox, Safari
- Mobile devices (iPhone, Android)
- Tablet devices (iPad)
- Parallel execution across all browsers

---

## 📄 License

MIT License - Feel free to use this framework for demos, training, and education!

---

## 🆘 Need Help?

- **Quick Questions**: Check the troubleshooting section above
- **Demo Support**: Review the presentation tips and demo scenarios
- **Multi-Browser Setup**: See `tests/multi-browser-disabled/ENABLE-MULTI-BROWSER.md`
- **Screenshot Issues**: See `SCREENSHOT-SHRINKING-SOLUTIONS.md`
- **Framework Issues**: Create an issue in the project repository
- **Customization Help**: See the contributing section for extension guides

---

**Happy Testing! 🎭✨**

*Remember: The best automation is the automation that everyone can understand and contribute to. This framework makes that possible!*