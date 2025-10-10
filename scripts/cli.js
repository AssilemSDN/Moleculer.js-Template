const fs = require('fs').promises
const ServiceGenerator = require('./service-generator')

async function generateService(configFilePath) {
  try {
    // Parse config file
    const config = await fs.readFile(configFilePath, 'utf8')
    const parsedConfig = JSON.parse(config)

    if (!parsedConfig.serviceName || !parsedConfig.modelName) {
      throw new Error('❌ Missing required fields in the configuration file.')
    }
    // Create the generator
    const generator = new ServiceGenerator(parsedConfig)

    // Start the generation
    await generator.generate()
    await generator.updateRoutesAndDocker()
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

// If it's executed by CLI
if (require.main === module) {
  const args = process.argv.slice(2)
  if (args.length < 1) {
    console.log('❌ Usage: cli.js <config-file.json>')
    process.exit(1)
  }

  const configFilePath = args[0]
  generateService(configFilePath)
}

// Exporter la fonction pour utilisation dans d'autres fichiers
module.exports = { generateService }
