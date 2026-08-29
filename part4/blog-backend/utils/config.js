require('dotenv').config()

const PORT = process.env.PORT || 3003
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_PROTOCOL = process.env.DB_PROTOCOL
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_APP_NAME = process.env.DB_APP_NAME
const MONGO_DB_URI = `${DB_PROTOCOL}${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_APP_NAME}`

module.exports = {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_PROTOCOL,
  DB_HOST,
  DB_NAME,
  DB_APP_NAME,
  MONGO_DB_URI
}
