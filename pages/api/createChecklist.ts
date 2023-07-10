import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function newChecklist(req: NextApiRequest, res: NextApiResponse) { 
    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }

    const { title, complete } = req.body

    try {
        const newChecklist = await prisma.checklist.create({
            data: {
                title,
                complete,
            },
        })
        res.status(200).json('Checklist created')
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).json({ error: 'Something went wrong' })
    }
}