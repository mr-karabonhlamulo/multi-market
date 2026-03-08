import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import auth from './routes/auth'
import products from './routes/products'
import orders from './routes/orders'

const app = new Hono().basePath('/api')

app.use('*', logger())
app.use('*', cors())

app.get('/', (c) => {
    return c.json({
        message: 'Partner Commerce Platform API',
        database: process.env.SUPABASE_URL ? 'Supabase' : 'SQLite',
        env: process.env.NODE_ENV
    })
})

app.route('/auth', auth)
app.route('/products', products)
app.route('/orders', orders)

app.notFound((c) => {
    console.error(`API 404: ${c.req.method} ${c.req.url}`)
    return c.json({ error: `Not Found: ${c.req.path}` }, 404)
})

export default app
