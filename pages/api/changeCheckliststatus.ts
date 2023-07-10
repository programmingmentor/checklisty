import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function changeChecklistStatus(req: NextApiRequest, res: NextApiResponse) {  
    if (req.method !== 'POST') {
        res.status(405).end()
        return
    }

    try {
        const { id } = req.body
        const Checklist = await prisma.checklist.findUnique({
            where: { id },
        })

        if (!Checklist) {
            res.status(404).json({ error: 'Todo not found' })
            return
        }

        const updatedChecklist = await prisma.checklist.update({
            where: { id },
            data: {
                complete: !Checklist.complete,
            },
        })

        res.status(200).json(updatedChecklist)
    } catch (error) {
        console.log('ERROR', error)
        res.status(400).json({ error: 'Something went wrong' })
    }
}
