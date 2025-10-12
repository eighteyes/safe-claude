#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get the actual safe-claude bash script path
const scriptPath = path.resolve(__dirname, '..', 'safe-claude');

// Check if script exists
if (!fs.existsSync(scriptPath)) {
  console.error('Error: safe-claude script not found at:', scriptPath);
  console.error('Please reinstall the package.');
  process.exit(1);
}

// Pass through all arguments to the bash script
const args = process.argv.slice(2);

// Spawn the bash script with inherited stdio to preserve interactivity
const child = spawn('/bin/bash', [scriptPath, ...args], {
  stdio: 'inherit',
  env: { ...process.env },
  shell: false
});

// Handle exit
child.on('exit', (code) => {
  process.exit(code || 0);
});

// Handle errors
child.on('error', (err) => {
  console.error('Failed to run safe-claude:', err.message);
  process.exit(1);
});