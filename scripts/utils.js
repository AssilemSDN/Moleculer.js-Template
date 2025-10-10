const fs = require('fs').promises
const path = require('path')
const mustache = require('mustache')

const ROUTES_CONFIG_PATH = path.join(__dirname, '../src/config/routes.config.js')
let ROUTES_CONFIG = require(ROUTES_CONFIG_PATH)

async function updateRoutesConfig(serviceName, fileServiceName) {
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
    bodyParsers: { json: true }
  })

  const output = `module.exports = ${JSON.stringify(ROUTES_CONFIG, null, 2)}\n`
  await fs.writeFile(ROUTES_CONFIG_PATH, output, 'utf8')
}

async function getServiceDirs(servicesDir) {
  const dirs = await fs.readdir(servicesDir)
  const serviceDirs = []

  for (const name of dirs) {
    const fullPath = path.join(servicesDir, name)
    const stats = await fs.stat(fullPath)
    if (stats.isDirectory() && name !== 'api-gateway') {
      serviceDirs.push(name)
    }
  }

  return serviceDirs
}

async function updateDockerComposeOverride() {
  try {
    const servicesDir = path.join(__dirname, '../src/services')
    const overrideFile = path.join(__dirname, '../docker-compose.override.yaml')
    const templateFile = path.join(__dirname, '../templates/docker-compose.override.mustache')

    const serviceDirs = await getServiceDirs(servicesDir)
    const template = await fs.readFile(templateFile, 'utf8')
    const output = mustache.render(template, {
      services: serviceDirs.map(name => ({ name }))
    })

    // Write docker-compose.override.yaml
    await fs.writeFile(overrideFile, output, 'utf8')
    console.log(`✅ docker-compose.override.yaml updated with ${serviceDirs.length} service(s).`)
  } catch (err) {
    console.error('❌ Error updating docker-compose.override.yaml:', err)
  }
}

module.exports = { updateRoutesConfig, updateDockerComposeOverride }
