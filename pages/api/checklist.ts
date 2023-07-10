

import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        res.status(405).end()
        return
    }

    try {
        const checklist = await prisma.checklist.findMany({
            orderBy: {
                complete: 'asc',
            },
        })
        res.status(200).json(checklist)
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).json({ error: 'Something went wrong' })
    }
}

