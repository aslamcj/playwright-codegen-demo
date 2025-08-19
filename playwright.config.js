// Playwright Configuration File
// This file controls how Playwright runs your tests
// Perfect for beginners and demo purposes

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Test directory - where all your test files are located
  testDir: './tests',
  
  // Global test timeout (30 seconds) - how long each test can run
  timeout: 30 * 1000,
  
  // Expect timeout (10 seconds) - how long to wait for assertions
  expect: {
    timeout: 10 * 1000
  },
  
  // Test execution settings
  fullyParallel: false, // Run tests one at a time for demo clarity
  forbidOnly: !!process.env.CI, // Prevent accidentally leaving test.only in CI
  retries: process.env.CI ? 2 : 1, // Retry failed tests once locally, twice in CI
  workers: 1, // Run one test at a time for better demo visibility
  
  // Reporter configuration - what kind of test reports to generate
  reporter: [
    ['html'], // Beautiful HTML report for demos
    ['list'], // Simple list in terminal
    ['json', { outputFile: 'reports/test-results.json' }] // JSON for data analysis
  ],
  
  // Global test setup and configuration
  use: {
    // Base URL for relative page navigation
    baseURL: 'https://www.saucedemo.com',
    
    // Browser and viewport settings
    headless: false, // Show browser during tests (great for demos!)
    viewport: { width: 1366, height: 720 }, // Standard demo resolution
    
    // Demo-friendly settings
    slowMo: 1000, // Slow down actions by 500ms for demo visibility
    
    // Screenshots and videos - Enhanced for better reporting
    screenshot: 'on', // Take screenshots for all tests (great for reports!)
    video: 'on', // or 'retain-on-failure', 'on-first-retry', 'off' 
    
    // Tracing for debugging
    trace: 'retain-on-failure', // Keep detailed trace on failure
    
    // Action timeout - how long to wait for clicks, fills, etc.
    actionTimeout: 10 * 1000,
    
    // Navigation timeout - how long to wait for page loads
    navigationTimeout: 15 * 1000,
    
    // Screenshot quality settings to prevent shrinking
    launchOptions: {
      args: [
        '--force-device-scale-factor=1', // Prevent DPI scaling issues
        '--disable-web-security', // Disable web security for consistent screenshots
        '--disable-features=VizDisplayCompositor', // Prevent rendering issues
      ]
    },
    
    // Device scale factor to prevent shrinking
    deviceScaleFactor: 1,
    
    // Force consistent pixel ratio
    isMobile: false,
    hasTouch: false
  },

  // Browser projects - define which browsers to test on
  projects: [
    {
      name: 'mobile-safari',
      use: { 
        ...devices['iPhone 12'],
        slowMo: 800,
        video: 'retain-on-failure',
      },
    }
    
    // Multi-browser testing disabled by default
    // Uncomment sections below when multi-browser testing is needed
    // 
    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     slowMo: 500,
    //     video: 'retain-on-failure',
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: { 
    //     ...devices['Desktop Safari'],
    //     slowMo: 500,
    //     video: 'retain-on-failure',
    //   },
    // },
    // 
    // Mobile devices (uncomment when needed)
    // {
    //   name: 'mobile-chrome',
    //   use: { 
    //     ...devices['Pixel 5'],
    //     slowMo: 800,
    //     video: 'retain-on-failure',
    //   },
    // },
    // {
    //   name: 'mobile-safari',
    //   use: { 
    //     ...devices['iPhone 12'],
    //     slowMo: 800,
    //     video: 'retain-on-failure',
    //   },
    // },
    // 
    // Tablet devices (uncomment when needed)
    // {
    //   name: 'tablet-chrome',
    //   use: { 
    //     ...devices['iPad Pro'],
    //     slowMo: 600,
    //     video: 'retain-on-failure',
    //   },
    // },
    // {
    //   name: 'tablet-safari',
    //   use: { 
    //     ...devices['iPad'],
    //     slowMo: 600,
    //     video: 'retain-on-failure',
    //   },
    // }
  ],

  // Web server configuration (if you need to run a local server)
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
  
  // Output directory for test results
  outputDir: 'test-results/',
  
  // Global setup files (run before all tests)
  // globalSetup: './config/global-setup.js',
  
  // Global teardown files (run after all tests)
  // globalTeardown: './config/global-teardown.js'
});

// Configuration Notes for Beginners:
// 
// 1. headless: false - Shows the browser window during tests (perfect for demos)
// 2. slowMo: 500 - Adds delay between actions so you can see what's happening
// 3. workers: 1 - Runs one test at a time instead of parallel (clearer for demos)
// 4. screenshot: 'only-on-failure' - Automatically captures screenshots when tests fail
// 5. video: 'retain-on-failure' - Records video of failed tests for debugging
// 
// Demo Tips:
// - Use 'npm run test:demo' for even slower execution during live presentations
// - Use 'npm run test:headed' to see the browser during test runs
// - Use 'npm run test:debug' to pause and step through tests line by line