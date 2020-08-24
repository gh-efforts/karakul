import { writeFileSync } from "fs";
import { resolve, join } from "path";

function writeVersion() {
  try {
    writeFileSync(
      resolve(join(__dirname, "../version.js")),
      `module.exports='${new Date().toLocaleString()}'`
    );
  } catch (e) {
    return false;
  }
  return true;
}

writeVersion();
