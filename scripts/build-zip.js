/* ==========================================================================
   WitScraper Extension Packager (JS ZIP Builder)
   Purpose: Packages the 'extension/' folder to 'site/public/witscraper-extension.zip'
   Uses standard 'tar' (pre-installed on Windows 10/11) to avoid shell bugs
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\x1b[35m==================================================\x1b[0m');
console.log('\x1b[36m     WitScraper Extension Build & Package Engine\x1b[0m');
console.log('\x1b[35m==================================================\x1b[0m\n');

const sourceDir = 'extension';
const publicDir = path.join('site', 'public');
const zipName = path.join(publicDir, 'witscraper-extension.zip');

// 1. Verify source directory exists
if (!fs.existsSync(sourceDir)) {
  console.error('\x1b[31mError: Source directory "extension/" not found!\x1b[0m');
  process.exit(1);
}

// 2. Verify manifest.json exists inside extension/
const manifestPath = path.join(sourceDir, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('\x1b[31mError: "manifest.json" was not found inside the "extension/" directory!\x1b[0m');
  process.exit(1);
}

// 3. Clean up existing ZIP file
if (fs.existsSync(zipName)) {
  console.log('\x1b[33mFound existing package inside public assets. Cleaning up...\x1b[0m');
  try {
    fs.unlinkSync(zipName);
    console.log('\x1b[32m✓ Cleanup complete.\x1b[0m');
  } catch (err) {
    console.error(`\x1b[31mWarning: Could not remove old zip: ${err.message}\x1b[0m`);
  }
}

// Ensure site/public/ directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 4. Generate new ZIP file containing ONLY contents of extension/
console.log('\x1b[36mBundling and compressing extension files directly to public assets...\x1b[0m');

try {
  // Use built-in 'tar' utility (compatible with Windows 10/11 out-of-the-box)
  execSync(`tar -a -c -f "${zipName}" -C "${sourceDir}" .`, { stdio: 'inherit' });

  if (fs.existsSync(zipName)) {
    const stats = fs.statSync(zipName);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    console.log('\n\x1b[32m==================================================\x1b[0m');
    console.log('\x1b[32m🎉 SUCCESS: Extension packaged successfully!\x1b[0m');
    console.log(`\x1b[37m📦 Output Archive : ${zipName}\x1b[0m`);
    console.log(`\x1b[37m⚖️ Archive Size    : ${sizeKB} KB\x1b[0m`);
    console.log('\x1b[32m==================================================\x1b[0m\n');
  } else {
    throw new Error('ZIP file was not created.');
  }
} catch (err) {
  console.error(`\n\x1b[31m❌ Error packaging extension: ${err.message}\x1b[0m\n`);
  process.exit(1);
}
