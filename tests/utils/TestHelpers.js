// Test Helper Functions
// Collection of useful utility functions for tests
// Makes tests more readable and maintainable

class TestHelpers {
  
  /**
   * Wait for a specific amount of time (for demo purposes)
   * @param {number} milliseconds - Time to wait in milliseconds
   */
  static async wait(milliseconds) {
    console.log(`⏳ Waiting ${milliseconds}ms for demo visibility...`);
    await new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Take a screenshot with a descriptive name
   * @param {Page} page - Playwright page object
   * @param {string} name - Descriptive name for the screenshot
   */
  static async takeScreenshot(page, name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `screenshot-${name}-${timestamp}.png`;
    console.log(`📸 Taking screenshot: ${filename}`);
    await page.screenshot({ path: `test-results/${filename}`, fullPage: true });
    console.log('✅ Screenshot saved');
  }

  /**
   * Log a test step with formatting for demo clarity
   * @param {string} stepDescription - Description of the test step
   */
  static logTestStep(stepDescription) {
    console.log('\n' + '='.repeat(50));
    console.log(`🎯 TEST STEP: ${stepDescription}`);
    console.log('='.repeat(50));
  }

  /**
   * Log test completion with summary
   * @param {string} testName - Name of the completed test
   * @param {string} status - Status of the test (PASSED/FAILED)
   */
  static logTestCompletion(testName, status) {
    const emoji = status === 'PASSED' ? '✅' : '❌';
    console.log('\n' + '='.repeat(60));
    console.log(`${emoji} TEST COMPLETED: ${testName} - ${status}`);
    console.log('='.repeat(60) + '\n');
  }

  /**
   * Generate random test data
   * @param {string} type - Type of data to generate ('email', 'name', 'text')
   * @returns {string} Generated test data
   */
  static generateRandomData(type) {
    const timestamp = Date.now();
    
    switch (type.toLowerCase()) {
      case 'email':
        return `testuser${timestamp}@demo.com`;
      case 'name':
        return `TestUser${timestamp}`;
      case 'text':
        return `Sample text ${timestamp}`;
      case 'todo':
        const todos = [
          'Learn Playwright automation',
          'Complete demo presentation',
          'Review test results',
          'Update documentation',
          'Practice codegen features'
        ];
        return todos[Math.floor(Math.random() * todos.length)] + ` ${timestamp}`;
      default:
        return `TestData${timestamp}`;
    }
  }

  /**
   * Verify element is visible and ready for interaction
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector for the element
   * @param {string} elementName - Descriptive name for logging
   * @returns {boolean} True if element is ready
   */
  static async verifyElementReady(page, selector, elementName) {
    console.log(`🔍 Verifying ${elementName} is ready for interaction...`);
    
    try {
      // Wait for element to be visible
      await page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
      
      // Verify element is enabled (if applicable)
      const isEnabled = await page.isEnabled(selector);
      
      if (isEnabled !== false) { // null or true means it's ready
        console.log(`✅ ${elementName} is ready`);
        return true;
      } else {
        console.log(`❌ ${elementName} is disabled`);
        return false;
      }
    } catch (error) {
      console.log(`❌ ${elementName} is not ready: ${error.message}`);
      return false;
    }
  }

  /**
   * Perform action with retry logic
   * @param {Function} action - Async function to execute
   * @param {number} maxRetries - Maximum number of retries (default: 3)
   * @param {number} delay - Delay between retries in ms (default: 1000)
   * @returns {any} Result of the action
   */
  static async retryAction(action, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt} of ${maxRetries}...`);
        const result = await action();
        console.log('✅ Action completed successfully');
        return result;
      } catch (error) {
        console.log(`❌ Attempt ${attempt} failed: ${error.message}`);
        
        if (attempt === maxRetries) {
          console.log('💥 All attempts failed');
          throw error;
        }
        
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await this.wait(delay);
      }
    }
  }

  /**
   * Validate page title contains expected text
   * @param {Page} page - Playwright page object
   * @param {string} expectedTitle - Expected title text
   * @returns {boolean} True if title is correct
   */
  static async validatePageTitle(page, expectedTitle) {
    console.log(`🔍 Validating page title contains: "${expectedTitle}"`);
    
    const actualTitle = await page.title();
    const isValid = actualTitle.includes(expectedTitle);
    
    console.log(`Page title: "${actualTitle}"`);
    console.log(`Validation ${isValid ? 'PASSED' : 'FAILED'}`);
    
    return isValid;
  }

  /**
   * Validate page URL contains expected path
   * @param {Page} page - Playwright page object
   * @param {string} expectedPath - Expected URL path
   * @returns {boolean} True if URL is correct
   */
  static async validatePageURL(page, expectedPath) {
    console.log(`🔍 Validating URL contains: "${expectedPath}"`);
    
    const currentURL = page.url();
    const isValid = currentURL.includes(expectedPath);
    
    console.log(`Current URL: "${currentURL}"`);
    console.log(`Validation ${isValid ? 'PASSED' : 'FAILED'}`);
    
    return isValid;
  }

  /**
   * Get browser and device information for reporting
   * @param {Page} page - Playwright page object
   * @returns {Object} Browser and device info
   */
  static async getBrowserInfo(page) {
    const userAgent = await page.evaluate(() => navigator.userAgent);
    const viewportSize = page.viewportSize();
    
    return {
      userAgent,
      viewport: viewportSize,
      url: page.url(),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Clear all form fields on a page (useful for test cleanup)
   * @param {Page} page - Playwright page object
   * @param {Array<string>} selectors - Array of input selectors to clear
   */
  static async clearFormFields(page, selectors) {
    console.log('🧹 Clearing form fields...');
    
    for (const selector of selectors) {
      try {
        await page.fill(selector, '');
        console.log(`✅ Cleared field: ${selector}`);
      } catch (error) {
        console.log(`⚠️ Could not clear field ${selector}: ${error.message}`);
      }
    }
  }

  /**
   * Demo mode: Add extra waits and logging for live presentations
   * @param {Page} page - Playwright page object
   * @param {string} actionDescription - What action just happened
   * @param {number} waitTime - Time to wait in ms (default: 2000)
   */
  static async demoMode(page, actionDescription, waitTime = 2000) {
    console.log(`\n🎭 DEMO MODE: ${actionDescription}`);
    await this.wait(waitTime);
    
    // Optional: Take screenshot for demo documentation
    const screenshotName = actionDescription.toLowerCase().replace(/\s+/g, '-');
    await this.takeScreenshot(page, screenshotName);
  }
}

// Export the class so it can be used in test files
module.exports = TestHelpers;