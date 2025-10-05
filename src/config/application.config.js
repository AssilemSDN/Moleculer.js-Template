require('dotenv').config()

// --- Moleculer variables ---
const APP_MOLECULER_API_HOSTNAME = process.env.APP_MOLECULER_API_HOSTNAME || '0.0.0.0'
const APP_MOLECULER_API_GATEWAY_PORT = process.env.APP_MOLECULER_API_GATEWAY_PORT || '5000'
const APP_MOLECULER_LOGGER = process.env.APP_MOLECULER_LOGGER === 'true'
const APP_MOLECULER_LOG_LEVEL = process.env.APP_MOLECULER_LOG_LEVEL || 'info'
const APP_MOLECULER_ENVIRONMENT = process.env.APP_MOLECULER_ENVIRONMENT || 'development'
// --- Transporter variables --
const APP_TRANSPORTER_TYPE = process.env.APP_TRANSPORTER_TYPE || 'nats'
const APP_TRANSPORTER_HOSTNAME = process.env.APP_TRANSPORTER_HOSTNAME
const APP_TRANSPORTER_PORT = process.env.APP_TRANSPORTER_PORT
const APP_TRANSPORTER_USERNAME = process.env.APP_TRANSPORTER_USERNAME
const APP_TRANSPORTER_PASSWORD = process.env.APP_TRANSPORTER_PASSWORD
// --- DB variables --
const APP_DB_HOSTNAME = process.env.APP_DB_HOSTNAME
const APP_DB_PORT = process.env.APP_DB_PORT
const APP_DB_USERNAME = process.env.APP_DB_USERNAME
const APP_DB_PASSWORD = process.env.APP_DB_PASSWORD

module.exports = {
  moleculer: {
    port: APP_MOLECULER_API_GATEWAY_PORT,
    host: APP_MOLECULER_API_HOSTNAME,
    namespace: APP_MOLECULER_ENVIRONMENT,
    logger: APP_MOLECULER_LOGGER,
    logLevel: APP_MOLECULER_LOG_LEVEL,
    transporter: {
      type: APP_TRANSPORTER_TYPE,
      options: {
        url: `${APP_TRANSPORTER_TYPE}://${APP_TRANSPORTER_HOSTNAME}:${APP_TRANSPORTER_PORT}`,
        user: APP_TRANSPORTER_USERNAME,
        pass: APP_TRANSPORTER_PASSWORD
      }
    }
  },
  db: {
    port: APP_DB_PORT,
    host: APP_DB_HOSTNAME,
    url: `mongodb://${APP_DB_HOSTNAME}:${APP_DB_PORT}`,
    user: APP_DB_USERNAME,
    pass: APP_DB_PASSWORD
  }
}
