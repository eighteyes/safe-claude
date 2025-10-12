#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Setting up safe-claude...');

// Get the installation directory
const installDir = path.resolve(__dirname, '..');
const scriptPath = path.join(installDir, 'safe-claude');
const binPath = path.join(installDir, 'bin', 'safe-claude.js');

// Check if Docker is installed
try {
  execSync('docker --version', { stdio: 'ignore' });
  console.log('✓ Docker detected');
} catch (error) {
  console.error('⚠️  Docker not found! Please install Docker first:');
  console.error('   Visit: https://docs.docker.com/get-docker/');
  process.exit(1);
}

// Make the bash script executable
try {
  fs.chmodSync(scriptPath, '755');
  console.log('✓ Made safe-claude script executable');
} catch (error) {
  console.error('Warning: Could not make script executable:', error.message);
}

// Check for global vs local installation
const isGlobal = process.env.npm_config_global === 'true' ||
                 process.env.npm_config_global === true ||
                 installDir.includes('npm/lib/node_modules');

if (isGlobal) {
  console.log('\n✅ Safe Claude installed globally!');
  console.log('   You can now use: safe-claude');
} else {
  console.log('\n✅ Safe Claude installed locally!');
  console.log('   You can now use: npx safe-claude');
  console.log('   Or add to PATH: export PATH="$PATH:' + path.join(installDir, 'bin') + '"');
}

console.log('\nQuick Start:');
console.log('  1. Run "safe-claude" in your project directory');
console.log('  2. Authenticate with Claude Code when prompted');
console.log('  3. Run "safe-claude --save" to persist your login');
console.log('\nFor help: safe-claude --help');