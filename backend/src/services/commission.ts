import { supabase } from '../db/supabase'

export async function processCommission(orderId: string, userId: string, orderTotal: number) {
    // 1. Get user to find referrer
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('referrer_id')
        .eq('id', userId)
        .single() // Use single() if real client, mock might need handling

    // Mock fix: .single() might not be in my valid mock, so I'll just use [0] logic if needed or improve mock
    // For now, let's assume the mock returns an array and I take first
    const userData = Array.isArray(user) ? user[0] : user

    if (userError || !userData || !userData.referrer_id) {
        return // No referrer, no commission
    }

    const referrerId = userData.referrer_id

    // 2. Calculate Commission (10%)
    const commissionAmount = orderTotal * 0.10

    // 3. Create Commission Record
    const { error: commError } = await supabase
        .from('commissions')
        .insert({
            partner_id: referrerId,
            order_id: orderId,
            amount: commissionAmount,
            status: 'pending' // Or 'paid' if we credit instantly. Let's say pending until order delivered ideally, but for MVP credit wallet now?
            // Let's credit wallet immediately for "Bank" feel
        })

    if (commError) console.error('Error creating commission:', commError)

    // 4. Update Referrer Wallet
    // Fetch current balance first (mock doesn't support increment atomic update easily?)
    const { data: referrer, error: refError } = await supabase
        .from('users')
        .select('wallet_balance')
        .eq('id', referrerId)

    const referrerData = Array.isArray(referrer) ? referrer[0] : referrer

    if (referrerData) {
        const newBalance = (Number(referrerData.wallet_balance) || 0) + commissionAmount
        await supabase
            .from('users')
            .update({ wallet_balance: newBalance })
            .eq('id', referrerId)
    }
}
