import { sql } from './db.js'

// // Alterações nas tabelas
await sql`
    ALTER TABLE revenues
        ADD COLUMN IF NOT EXISTS institution UUID REFERENCES institutions(id)
`
await sql`
    ALTER TABLE sectors
        ADD COLUMN IF NOT EXISTS institution UUID REFERENCES institutions(id)
`
await sql`
    ALTER TABLE expenses
        ADD COLUMN IF NOT EXISTS institution UUID REFERENCES institutions(id)
`
await sql`
    ALTER TABLE cards
        ADD COLUMN IF NOT EXISTS institution UUID REFERENCES institutions(id)
`
await sql`
    ALTER TABLE members
        ADD COLUMN IF NOT EXISTS institution UUID REFERENCES institutions(id)
`
await sql`
    ALTER TABLE users
        ADD COLUMN IF NOT EXISTS institution UUID REFERENCES institutions(id)
`