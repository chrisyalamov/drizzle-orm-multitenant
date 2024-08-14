import { defineConfig } from 'drizzle-kit'

const connectionString = process.env.DB_URL
if (!connectionString) {
  throw new Error('DB_URL environment variable is required')
}

export default defineConfig({
  dialect: "postgresql",
  schema: "drizzle/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: connectionString
  }
})