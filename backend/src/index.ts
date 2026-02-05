import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', logger())
app.use('*', cors())

app.get('/', (c) => {
    return c.json({ message: 'Partner Commerce Platform API' })
})

import auth from './routes/auth'
import products from './routes/products'
import orders from './routes/orders'

app.route('/auth', auth)
app.route('/products', products)
app.route('/orders', orders)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
