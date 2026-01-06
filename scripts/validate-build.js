#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('Validating build...');

// Проверяем наличие package.json
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Проверяем наличие скрипта build
if (!packageJson.scripts || !packageJson.scripts.build) {
  console.log('⚠️ No build script found in package.json');
  
  // Проверяем наличие dist директории
  if (fs.existsSync('dist') && fs.existsSync(path.join('dist', 'index.html'))) {
    console.log('✅ dist directory exists with index.html');
    process.exit(0);
  } else {
    console.error('❌ No build script and no dist directory found');
    process.exit(1);
  }
}

console.log('✅ Build script found:', packageJson.scripts.build);