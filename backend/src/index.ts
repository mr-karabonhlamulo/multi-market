import { serve } from '@hono/node-server'
import app from './app'

const port = parseInt(process.env.PORT || '3000')

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    console.log(`Server is running on port ${port}`)
    serve({
        fetch: app.fetch,
        port
    })
}

export default app
