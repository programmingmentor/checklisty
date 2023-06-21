'use client'
import { FormEvent,useState } from 'react'

import { createChecklist, deleteChecklist } from '@/lib/api'



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
                    className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
                    type="text"
                    name="title"
                    value={newChecklist.title}
                    placeholder="New Checklist"
                    onChange={(e) => setNewChecklist((prev) => ({ ...prev, title: e.target.value }))}
                />
                <div className="flex gap-1 justify-end">
                    <button type="submit" className="border border-white bg-transparent px-3 py-0.5 rounded-xl my-2 mx-2">
                        Create
                    </button>
                </div>
            </form>
        </>
    )
}
export default NewChecklist
