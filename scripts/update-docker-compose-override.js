const fs = require('fs')
const path = require('path')
const mustache = require('mustache')

function updateDockerComposeOverride () {
  try {
    const servicesDir = path.join(__dirname, '../src/services')
    const overrideFile = path.join(__dirname, '../docker-compose.override.yaml')
    const templateFile = path.join(__dirname, '../templates/docker-compose.override.mustache')

    const serviceDirs = fs.readdirSync(servicesDir).filter(name => {
      const fullPath = path.join(servicesDir, name)
      // Exclude 'api-gateway' and only include directories
      return fs.statSync(fullPath).isDirectory() && name !== 'api-gateway'
    })

    const template = fs.readFileSync(templateFile, 'utf8')
    const output = mustache.render(template, {
      services: serviceDirs.map(name => ({ name }))
    })

    fs.writeFileSync(overrideFile, output, 'utf8')
    console.log(`✅ docker-compose.override.yaml updated with ${serviceDirs.length} service(s).`)
  } catch (err) {
    console.error('❌ Error updating docker-compose.override.yaml:', err)
  }
}

updateDockerComposeOverride()
module.exports = updateDockerComposeOverride
