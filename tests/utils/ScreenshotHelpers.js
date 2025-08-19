// Screenshot Helper Functions
// Solutions for common screenshot issues like shrinking, scaling, and quality

class ScreenshotHelpers {

  /**
   * Take high-quality screenshot with proper scaling
   * @param {Page} page - Playwright page object
   * @param {string} name - Screenshot name
   * @param {Object} options - Screenshot options
   */
  static async takeHighQualityScreenshot(page, name, options = {}) {
    console.log(`📸 Taking high-quality screenshot: ${name}`);
    
    const defaultOptions = {
      path: `test-results/${name}.png`,
      fullPage: true,
      // Fix shrinking issues
      type: 'png',
      quality: 100, // Only for JPEG, but good practice
      // Prevent scaling issues
      clip: null,
      // Handle device pixel ratio
      animations: 'disabled', // Disable animations for consistent screenshots
    };

    const screenshotOptions = { ...defaultOptions, ...options };
    
    try {
      await page.screenshot(screenshotOptions);
      console.log(`✅ Screenshot saved: ${screenshotOptions.path}`);
    } catch (error) {
      console.log(`❌ Screenshot failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Take screenshot with fixed viewport (prevents shrinking)
   * @param {Page} page - Playwright page object
   * @param {string} name - Screenshot name
   * @param {number} width - Fixed width
   * @param {number} height - Fixed height
   */
  static async takeFixedViewportScreenshot(page, name, width = 1920, height = 1080) {
    console.log(`📸 Taking fixed viewport screenshot: ${name} (${width}x${height})`);
    
    // Store original viewport
    const originalViewport = page.viewportSize();
    
    try {
      // Set fixed viewport
      await page.setViewportSize({ width, height });
      
      // Wait for layout to settle
      await page.waitForTimeout(1000);
      
      // Take screenshot
      await page.screenshot({
        path: `test-results/${name}-${width}x${height}.png`,
        fullPage: true,
        type: 'png'
      });
      
      console.log(`✅ Fixed viewport screenshot saved: ${width}x${height}`);
    } finally {
      // Restore original viewport
      if (originalViewport) {
        await page.setViewportSize(originalViewport);
      }
    }
  }

  /**
   * Take screenshot with device pixel ratio handling
   * @param {Page} page - Playwright page object
   * @param {string} name - Screenshot name
   */
  static async takeRetinaScreenshot(page, name) {
    console.log(`📸 Taking retina-quality screenshot: ${name}`);
    
    // Get device pixel ratio
    const devicePixelRatio = await page.evaluate(() => window.devicePixelRatio);
    console.log(`🔍 Device pixel ratio: ${devicePixelRatio}`);
    
    await page.screenshot({
      path: `test-results/${name}-retina.png`,
      fullPage: true,
      type: 'png',
      // Handle high DPI displays
      animations: 'disabled'
    });
    
    console.log(`✅ Retina screenshot saved (DPR: ${devicePixelRatio})`);
  }

  /**
   * Take screenshot of specific element (prevents full page shrinking)
   * @param {Page} page - Playwright page object
   * @param {string} selector - Element selector
   * @param {string} name - Screenshot name
   */
  static async takeElementScreenshot(page, selector, name) {
    console.log(`📸 Taking element screenshot: ${name} (${selector})`);
    
    try {
      const element = page.locator(selector);
      await element.waitFor({ state: 'visible' });
      
      await element.screenshot({
        path: `test-results/${name}-element.png`,
        type: 'png',
        animations: 'disabled'
      });
      
      console.log(`✅ Element screenshot saved: ${name}`);
    } catch (error) {
      console.log(`❌ Element screenshot failed: ${error.message}`);
      // Fallback to full page
      await this.takeHighQualityScreenshot(page, `${name}-fallback`);
    }
  }

  /**
   * Take comparison screenshots (before/after)
   * @param {Page} page - Playwright page object
   * @param {string} baseName - Base name for screenshots
   * @param {Function} action - Action to perform between screenshots
   */
  static async takeComparisonScreenshots(page, baseName, action) {
    console.log(`📸 Taking comparison screenshots: ${baseName}`);
    
    // Before screenshot
    await this.takeHighQualityScreenshot(page, `${baseName}-before`);
    
    // Perform action
    if (action) {
      await action();
      await page.waitForTimeout(1000); // Wait for changes to settle
    }
    
    // After screenshot
    await this.takeHighQualityScreenshot(page, `${baseName}-after`);
    
    console.log(`✅ Comparison screenshots completed: ${baseName}`);
  }

  /**
   * Take mobile-optimized screenshot
   * @param {Page} page - Playwright page object
   * @param {string} name - Screenshot name
   */
  static async takeMobileScreenshot(page, name) {
    console.log(`📱 Taking mobile-optimized screenshot: ${name}`);
    
    const viewport = page.viewportSize();
    
    // Mobile-specific screenshot settings
    await page.screenshot({
      path: `test-results/${name}-mobile.png`,
      fullPage: true,
      type: 'png',
      // Mobile considerations
      animations: 'disabled',
      // Handle mobile scaling
      clip: null
    });
    
    console.log(`✅ Mobile screenshot saved (${viewport.width}x${viewport.height})`);
  }

  /**
   * Take desktop-optimized screenshot with zoom handling
   * @param {Page} page - Playwright page object
   * @param {string} name - Screenshot name
   * @param {number} zoomLevel - Browser zoom level (1.0 = 100%)
   */
  static async takeDesktopScreenshot(page, name, zoomLevel = 1.0) {
    console.log(`🖥️ Taking desktop screenshot: ${name} (zoom: ${zoomLevel * 100}%)`);
    
    try {
      // Set zoom level to prevent shrinking
      await page.evaluate((zoom) => {
        document.body.style.zoom = zoom;
      }, zoomLevel);
      
      // Wait for zoom to apply
      await page.waitForTimeout(500);
      
      await page.screenshot({
        path: `test-results/${name}-desktop-${Math.round(zoomLevel * 100)}pct.png`,
        fullPage: true,
        type: 'png',
        animations: 'disabled'
      });
      
      console.log(`✅ Desktop screenshot saved with ${zoomLevel * 100}% zoom`);
    } finally {
      // Reset zoom
      await page.evaluate(() => {
        document.body.style.zoom = '1.0';
      });
    }
  }

  /**
   * Take screenshot with custom CSS injection (prevent shrinking)
   * @param {Page} page - Playwright page object
   * @param {string} name - Screenshot name
   * @param {string} customCSS - CSS to inject
   */
  static async takeScreenshotWithCSS(page, name, customCSS = '') {
    console.log(`🎨 Taking screenshot with custom CSS: ${name}`);
    
    const defaultCSS = `
      * {
        /* Prevent shrinking */
        min-width: auto !important;
        /* Disable animations */
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
      
      /* Ensure consistent rendering */
      body {
        zoom: 1.0 !important;
        transform: none !important;
      }
      
      /* Fix common shrinking culprits */
      .container, .wrapper, .main {
        max-width: none !important;
        width: auto !important;
      }
    `;
    
    const finalCSS = customCSS || defaultCSS;
    
    try {
      // Inject CSS
      await page.addStyleTag({ content: finalCSS });
      
      // Wait for styles to apply
      await page.waitForTimeout(1000);
      
      await page.screenshot({
        path: `test-results/${name}-styled.png`,
        fullPage: true,
        type: 'png',
        animations: 'disabled'
      });
      
      console.log(`✅ Styled screenshot saved: ${name}`);
    } catch (error) {
      console.log(`❌ CSS screenshot failed: ${error.message}`);
      // Fallback to normal screenshot
      await this.takeHighQualityScreenshot(page, `${name}-fallback`);
    }
  }

  /**
   * Diagnose screenshot issues
   * @param {Page} page - Playwright page object
   */
  static async diagnoseScreenshotIssues(page) {
    console.log('\n🔍 SCREENSHOT DIAGNOSTIC REPORT');
    console.log('='.repeat(50));
    
    try {
      // Get viewport info
      const viewport = page.viewportSize();
      console.log(`📱 Viewport: ${viewport.width}x${viewport.height}`);
      
      // Get device pixel ratio
      const dpr = await page.evaluate(() => window.devicePixelRatio);
      console.log(`🔍 Device Pixel Ratio: ${dpr}`);
      
      // Get zoom level
      const zoom = await page.evaluate(() => document.body.style.zoom || '1');
      console.log(`🔍 CSS Zoom: ${zoom}`);
      
      // Get transform
      const transform = await page.evaluate(() => 
        window.getComputedStyle(document.body).transform
      );
      console.log(`🔍 Body Transform: ${transform}`);
      
      // Get page dimensions
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.body.scrollWidth,
        scrollHeight: document.body.scrollHeight,
        clientWidth: document.body.clientWidth,
        clientHeight: document.body.clientHeight,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      }));
      
      console.log(`📏 Page Dimensions:`, dimensions);
      
      // Check for common shrinking CSS
      const potentialIssues = await page.evaluate(() => {
        const body = document.body;
        const html = document.documentElement;
        
        return {
          bodyMaxWidth: window.getComputedStyle(body).maxWidth,
          bodyWidth: window.getComputedStyle(body).width,
          htmlMaxWidth: window.getComputedStyle(html).maxWidth,
          bodyMinWidth: window.getComputedStyle(body).minWidth,
          bodyTransform: window.getComputedStyle(body).transform,
          bodyScale: window.getComputedStyle(body).scale
        };
      });
      
      console.log(`⚠️ Potential Issues:`, potentialIssues);
      
    } catch (error) {
      console.log(`❌ Diagnostic failed: ${error.message}`);
    }
    
    console.log('='.repeat(50) + '\n');
  }
}

module.exports = ScreenshotHelpers;