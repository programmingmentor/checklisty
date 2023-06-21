import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/prisma/client'

export default async function deleteChecklist(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.status(405).end()
    return
  }

  const { id } = req.query

  try {
    const checklist = await prisma.checklist.findUnique({
      where: { id: String(id) },
    })

    if (!checklist) {
      res.status(404).json({ error: 'Checklist not found' })
      return
    }

    await prisma.checklist.delete({
      where: { id: String(id) },
    })

    res.status(200).json('Checklist deleted')
  } catch (error) {
    console.log('ERROR', error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}




