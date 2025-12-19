import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { sql } from 'drizzle-orm'

const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)
const db = drizzle(client)

async function main() {
  console.log('🗑️ Полная очистка базы данных...')

  try {
    // Удаляем схему public и создаем заново (самый быстрый способ сброса)
    // Если прав нет, удаляем таблицы по одной с CASCADE
    
    try {
        await db.execute(sql`DROP SCHEMA public CASCADE;`)
        await db.execute(sql`CREATE SCHEMA public;`)
        // Восстанавливаем права (обычно public имеет доступ)
        await db.execute(sql`GRANT ALL ON SCHEMA public TO public;`)
        await db.execute(sql`GRANT ALL ON SCHEMA public TO current_user;`)
        console.log('✅ Схема public пересоздана')
    } catch (e) {
        console.log('⚠️ Не удалось пересоздать схему (нет прав), удаляем таблицы вручную...')
        
        const tables = await db.execute(sql`
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname = 'public'
        `)

        for (const table of tables) {
            console.log(`Dropping table: ${table.tablename}`)
            await db.execute(sql.raw(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE`))
        }
        
        // Удаляем enum типы
        const enums = await db.execute(sql`
            SELECT t.typname
            FROM pg_type t
            JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
            WHERE n.nspname = 'public' AND t.typtype = 'e'
        `)
        
        for (const enumType of enums) {
            await db.execute(sql.raw(`DROP TYPE IF EXISTS "${enumType.typname}" CASCADE`))
        }
    }
    
    console.log('✅ База данных полностью очищена')
  } catch (error) {
    console.error('❌ Ошибка:', error)
  }

  process.exit(0)
}

main()
