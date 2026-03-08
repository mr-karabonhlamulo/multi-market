import db from '../db/sqlite'

export async function processCommission(orderId: string, userId: string, orderTotal: number) {
    try {
        const user = db.prepare('SELECT referrer_id FROM users WHERE id = ?').get(userId) as any

        if (!user || !user.referrer_id) {
            return
        }

        const referrerId = user.referrer_id
        const commissionAmount = orderTotal * 0.10

        db.prepare(`
            INSERT INTO commissions (partner_id, order_id, amount, status)
            VALUES (?, ?, ?, ?)
        `).run(referrerId, orderId, commissionAmount, 'paid')

        const referrer = db.prepare('SELECT wallet_balance FROM users WHERE id = ?').get(referrerId) as any

        if (referrer) {
            const newBalance = (Number(referrer.wallet_balance) || 0) + commissionAmount
            db.prepare('UPDATE users SET wallet_balance = ? WHERE id = ?').run(newBalance, referrerId)
        }
    } catch (error) {
        console.error('Error processing commission:', error)
    }
}
