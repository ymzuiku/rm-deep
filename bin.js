#!/usr/bin/env node
const fs = require("fs-extra");
const { resolve } = require("path");
const argv = process.argv.splice(2);

let dirNames = new Set();

for (let i = 0; i < argv.length; i++) {
  const v = argv[i];
  if (v) {
    dirNames.add(v);
  }
}

const pwd = (...args) => resolve(process.cwd(), ...args);

function readAndRemoveNodeModules(path) {
  if (dirNames.size === 0) {
    console.log("[error] Need input file or dir names.");
    return;
  }
  const dirs = fs.readdirSync(path);
  dirs.forEach((f) => {
    const np = resolve(path, f);

    if (dirNames.has(f)) {
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
