#!/usr/bin/env node
const util = require('util');
const path = require('path');
const fs = require('fs');

// Unility Functions
const exec = util.promisify(require('child_process').exec);

// To execute a command
const exeCommand = async (command) => {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout, stderr);
  } catch (error) {
    console.log(error);
  }
};

const processInput = () => {
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
};

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

const removeFiles = (files) => {
  for (let file of files) {
    fs.unlinkSync(path.join(appPath, file));
  }
};

const cloneRepo = async () => {
  console.log(`Downloading files from repo ${repo}`);
  await exeCommand(`git clone --depth 1 ${repo} ${folderName}`);
  console.log('GitHub repository cloned successfully.');
};

const installDependencies = async () => {
  // Changing the base directory
  process.chdir(appPath);

  // Install dependencies
  console.log('Installing the dependencies 🚀🚀🚀');
  await exeCommand('npm install');
  console.log('Dependencies has been installed successfully.');
};

const installComplete = () => {
  console.log('Installation is now complete! 🥂');
  console.log(`cd ${folderName}`);
};

const removeDirectory = async (derectories) => {
  derectories.forEach(async (directory) => {
    if (Array.isArray(derectories)) {
      const { path: directoryPath = appPath, name: directoryName } = directory;
      await exeCommand(`npx rimraf ${directoryPath}${directoryName}`);
    } else {
      return Promise.reject('please provide array of directories');
    }
  });
};

const copyFilesFromAsset = () => {
  const files = ['.env'];
  files.forEach((file) => {
    fs.copyFileSync(path.join(`${appPath}/assets`, file), path.join(appPath, file));
  });
};

const main = async () => {
  // Clone the main repository from github.com
  await cloneRepo();

  // Install Dependencies
  if (!skipInstall) {
    await installDependencies();
  }

  // Delete .git folder
  await removeDirectory([{ name: '.git' }, { name: 'assets' }]);

  // Copy files from asset folder
  copyFilesFromAsset();

  // Remove development files
  const files = ['index.js'];
  removeFiles(files);

  // Install complete message
  installComplete();
};

// Running the main function to execute the scripts
main();
