import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export default async function deleteChecklist(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.status(405).end()
    return
  }

  const { id } = req.query

  try {
    const deletedChecklist = await prisma.checklist.delete({
      where: {
        id: String(id),
      },
    })

    res.status(200).json(deletedChecklist)
  } catch (error) {
    console.log('ERROR', error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
