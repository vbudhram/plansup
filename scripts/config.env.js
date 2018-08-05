#!/user/bin/env node
"use strict"

const path = require("path");
const process = require("process");

const fs = require('fs');
const npmConfigJson = JSON.parse(process.env.npm_config_argv).original;

let env;
if (npmConfigJson.indexOf('--prod') > -1) {
  env = 'prod';
} else if (npmConfigJson.indexOf('--dev') > -1) {
  env = 'dev';
} else {
  // no arguments, use the actual config.ts
  return;
}

let envVars;

try {
  const configPath = path.join(__dirname, '../../', env + '.json')
  console.log('using config @ ' + configPath)
  envVars = require(configPath);
} catch (e) {
  envVars = {};
}

const ENV = Object.assign(envVars, {
  environment: JSON.stringify(env)
});

const content = fs.readFileSync('./src/providers/config/config.ts.template');
const contentReplace = content.toString()
  .replace(/ENV.firebase.apiKey/, ENV.firebase.apiKey)
  .replace(/ENV.firebase.authDomain/, ENV.firebase.authDomain)
  .replace(/ENV.firebase.databaseURL/, ENV.firebase.databaseURL)
  .replace(/ENV.firebase.storageBucket/, ENV.firebase.storageBucket)
  .replace(/ENV.firebase.messagingSenderId/, ENV.firebase.storageBucket);
const wstream = fs.createWriteStream('./src/providers/config/config.ts');
wstream.write(contentReplace);
wstream.end();
