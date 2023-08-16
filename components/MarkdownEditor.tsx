'use client'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { HiBan, HiCheck, HiEye, HiEyeOff, HiMinusSm, HiPlusSm } from 'react-icons/hi'

import SectionWrapper from './hoc/SectionWrapper'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const ButtonTools = ({ icons, state, onToggle }) => {
    return (
        <button
            type="button"
            className="border-2 border-zinc-600 hover:border-zinc-500 transition duration-300 rounded p-2"
            onClick={onToggle}
        >
            {state ? icons[0] : icons[1]}
        </button>
    )
}

const MarkdownEditor = () => {
    const [value, setValue] = useState('# Markdown Editor for React')
    console.log(value)

    

    const [isEditorVisible, setEditorVisible] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const handleChange = (value: string | undefined) => {
        setValue(value || '')
    }

    const handleEdit = () => {
        setEditorVisible(!isEditorVisible)
    }

    return (
        <div className="flex w-full flex-col bg-zinc-800 p-4 gap-y-5">
            {isEditorVisible ? (
                <MDEditor value={value} onChange={handleChange} />
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center gap-3">
                                <h2 className="text-3xl font-semibold">Checklist Title</h2>
                            <div className="flex flex-col">
                                <div className="flex items-center text-base">Progress</div>
                                <div className="flex w-[120px] items-center justify-center bg-zinc-500">0%</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <ButtonTools
                                icons={[<HiCheck key="check" />, <HiBan key="ban" />]}
                                state={isCheck}
                                onToggle={() => setIsCheck(!isCheck)}
                            />
                            <ButtonTools
                                icons={[<HiPlusSm key="plus" />, <HiMinusSm key="minus" />]}
                                state={isOpen}
                                onToggle={() => setIsOpen(!isOpen)}
                            />
                            <ButtonTools
                                icons={[<HiEyeOff key="eyeoff" />, <HiEye key="eye" />]}
                                state={isVisible}
                                onToggle={() => setIsVisible(!isVisible)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col px-8 gap-y-5">
                        <div className="flex gap-2">
                            <input type="checkbox" className="bg-zinc-700 rounded p-4" />
                            <span>{value}</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" className="bg-zinc-700 rounded p-4" />
                            <span>{value}</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" className="bg-zinc-700 rounded p-4" />
                            <span>{value}</span>
                        </div>
                    </div>
                </>
            )}
            <button className="px-4 py-2 rounded-full bg-green-500" onClick={handleEdit}>
                {isEditorVisible ? 'Save' : 'Edit'}
            </button>
        </div>
    )
}

export default SectionWrapper(MarkdownEditor, '')
