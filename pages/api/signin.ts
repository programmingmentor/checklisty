import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

import { comparePasswords, createJWT } from '@/lib/auth'
import prisma from '@/prisma/client'

export default async function signin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        if (!user) {
            res.status(401)
            res.json({ error: 'Invalid login' })
            return
        }

        const isUser = await comparePasswords(req.body.password, user.password)

        if (isUser) {
            const jwt = await createJWT(user)
            const cookieName = process.env?.COOKIE_NAME || 'defaultCookieName'
            res.setHeader(
                'Set-Cookie',
                serialize(cookieName, jwt, {
                    httpOnly: true,
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7,
                })
            )
            console.log('signin success')
            res.status(201)
            res.json({})
        } else {
            res.status(401)
            res.json({ error: 'Invalid login' })
        }
    } else {
        res.status(402)
        res.json({})
    }
}
