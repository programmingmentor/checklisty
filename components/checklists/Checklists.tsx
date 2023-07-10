'use client'
import { useCallback, useEffect, useState } from 'react'

import { styles } from '@/components/styles';
import { checkList } from '@/lib/api'

import SectionWrapper from '../hoc/SectionWrapper'
import ChecklistItem from './ChecklistItem'
import NewChecklist from './NewChecklist'

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
                    <button className={`${styles['buttonsMain']} `}>PUBLIC</button>
                    <button className={`${styles['buttonsMain']} `}>MY</button>
                    <button className={`${styles['buttonsMain']} `}>NEW</button>
                </div>
                <NewChecklist fetchData={fetchData} />
                <div>
                    <ul className="pl-4">
                        {Checklists.map((checkList) => (
                            <ChecklistItem key={checkList.id} id={checkList.id} title={checkList.title} complete={checkList.complete} fetchData={fetchData} />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SectionWrapper(Checklists, '')
