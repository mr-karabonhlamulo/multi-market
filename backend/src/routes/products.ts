import { Hono } from 'hono'
import db from '../db/sqlite'

const products = new Hono()

products.get('/', async (c) => {
    try {
        const data = db.prepare('SELECT * FROM products').all()
        return c.json(data)
    } catch (error: any) {
        return c.json({ error: error.message }, 500)
    }
})

products.get('/:id', async (c) => {
    const id = c.req.param('id')
    try {
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id)
        if (!product) {
            return c.json({ error: 'Product not found' }, 404)
        }
        return c.json(product)
    } catch (error: any) {
        return c.json({ error: error.message }, 500)
    }
})

export default products
