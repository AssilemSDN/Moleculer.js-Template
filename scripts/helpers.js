const fs = require('fs').promises
const path = require('path')
const Mustache = require('mustache')

// Read mustach template
async function readTemplate(templateName) {
  const templatePath = path.join(__dirname, '../templates', `${templateName}.template.mustache`)
  return await fs.readFile(templatePath, 'utf8')
}

async function ensureDirExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  } catch (error) {
    console.error(`❌ Error creating directory: ${dirPath}`, error)
  }
}


function renderTemplate(template, data) {
  return Mustache.render(template, data)
}

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf8')
  } catch (error) {
    console.error(`❌ Error writing to file: ${filePath}`, error)
  }
}

module.exports = { readTemplate, ensureDirExists, renderTemplate, writeFile }
