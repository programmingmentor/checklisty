import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

import { createJWT, hashPassword } from '@/lib/auth'
import prisma from '@/prisma/client'

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: await hashPassword(req.body.password),
            },
        })
        
        const jwt = await createJWT(user)
        const cookieName = process.env.COOKIE_NAME || 'defaultCookieName'
        res.setHeader(
            'Set-Cookie',
            serialize(cookieName, jwt, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            })
        )
        console.log('signup success')
        res.status(201)
        res.json({})
    } else {
        res.status(400)
        res.json({})
    }
}