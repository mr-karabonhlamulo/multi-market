import { Hono } from 'hono'
import db from '../db/sqlite'

const auth = new Hono()

auth.post('/register', async (c) => {
    const { email, password, full_name, referrer_id } = await c.req.json()

    try {
        const id = Math.random().toString(36).substring(7)
        db.prepare(`
            INSERT INTO users (id, email, password, full_name, referrer_id)
            VALUES (?, ?, ?, ?, ?)
        `).run(id, email, password, full_name, referrer_id)

        const user = db.prepare('SELECT id, email, full_name, role FROM users WHERE id = ?').get(id)
        return c.json({ message: 'Registration successful', user })
    } catch (error: any) {
        return c.json({ error: error.message || 'Registration failed' }, 400)
    }
})

auth.post('/login', async (c) => {
    const { email, password } = await c.req.json()

    const user = db.prepare('SELECT id, email, full_name, role FROM users WHERE email = ? AND password = ?').get(email, password)

    if (!user) {
        return c.json({ error: 'Invalid credentials' }, 401)
    }

    // Mock session token for simplicity
    const session = { access_token: 'mock-token-' + Date.now() }

    return c.json({ session, user })
})

export default auth
