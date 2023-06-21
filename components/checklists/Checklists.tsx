'use client'

// import prisma from '@/prisma/client'
import { useCallback, useEffect, useState } from 'react'

import { checkList } from '@/lib/api'
import SectionWrapper from '../hoc/SectionWrapper'
import NewChecklist from './NewChecklist'
import ChecklistItem from './ChecklistItem'


type Checklist = {
    id: string
    title: string
    complete: boolean
}

const Checklists = () => {
    const [Checklists, setChecklists] = useState<Checklist[]>([])

    const fetchData = useCallback(async () => {
        try {
            const data = await checkList()
            setChecklists(data)
        } catch (error) {
            console.error('Error fetching checklist:', error)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <>
            <div className="grid grid-cols-1 place-items-center">
                <h1 className="text-2xl ">Checklisty</h1>
                <h2>Private</h2>
                <div>
                    <button className="border border-white bg-transparent px-3 py-0.5 rounded-xl my-2 mx-2">PUBLIC</button>
                    <button className="border border-white bg-transparent px-3 py-0.5 rounded-xl my-2 mx-2">MY</button>
                    <button className="border border-white bg-transparent px-3 py-0.5 rounded-xl my-2 mx-2">NEW</button>
                </div>

                <NewChecklist fetchData={fetchData} />
                
                    <div>
                        {Checklists.map((checkList) => (
                            <ChecklistItem
                            key={checkList.id}
                            id={checkList.id}
                            title={checkList.title}
                            complete={checkList.complete}
                            fetchData={fetchData}
                          />
                        ))}
                    </div>
                
            </div>
        </>
    )
}
export default SectionWrapper(Checklists, '')
