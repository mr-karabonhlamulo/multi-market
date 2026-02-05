import { Hono } from 'hono'
import { supabase } from '../db/supabase'
import { processCommission } from '../services/commission'

const orders = new Hono()

orders.post('/', async (c) => {
    const { user_id, items } = await c.req.json()
    // items: [{ product_id, quantity }]

    if (!items || items.length === 0) {
        return c.json({ error: 'No items in order' }, 400)
    }

    // 1. Verify User Role (for Wholesale Check)
    const { data: user } = await supabase.from('users').select('*').eq('id', user_id)
    const currentUser = Array.isArray(user) ? user[0] : user

    if (!currentUser) return c.json({ error: 'User not found' }, 404)

    const isPartner = currentUser.role === 'partner' || currentUser.role === 'admin'
    let totalAmount = 0

    // 2. Process Items & Calculate Total
    for (const item of items) {
        const { data: product } = await supabase.from('products').select('*').eq('id', item.product_id)
        const currentProduct = Array.isArray(product) ? product[0] : product

        if (!currentProduct) continue

        // MOQ Check for Partners
        if (isPartner && item.quantity < currentProduct.moq) {
            return c.json({
                error: `MOQ not met for ${currentProduct.name}. Minimum is ${currentProduct.moq}.`
            }, 400)
        }

        const price = isPartner ? currentProduct.wholesale_price : currentProduct.retail_price
        totalAmount += price * item.quantity
    }

    // 3. Create Order
    const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id,
            total_amount: totalAmount,
            status: 'paid', // Simulating payment
            is_wholesale: isPartner
        })
    // Mock insert returns array
    const newOrder = orderData ? orderData[0] : null

    if (orderError) return c.json({ error: orderError.message }, 500)

    // 4. Process Commission (Async)
    // We don't await this to keep response fast, or we can await.
    if (newOrder) {
        // Mock ID generation might need to be ensured in supabase.ts if not robust
        await processCommission(newOrder.id, user_id, totalAmount)
    }

    return c.json({ message: 'Order created successfully', order: newOrder })
})

export default orders
