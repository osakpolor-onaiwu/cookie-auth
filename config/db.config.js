const dbConfig = {
  mongoUri: process.env.mongooseURI || 'mongodb://127.0.0.1/cookie-auth',
  config: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000
  },
};

module.exports = dbConfig;