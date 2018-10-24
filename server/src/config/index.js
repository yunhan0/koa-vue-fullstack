module.exports = {
  // Server port
  port: process.env.PORT || 3000,

  // MongoDB connection options
  mongo: {
    uri: process.env.DB_URI || 'mongodb://localhost/snapshot'
  },

  secret: {
    // Used for Jwt, default secret is randomly generated
    auth: process.env.AUTH_SECRET || 'EwIZ9MJWyJ'
  }
}
