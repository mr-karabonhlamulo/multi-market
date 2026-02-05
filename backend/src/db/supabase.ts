import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

// Mock Data Store
const mockDb: any = {
    users: [],
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
    ],
    orders: []
}

// Helper to simulate async response
const mockResponse = (data: any, error: any = null) =>
    Promise.resolve({ data, error })

// Helper to create a chainable mock object
const createChain = (table: string, data: any = null) => ({
    select: (columns: string = '*') => ({
        eq: (column: string, value: any) => {
            const filtered = (mockDb[table] || []).filter((r: any) => r[column] === value)
            return createChain(table, filtered)
        },
        single: () => {
            const result = Array.isArray(data) ? data[0] : data
            return mockResponse(result)
        },
        order: () => mockResponse(data || mockDb[table] || []),
        then: (cb: any) => cb({ data: data || (mockDb[table] || []), error: null }) // mimicking promise-like behavior
    }),
    insert: (row: any) => {
        if (mockDb[table]) {
            const newRow = { id: Math.random().toString(36).substring(7), ...row }
            mockDb[table].push(newRow)
            return mockResponse([newRow])
        }
        return mockResponse(null, 'Table not found')
    },
    update: (updates: any) => ({
        eq: (column: string, value: any) => {
            const rows = mockDb[table] || []
            const index = rows.findIndex((r: any) => r[column] === value)
            if (index !== -1) {
                rows[index] = { ...rows[index], ...updates }
                return mockResponse(rows[index])
            }
            return mockResponse(null, 'Record not found')
        }
    })
})

export const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : {
        from: (table: string) => createChain(table),
        auth: {
            signUp: (coords: any) => mockResponse({ user: { id: 'mock-user-id', ...coords } }),
            signInWithPassword: (coords: any) => mockResponse({ session: { access_token: 'mock-token' }, user: { id: 'mock-user-id' } })
        }
    }
