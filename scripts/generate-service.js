const fs = require('fs')
const path = require('path')
const Mustache = require('mustache')
const updateDockerComposeOverride = require('./update-docker-compose-override')

const ROUTES_CONFIG_PATH = path.join(__dirname, '../src/config/routes.config.js')
const ROUTES_CONFIG = require(ROUTES_CONFIG_PATH)

// -------------------------------
// Helpers
// -------------------------------

function readTemplate (templateName) {
  const templatePath = path.join(__dirname, '../templates', `${templateName}.template.mustache`)
  return fs.readFileSync(templatePath, 'utf8')
}

function ensureDirExists (dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function writeFile (filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8')
}

function renderTemplate (template, data) {
  return Mustache.render(template, data)
}

function updateRoutesConfig (serviceName, fileServiceName) {
  const apiPath = `/api/v1/${fileServiceName}`

  ROUTES_CONFIG.routes.push({
    path: apiPath,
    aliases: {
      'POST /': `${serviceName}.create`,
      'GET /': `${serviceName}.list`,
      'GET /:id': `${serviceName}.get`,
      'PUT /:id': `${serviceName}.update`,
      'DELETE /:id': `${serviceName}.remove`
    },
    bodyParsers: {
      json: true
    }
  })

  const output = 'module.exports = ' + JSON.stringify(ROUTES_CONFIG, null, 2) + '\n'
  writeFile(ROUTES_CONFIG_PATH, output)
}

// -------------------------------
// Main generator
// -------------------------------

/**
 * Generate a new CRUD service with its model
 * @param {Object} config
 * @param {string} config.serviceName       > Camel case service name
 * @param {string} config.serviceFileName   > Kebab case service name
 * @param {string} config.modelName         > Pascal case model name
 * @param {string} config.modelFileName     > Kebab case model file name
 * @param {string} config.schemaName        > Camel case schema name
 * @param {string} config.collectionName    > MongoDB collection name
 * @param {Array} config.fields             > Array of field definitions
 */
function generateService (config) {
  const {
    serviceName,
    fileServiceName,
    modelName,
    fileModelName,
    schemaName,
    collectionName,
    fields = []
  } = config

  // Prepare template data
  const serviceData = {
    serviceName,
    fileServiceName,
    modelName,
    fileModelName,
    collectionName
  }

  const modelData = {
    modelName,
    fileModelName,
    collectionName,
    schemaName,
    fields: fields.map(f => ({
      name: f.name,
      type: f.type || 'String',
      required: f.required || false,
      unique: f.unique || false,
      default: f.default || null
    }))
  }

  // Render templates
  const serviceTemplate = readTemplate('service')
  const modelTemplate = readTemplate('model')

  const serviceContent = renderTemplate(serviceTemplate, serviceData)
  const modelContent = renderTemplate(modelTemplate, modelData)

  // Create directories and write files
  const servicePath = path.join(__dirname, `../src/services/${fileServiceName}`)
  const modelPath = path.join(__dirname, '../src/data/model')

  ensureDirExists(servicePath)
  ensureDirExists(modelPath)

  writeFile(path.join(servicePath, `${fileServiceName}.service.js`), serviceContent)
  writeFile(path.join(modelPath, `${fileModelName}.model.js`), modelContent)

  // Update routes and Docker override
  updateRoutesConfig(serviceName, fileServiceName)
  updateDockerComposeOverride()

  console.log(`✅ Service created: ${path.join(servicePath, `${fileServiceName}.service.js`)}`)
  console.log(`✅ Model created: ${path.join(modelPath, `${fileModelName}.model.js`)}`)
  console.log(`📡 API endpoint: /api/v1/${fileServiceName}`)
}

// -------------------------------
// CLI usage
// -------------------------------

if (require.main === module) {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log('\n  ❌ Usage: node scripts/generate-service.js <config-file.json>\n')
    process.exit(1)
  }

  try {
    const configPath = args[0]
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    generateService(config)
  } catch (err) {
    console.error('❌ Error during service generator :', err.message)
    process.exit(1)
  }
}

module.exports = generateService
