import { Hono } from 'hono'
import { supabase } from '../db/supabase'

const auth = new Hono()

auth.post('/register', async (c) => {
    const { email, password, full_name, referrer_id } = await c.req.json()

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        return c.json({ error: error.message }, 400)
    }

    // Create user profile in mock DB (or real DB via trigger usually, but manual here for consistency)
    if (data.user) {
        await supabase.from('users').insert({
            id: data.user.id,
            email,
            full_name,
            referrer_id,
            role: 'partner', // Default to partner for this platform
            rank: 'bronze',
            wallet_balance: 0,
            team_size: 0
        })
    }

    return c.json({ message: 'Registration successful', user: data.user })
})

auth.post('/login', async (c) => {
    const { email, password } = await c.req.json()

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return c.json({ error: error.message }, 401)
    }

    return c.json({ session: data.session, user: data.user })
})

export default auth
