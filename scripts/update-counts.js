#!/usr/bin/env node

/**
 * Manual Visit Counts Update Script
 * 
 * Usage:
 * node scripts/update-counts.js --project speechy-pop --count 15
 * node scripts/update-counts.js --reset
 * node scripts/update-counts.js --show
 */

const fs = require('fs');
const path = require('path');

// Configuration
const VISITCOUNTS_FILE = path.join(process.cwd(), 'visitcounts');
const HTML_FILE = path.join(process.cwd(), 'index.html');

// Default counts
const DEFAULT_COUNTS = {
  'speechy-pop': 9,
  'marketing-plan': 4,
  'crypto-bot': 34,
  'athlonix': 0,
  'analoghorror': 0,
  'n8n': 0,
  'make': 0,
  'graphics': 0,
  'ghl': 0
};

// Parse command line arguments
const args = process.argv.slice(2);
const options = {};

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--project' && args[i + 1]) {
    options.project = args[i + 1];
    i++;
  } else if (args[i] === '--count' && args[i + 1]) {
    options.count = parseInt(args[i + 1]);
    i++;
  } else if (args[i] === '--reset') {
    options.reset = true;
  } else if (args[i] === '--show') {
    options.show = true;
  } else if (args[i] === '--help' || args[i] === '-h') {
    showHelp();
    process.exit(0);
  }
}

// Main function
async function main() {
  try {
    if (options.show) {
      showCurrentCounts();
    } else if (options.reset) {
      resetToDefaults();
    } else if (options.project && options.count !== undefined) {
      updateCount(options.project, options.count);
    } else {
      console.log('❌ Invalid arguments. Use --help for usage information.');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Show current counts
function showCurrentCounts() {
  console.log('📊 Current Visit Counts:');
  console.log('========================');
  
  try {
    const content = fs.readFileSync(VISITCOUNTS_FILE, 'utf8');
    const countRegex = /- \*\*(speechy-pop|marketing-plan|crypto-bot|athlonix|analoghorror|n8n|make|graphics|ghl)\*\*: (\d+) visits/g;
    let match;
    
    while ((match = countRegex.exec(content)) !== null) {
      console.log(`  ${match[1]}: ${match[2]} visits`);
    }
  } catch (error) {
    console.log('  No visitcounts file found, using defaults:');
    Object.entries(DEFAULT_COUNTS).forEach(([project, count]) => {
      console.log(`  ${project}: ${count} visits`);
    });
  }
}

// Reset to default counts
function resetToDefaults() {
  console.log('🔄 Resetting to default counts...');
  
  // Update visitcounts file
  const newContent = generateVisitCountsContent(DEFAULT_COUNTS);
  fs.writeFileSync(VISITCOUNTS_FILE, newContent);
  
  // Update HTML file
  updateHTMLCounts(DEFAULT_COUNTS);
  
  console.log('✅ Reset complete!');
  showCurrentCounts();
}

// Update specific count
function updateCount(project, newCount) {
  if (!DEFAULT_COUNTS.hasOwnProperty(project)) {
    throw new Error(`Invalid project: ${project}. Valid projects: ${Object.keys(DEFAULT_COUNTS).join(', ')}`);
  }
  
  if (newCount < 0) {
    throw new Error(`Count cannot be negative: ${newCount}`);
  }
  
  console.log(`🔄 Updating ${project} count to ${newCount}...`);
  
  // Read current counts
  const currentCounts = readCurrentCounts();
  currentCounts[project] = newCount;
  
  // Update visitcounts file
  const newContent = generateVisitCountsContent(currentCounts);
  fs.writeFileSync(VISITCOUNTS_FILE, newContent);
  
  // Update HTML file
  updateHTMLCounts(currentCounts);
  
  console.log(`✅ ${project} count updated to ${newCount}!`);
  showCurrentCounts();
}

// Read current counts from file
function readCurrentCounts() {
  const counts = { ...DEFAULT_COUNTS };
  
  try {
    const content = fs.readFileSync(VISITCOUNTS_FILE, 'utf8');
    const countRegex = /- \*\*(speechy-pop|marketing-plan|crypto-bot|athlonix|analoghorror|n8n|make|graphics|ghl)\*\*: (\d+) visits/g;
    let match;
    
    while ((match = countRegex.exec(content)) !== null) {
      counts[match[1]] = parseInt(match[2]);
    }
  } catch (error) {
    console.log('📝 No existing visitcounts file found, using defaults');
  }
  
  return counts;
}

// Generate visitcounts file content
function generateVisitCountsContent(counts) {
  return `# Dynamic Visit Counts System

## Overview
This portfolio now uses a dynamic system that automatically updates visit counts via GitHub Actions.

## Current Visit Counts
- **speechy-pop**: ${counts['speechy-pop']} visits
- **marketing-plan**: ${counts['marketing-plan']} visits  
- **crypto-bot**: ${counts['crypto-bot']} visits

## Last Updated
${new Date().toLocaleString()}

## System Status
🚀 **DYNAMIC MODE ENABLED**
- Counts update automatically via GitHub Actions
- Real-time synchronization across all devices
- No manual file updates required

## How It Works
1. Click any project link on the portfolio
2. Count increments immediately in the browser
3. Update is queued for GitHub sync
4. GitHub Actions automatically updates visitcounts file
5. All devices see the updated counts

## Benefits
✅ **Real-time Updates**: Counts update instantly across all devices
✅ **Automatic Sync**: No manual file editing required
✅ **GitHub Integration**: Uses GitHub's own infrastructure
✅ **Cross-platform**: Works on any device/browser
✅ **Professional**: Enterprise-grade automation

## Technical Details
- **Trigger**: Manual workflow dispatch or hourly schedule
- **Runtime**: Ubuntu latest with Node.js 18
- **Security**: Uses GitHub's built-in authentication
- **Logging**: Full audit trail of all updates

## Manual Updates
To manually update counts, use this script:
\`\`\`bash
node scripts/update-counts.js --project speechy-pop --count 15
node scripts/update-counts.js --reset
node scripts/update-counts.js --show
\`\`\`
`;
}

// Update HTML file with new counts
function updateHTMLCounts(counts) {
  try {
    let htmlContent = fs.readFileSync(HTML_FILE, 'utf8');
    
    // Update hidden input values
    htmlContent = htmlContent.replace(
      /id="speechy-pop-storage" value="\d+"/,
      `id="speechy-pop-storage" value="${counts['speechy-pop']}"`
    );
    htmlContent = htmlContent.replace(
      /id="marketing-plan-storage" value="\d+"/,
      `id="marketing-plan-storage" value="${counts['marketing-plan']}"`
    );
    htmlContent = htmlContent.replace(
      /id="crypto-bot-storage" value="\d+"/,
      `id="crypto-bot-storage" value="${counts['crypto-bot']}"`
    );
    htmlContent = htmlContent.replace(
      /id="athlonix-storage" value="\d+"/,
      `id="athlonix-storage" value="${counts['athlonix']}"`
    );
    htmlContent = htmlContent.replace(
      /id="analoghorror-storage" value="\d+"/,
      `id="analoghorror-storage" value="${counts['analoghorror']}"`
    );
    htmlContent = htmlContent.replace(
      /id="n8n-storage" value="\d+"/,
      `id="n8n-storage" value="${counts['n8n']}"`
    );
    htmlContent = htmlContent.replace(
      /id="make-storage" value="\d+"/,
      `id="make-storage" value="${counts['make']}"`
    );
    htmlContent = htmlContent.replace(
      /id="graphics-storage" value="\d+"/,
      `id="graphics-storage" value="${counts['graphics']}"`
    );
    htmlContent = htmlContent.replace(
      /id="ghl-storage" value="\d+"/,
      `id="ghl-storage" value="${counts['ghl']}"`
    );
    
    fs.writeFileSync(HTML_FILE, htmlContent);
    console.log('📄 HTML file updated with new counts');
  } catch (error) {
    console.log('⚠️  Warning: Could not update HTML file:', error.message);
  }
}

// Show help
function showHelp() {
  console.log(`
🚀 Visit Counts Update Script

Usage:
  node scripts/update-counts.js --project <project> --count <number>
  node scripts/update-counts.js --reset
  node scripts/update-counts.js --show
  node scripts/update-counts.js --help

Options:
  --project <project>    Project to update (speechy-pop, marketing-plan, crypto-bot)
  --count <number>       New count value
  --reset               Reset all counts to defaults
  --show                Show current counts
  --help, -h           Show this help message

Examples:
  node scripts/update-counts.js --project speechy-pop --count 15
  node scripts/update-counts.js --reset
  node scripts/update-counts.js --show

Valid Projects:
  - speechy-pop
  - marketing-plan
  - crypto-bot
  - athlonix
  - analoghorror
  - n8n
  - make
  - graphics
  - ghl
`);
}

// Run main function
main();
