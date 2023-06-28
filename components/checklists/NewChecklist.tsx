'use client'
import { FormEvent,useState } from 'react'

import { createChecklist } from '@/lib/api'
import { styles } from '@/components/styles';

type Checklist = {
    title: string
    complete: boolean
}

const NewChecklist = ({ fetchData }) => {
    const initialChecklist = { title: '', complete: false }
    const [newChecklist, setNewChecklist] = useState<Checklist>({ ...initialChecklist })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await createChecklist(newChecklist)
            setNewChecklist({ ...initialChecklist })
            fetchData()
        } catch (error) {
            console.error('Error creating new Checklist:', error)
        }      
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
                <input
                    className={`${styles['inputsMain']} `}
                    type="text"
                    name="title"
                    value={newChecklist.title}
                    placeholder="New Checklist"
                    onChange={(e) => setNewChecklist((prev) => ({ ...prev, title: e.target.value }))}
                />
                <div className="flex gap-1 justify-end">                   
                    <button type="submit" className={`${styles['buttonsMain']} `}>
                        Create
                    </button>
                </div>
            </form>
        </>
    )
}
export default NewChecklist