'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import prisma from '@/prisma/client'

export async function createList({ userId }) {
    if (!userId) return null
    try {
        const newList = await prisma.checklist.create({
            data: {
                title: 'New List',
                // markdown: '## New Item',
                userId: userId,
            },
        })

        return newList
    } catch (error: any) {
        throw new Error(`Error adding list: ${error.message}`)
    }
}

export async function getListsWithItems({ userId }) {
    if (!userId) return null
    try {
        const lists = await prisma.checklist.findMany({
            where: {
                userId: userId || undefined,
            },
            include: {
                items: true,
            },
        })
        console.log(lists)
        return lists
    } catch (error: any) {
        throw new Error(`Error getting lists with items: ${error.message}`)
    }
}

interface Item {
    id?: string
    title: string
}

export async function saveListMarkdown({ listId, markdownValue, listTitle }) {
    if (!listId) return null
    try {
        // Оновлюємо markdown у списку
        const updatedList = await prisma.checklist.update({
            where: {
                id: listId,
            },
            data: {
                title: listTitle,
                markdown: markdownValue,
            },
        })

        const currentList = await prisma.checklist.findUnique({
            where: {
                id: listId,
            },
            include: {
                items: true,
            },
        })

        const markdownLines = markdownValue.split('\n')
        const newItems = markdownLines.map((line: string) => ({ title: line.replace('## ', '') }))

        const itemsToUpdate: Item[] = []
        const itemsToCreate: Item[] = []

        newItems.forEach((newItem, index) => {
            if (currentList?.items[index]) {
                const currentItem = currentList.items[index] as Item
                console.log(currentItem)
                if (currentItem.title !== newItem.title) {
                    itemsToUpdate.push({
                        id: currentItem.id,
                        title: newItem.title as string,
                    })
                }
            } else {
                itemsToCreate.push({
                    title: newItem.title as string,
                })
            }
        })

        // Оновлюємо існуючі items, які змінилися
        await Promise.all(
            itemsToUpdate.map((item) =>
                prisma.item.update({
                    where: { id: item.id },
                    data: { title: item.title },
                })
            )
        )

        // Створюємо нові items
        await prisma.item.createMany({
            data: itemsToCreate.map((item) => ({
                title: item.title,
                checklistId: listId,
            })),
        })

        // Видаляємо items, які були видалені з markdownValue
        const itemsToDelete = currentList?.items.filter(
            (item) => !newItems.map((item) => item.title).includes(item.title)
        )

        if (itemsToDelete) {
            await Promise.all(
                itemsToDelete.map((item) =>
                    prisma.item.delete({
                        where: { id: item.id },
                    })
                )
            )
        }
        // return updatedList
    } catch (error: any) {
        throw new Error(`Error saving list markdown: ${error.message}`)
    }
}

export async function updateCompleteItem({ itemId, completed, listId }) {
    if (!itemId) return null
    try {
        const updatedItem = await prisma.item.update({
            where: {
                id: itemId,
            },
            data: {
                completed: !completed,
            },
        })

        //Need return updated lists with updated items
        const updatedList = await prisma.checklist.findUnique({
            where: {
                id: listId,
            },
            include: {
                items: true,
            },
        })

        return updatedList
    } catch (error: any) {
        throw new Error(`Error updating item: ${error.message}`)
    }
}
