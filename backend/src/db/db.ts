import { createClient, SupabaseClient } from '@supabase/supabase-js'
import Database from 'better-sqlite3'
import path from 'path'

export interface DBAdapter {
    query<T>(sql: string, params?: any[]): Promise<T[]>
    get<T>(sql: string, params?: any[]): Promise<T | undefined>
    run(sql: string, params?: any[]): Promise<{ lastInsertRowid: string | number }>
}

class SQLiteAdapter implements DBAdapter {
    private db: any
    constructor() {
        const isProduction = process.env.NODE_ENV === 'production';
        const dbPath = isProduction ? path.join('/tmp', 'database.sqlite') : path.resolve(process.cwd(), 'database.sqlite');
        this.db = new Database(dbPath)
        this.db.pragma('journal_mode = WAL')
    }

    async query<T>(sql: string, params: any[] = []): Promise<T[]> {
        return this.db.prepare(sql).all(...params) as T[]
    }

    async get<T>(sql: string, params: any[] = []): Promise<T | undefined> {
        return this.db.prepare(sql).get(...params) as T | undefined
    }

    async run(sql: string, params: any[] = []): Promise<{ lastInsertRowid: string | number }> {
        const info = this.db.prepare(sql).run(...params)
        return { lastInsertRowid: info.lastInsertRowid }
    }
}

class SupabaseAdapter implements DBAdapter {
    private client: SupabaseClient
    constructor(url: string, key: string) {
        this.client = createClient(url, key)
    }

    // This is a naive translation layer; usually we'd use cleaner Supabase syntax.
    // For now we'll stick to raw SQL via Supabase RPC or just use Supabase direct API for common cases.
    // Actually, Supabase works best with its own query builder.
    // Let's implement a very simple version.

    async query<T>(sql: string, params: any[] = []): Promise<T[]> {
        // Mocking for now - ideally we'd use proper Supabase client methods in routes
        // This adapter is to maintain compatibility while shifting
        throw new Error('Supabase requires using the Supabase client directly for efficiency')
    }

    async get<T>(sql: string, params: any[] = []): Promise<T | undefined> {
        throw new Error('Supabase requires using the Supabase client directly for efficiency')
    }

    async run(sql: string, params: any[] = []): Promise<{ lastInsertRowid: string | number }> {
        throw new Error('Supabase requires using the Supabase client directly for efficiency')
    }
}

// Let's create a more practical approach: Export a unified client that handles the branching logic
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

let db: any

if (supabaseUrl && supabaseKey) {
    db = createClient(supabaseUrl, supabaseKey)
} else {
    // Falls back to SQLite if no Supabase credentials found
    const isProd = process.env.NODE_ENV === 'production';
    const dbPath = isProd ? path.join('/tmp', 'database.sqlite') : path.resolve(process.cwd(), 'database.sqlite');
    const sqlite = new Database(dbPath)
    sqlite.pragma('journal_mode = WAL')
    db = sqlite
}

export default db
