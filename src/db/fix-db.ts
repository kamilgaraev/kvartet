import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { sql } from 'drizzle-orm'

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)
const db = drizzle(client)

async function main() {
  console.log('🔧 Исправление схемы базы данных...')

  try {
    await db.execute(sql`ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "password" text;`)
    console.log('✅ Колонка password успешно добавлена (если её не было)')
  } catch (error) {
    console.error('❌ Ошибка при добавлении колонки:', error)
  }

  process.exit(0)
}

main()



