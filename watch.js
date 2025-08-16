#!/usr/bin/env node

const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

console.log("🔍 Watching styles.gss for changes...");
console.log("Press Ctrl+C to stop");

// Watch the GSS file for changes
fs.watchFile("styles.gss", { interval: 100 }, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    console.log("\n📝 styles.gss changed, rebuilding...");

    exec("./build.sh", (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Build failed:");
        console.error(stderr);
      } else {
        console.log("✅ Build successful!");
        console.log(stdout);
      }
      console.log("🔍 Watching for changes...");
    });
  }
});

// Keep the process alive
process.on("SIGINT", () => {
  console.log("\n👋 Stopping file watcher...");
  process.exit(0);
});
