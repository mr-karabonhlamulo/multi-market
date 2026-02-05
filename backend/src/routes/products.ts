import { Hono } from 'hono'
import { supabase } from '../db/supabase'

const products = new Hono()

products.get('/', async (c) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')

    if (error) {
        return c.json({ error: error.message }, 500)
    }

    return c.json(data)
})

products.get('/:id', async (c) => {
    const id = c.req.param('id')
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)

    if (error) {
        return c.json({ error: error.message }, 500)
    }

    if (!data || data.length === 0) {
        return c.json({ error: 'Product not found' }, 404)
    }

    return c.json(data[0])
})

export default products
