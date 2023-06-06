import { NextApiRequest, NextApiResponse } from 'next'

import { hashPassword } from '@/lib/auth'
import prisma from '@/prisma/client'

export default async function resetPassword(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        res.status(405).end()
        return
    }

    const { email, newPassword } = req.body

    if (!email || !newPassword) {
        res.status(401).json({ error: 'Missing email or password' })
        return
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        // Оновлення пароля користувача
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                password: await hashPassword(newPassword),
            },
        })

        res.status(200).json({ message: 'Password reset successful' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}