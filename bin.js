#!/usr/bin/env node
const fs = require("fs-extra");
const { resolve } = require("path");
const argv = process.argv.splice(2);

let dirName = "node_modules";

for (let i = 0; i < argv.length; i++) {
  const v = argv[i];
  if (v === "--dir") {
    dirName = argv[i + 1];
  }
}

const pwd = (...args) => resolve(process.cwd(), ...args);

function readAndRemoveNodeModules(path) {
  const dirs = fs.readdirSync(path);
  dirs.forEach((f) => {
    const np = resolve(path, f);

    if (f === dirName) {
      fs.removeSync(np);
      console.log("removed: ", np);
    } else if (fs.existsSync(np)) {
      const stat = fs.statSync(np);
      if (stat && stat.isDirectory()) {
        readAndRemoveNodeModules(np);
      }
    }
  });
}

readAndRemoveNodeModules(pwd("./"));

console.log("DONE!");
