import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

// Mock Data Store
const mockDb = {
    users: [] as any[],
    products: [
        {
            id: '1',
            name: 'Midnight Rose',
            description: 'A deep, mysterious floral scent.',
            retail_price: 1200,
            wholesale_price: 800,
            moq: 5,
            image_url: 'https://via.placeholder.com/300'
        },
        {
            id: '2',
            name: 'Ocean Breeze',
            description: 'Fresh and aquatic notes.',
            retail_price: 1000,
            wholesale_price: 650,
            moq: 5,
            image_url: 'https://via.placeholder.com/300'
        }
    ] as any[],
    orders: [] as any[]
}

export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : {
        from: (table: string) => ({
            select: (columns: string = '*') => ({
                eq: (column: string, value: any) => {
                    // Simple mock implementation for select
                    const data = (mockDb as any)[table]?.filter((row: any) => row[column] === value) || []
                    return Promise.resolve({ data, error: null })
                },
                order: () => Promise.resolve({ data: (mockDb as any)[table] || [], error: null }),
                then: (cb: any) => cb({ data: (mockDb as any)[table] || [], error: null })
            }),
            insert: (row: any) => {
                if ((mockDb as any)[table]) {
                    const newRow = { id: Math.random().toString(36).substring(7), ...row }
                        ; (mockDb as any)[table].push(newRow)
                    return Promise.resolve({ data: [newRow], error: null })
                }
                return Promise.resolve({ data: null, error: 'Table not found' })
            }
        }),
        auth: {
            signUp: (coords: any) => Promise.resolve({ data: { user: { id: 'mock-user-id', ...coords } }, error: null }),
            signInWithPassword: (coords: any) => Promise.resolve({ data: { session: { access_token: 'mock-token' }, user: { id: 'mock-user-id' } }, error: null })
        }
    }
