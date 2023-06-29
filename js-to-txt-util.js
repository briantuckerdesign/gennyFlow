// post-build.js
const fs = require("fs");
const path = require("path");

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, "package.json"), "utf8"));

// Form new filename
const newFileName = `${packageJson.name}-${packageJson.version}.txt`;

// Read main.js
const mainJsContent = fs.readFileSync(path.resolve(__dirname, "dist", "main.js"), "utf8");

// Write the content of main.js into new txt file
fs.writeFileSync(path.resolve(__dirname, "dist", newFileName), mainJsContent);

console.log(`Created ${newFileName}`);
