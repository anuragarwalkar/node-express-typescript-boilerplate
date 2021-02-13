#!/usr/bin/env node
const util = require('util');
const path = require('path');
const fs = require('fs');

// Unility Functions
const exec = util.promisify(require('child_process').exec);
async function exeCommand(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout, stderr);
  } catch {
    (error) => {
      console.error(error);
    };
  }
}

function processInput() {
  // Validate arguments
  if (process.argv.length < 3) {
    console.log('Please enter a valid project name');
    console.log('npx create-nodejs-typescript-app {projectName}');
    process.exit(1);
  }

  const object = {};
  const argvLength = process.argv.length;
  for (let i = 1; i < argvLength; i++) {
    if (process.argv[i].startsWith('--skip-install')) {
      object.skipInstall = true;
    } else {
      object.folderName = process.argv[i];
    }
  }

  return object;
}

const basePath = process.cwd();
const { folderName, skipInstall = false } = processInput();
const appPath = path.join(basePath, folderName);
const repo = 'https://github.com/anuragarwalkar/node-express-typescript-boilerplate.git';

try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log('Directory already exists. Please choose another name for the project.');
  } else {
    console.log(error);
  }
  process.exit(1);
}

function removeFiles(files) {
  for (let file of files) {
    fs.unlinkSync(path.join(appPath, file));
  }
}

async function cloneRepo() {
  console.log(`Downloading files from repo ${repo}`);
  await exeCommand(`git clone --depth 1 ${repo} ${folderName}`);
  console.log('GitHub repository cloned successfully.');
}

async function installDependencies() {
  // Changing the base directory
  process.chdir(appPath);

  // Install dependencies
  console.log('Installing the dependencies 🚀🚀🚀');
  await exeCommand('npm install');
  console.log('Dependencies has been installed successfully.');
}

function installComplete() {
  console.log('Installation is now complete! 🥂');
  console.log(`cd ${folderName}`);
}

async function main() {
  // Clone the main repository from github.com
  await cloneRepo();

  // Install Dependencies
  if (!skipInstall) {
    await installDependencies();
  }

  // Delete .git folder
  await exeCommand('npx rimraf ./.git');

  // Remove development files
  const files = ['index.js'];
  removeFiles(files);

  // Install complete message
  installComplete();
}

// Running the main function to execute the scripts
main();
