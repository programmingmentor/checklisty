import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/prisma/client'

export default async function updateChecklist(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    res.status(405).end()
    return
  }

  const { id, title } = req.body

  try {
    const checklist = await prisma.checklist.findUnique({ where: { id } })

    if (!checklist) {
      res.status(404).json({ error: 'Checklist not found' })
      return
    }

    const updatedChecklist = await prisma.checklist.update({
      where: { id },
      data: { title },
    })

    res.status(200).json(updatedChecklist)
  } catch (error) {
    console.error('Error updating checklist:', error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
