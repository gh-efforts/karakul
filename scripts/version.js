const fs = require('fs')
const path = require('path')

function writeVersion() {
  try {
    fs.writeFileSync(
      path.resolve(path.join(__dirname, '../version.js')),
      `module.exports='${new Date().toLocaleString()}'`
    )
  } catch (e) {
    return false
  }
  return true
}

writeVersion()
