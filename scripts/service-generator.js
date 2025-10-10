const path = require('path')
const { updateRoutesConfig, updateDockerComposeOverride } = require('./utils')
const { ensureDirExists, readTemplate, renderTemplate, writeFile } = require('./helpers')

class ServiceGenerator {
  constructor(config) {
    this.config = config
    this.serviceName = config.serviceName
    this.fileServiceName = config.fileServiceName
    this.modelName = config.modelName
    this.fileModelName = config.fileModelName
    this.schemaName = config.schemaName
    this.collectionName = config.collectionName
    this.fields = config.fields || []
  }

  async generate() {
    try {
      await this.createServiceFiles()
      await this.updateRoutesAndDocker()
      console.log(`✅ Service and model for ${this.serviceName} created successfully.`)
    } catch (error) {
      console.error('❌ Error generating service:', error.message)
    }
  }

  async createServiceFiles() {
    const serviceData = {
      serviceName: this.serviceName,
      fileServiceName: this.fileServiceName,
      modelName: this.modelName,
      fileModelName: this.fileModelName,
      collectionName: this.collectionName
    }

    const modelData = {
      modelName: this.modelName,
      fileModelName: this.fileModelName,
      collectionName: this.collectionName,
      schemaName: this.schemaName,
      fields: this.fields.map(f => ({
        name: f.name,
        type: f.type || 'String',
        required: f.required || false,
        unique: f.unique || false,
        default: f.default || null
      }))
    }

    const serviceTemplate = await readTemplate('service')
    const modelTemplate = await readTemplate('model')

    const serviceContent = renderTemplate(serviceTemplate, serviceData)
    const modelContent = renderTemplate(modelTemplate, modelData)

    const servicePath = path.join(__dirname, `../src/services/${this.fileServiceName}`)
    const modelPath = path.join(__dirname, '../src/data/model')

    await ensureDirExists(servicePath)
    await ensureDirExists(modelPath)

    await writeFile(path.join(servicePath, `${this.fileServiceName}.service.js`), serviceContent)
    await writeFile(path.join(modelPath, `${this.fileModelName}.model.js`), modelContent)
  }

  async updateRoutesAndDocker() {
    await updateRoutesConfig(this.serviceName, this.fileServiceName)
    await updateDockerComposeOverride()
  }
}

module.exports = ServiceGenerator
