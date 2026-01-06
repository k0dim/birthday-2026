#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('Checking for package-lock.json...');

if (!fs.existsSync('package-lock.json')) {
  console.log('package-lock.json not found, generating...');
  try {
    execSync('npm install --package-lock-only --no-audit', { stdio: 'inherit' });
    console.log('✅ package-lock.json generated successfully');
  } catch (error) {
    console.error('❌ Failed to generate package-lock.json:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ package-lock.json already exists');
}