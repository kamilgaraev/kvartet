import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const connectionString = process.env.DATABASE_URL!

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const client = postgres(connectionString, { max: 1 })
const db = drizzle(client)

async function main() {
  console.log('🔄 Running migrations...')
  console.log(`📁 Migrations folder: ./drizzle`)
  
  try {
    await migrate(db, { migrationsFolder: './drizzle' })
    console.log('✅ Migrations completed successfully!')
    process.exit(0)
  } catch (error: any) {
    console.error('❌ Migration failed:')
    if (error.message) {
      console.error('   Message:', error.message)
    }
    if (error.code) {
      console.error('   Code:', error.code)
    }
    console.error('   Full error:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()

