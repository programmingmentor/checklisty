'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import ListItem from '@/components/checklist/ListItem'
import {
    createList,
    getListsWithItems,
    saveListMarkdown,
    updateCompleteItem,
} from '@/lib/actions/checklist.actions'
import { getCurrentUser } from '@/lib/actions/user.actions'

import SectionWrapper from '../hoc/SectionWrapper'

interface Item {
    id: string
    createdAt: string
    updatedAt: string
    title: string
    description: string | null
    completed: boolean
    checklistId: string
}

interface Checklist {
    id: string
    createdAt: string
    updatedAt: string
    title: string
    markdown: string
    userId: string
    items: Item[]
}

const Checklist = () => {
    const router = useRouter()
    const [userId, setUserId] = useState<string | null>(null)
    const [lists, setLists] = useState<Checklist[]>([])

    
    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getCurrentUser()
            if (fetchedUser) {
                setUserId(fetchedUser.id)
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        const fetchLists = async () => {
            const fetchedLists = await getListsWithItems({ userId })
            if (fetchedLists) {
                setLists(fetchedLists as Checklist[] | [])
            }
        }

        fetchLists()
    }, [userId])

    const handleCreateList = async () => {
        if (!userId) router.push('/sign-in')
        const newAddedList = await createList({ userId })
        setLists((prevLists) => [...prevLists, newAddedList] as Checklist[] | [])
    }

    const handleSaveToDB = async (listId: string, markdownValue: string, listTitle: string) => {
        await saveListMarkdown({ listId, markdownValue, listTitle })
        const updatedLists = await getListsWithItems({ userId })
        setLists(updatedLists as Checklist[] | [])
    }

    const handleCompleted = async (itemId: string, completed: Boolean, listId: string) => {
        const updatedList = await updateCompleteItem({ itemId, completed, listId })
        setLists((prevLists)  => {
            const updatedLists = prevLists.map((list) => {
                if (list.id === listId) {
                    return updatedList
                }
                return list
            })
            
            return updatedLists as Checklist[] | []
        })
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-end">
                <button type="button" onClick={handleCreateList} className="bg-slate-400 p-2 rounded-md">
                    Add List
                </button>
            </div>
            <div className="flex flex-col gap-7">
                {lists.map((list) => (
                    <ListItem
                        key={list.id}
                        title={list.title}
                        items={list.items}
                        listId={list.id}
                        onSave={handleSaveToDB}
                        onCompleted={handleCompleted}
                    />
                ))}
            </div>
        </div>
    )
}

export default SectionWrapper(Checklist, '')
