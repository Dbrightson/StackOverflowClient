  const config = {
  jwtSecret: process.env.JWT_SECRET || "test",
  mongoUri:
    process.env.CONNECTION_URL
      ||
    'mongodb://localhost:27017/stackoverflowclone'
}
export default config