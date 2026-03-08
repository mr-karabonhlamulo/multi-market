import { Hono } from 'hono'
import db from '../db/sqlite'
import { processCommission } from '../services/commission'

const orders = new Hono()

orders.post('/', async (c) => {
    const { user_id, items } = await c.req.json()

    if (!items || items.length === 0) {
        return c.json({ error: 'No items in order' }, 400)
    }

    try {
        const currentUser = db.prepare('SELECT * FROM users WHERE id = ?').get(user_id) as any

        if (!currentUser) return c.json({ error: 'User not found' }, 404)

        const isPartner = currentUser.role === 'partner' || currentUser.role === 'admin'
        let totalAmount = 0

        for (const item of items) {
            const currentProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(item.product_id) as any

            if (!currentProduct) continue

            if (isPartner && item.quantity < currentProduct.moq) {
                return c.json({
                    error: `MOQ not met for ${currentProduct.name}. Minimum is ${currentProduct.moq}.`
                }, 400)
            }

            const price = isPartner ? currentProduct.wholesale_price : currentProduct.retail_price
            totalAmount += price * item.quantity
        }

        const id = Math.random().toString(36).substring(7)
        db.prepare(`
            INSERT INTO orders (id, user_id, status, total_amount)
            VALUES (?, ?, ?, ?)
        `).run(id, user_id, 'paid', totalAmount)

        const newOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as any

        await processCommission(newOrder.id, user_id, totalAmount)

        return c.json({ message: 'Order created successfully', order: newOrder })
    } catch (error: any) {
        return c.json({ error: error.message }, 500)
    }
})

export default orders
