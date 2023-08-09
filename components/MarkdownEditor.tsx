'use client'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { HiBan, HiCheck, HiEye, HiEyeOff, HiMinusSm, HiPlusSm } from 'react-icons/hi'

import SectionWrapper from './hoc/SectionWrapper'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const ButtonTools = ({ icon }) => {
    const [isCheck, setIsCheck] = useState(false)
    return (
        <button
            type="button"
            className="border-2 border-zinc-600 hover:border-zinc-500 transition duration-300 rounded p-2"
            onClick={() => setIsCheck(!isCheck)}
        >
            {isCheck ? icon[1] : icon[0]}
        </button>
    )
}

const MarkdownEditor = () => {
    const [value, setValue] = useState('To do something')
    const [isMarkVisible, setIsMarkVisible] = useState(false)
    console.log(value)
    const icons = {
        check: [<HiCheck key="check" />, <HiBan key="ban" />],
        plusminus: [<HiPlusSm key="plus" />, <HiMinusSm key="minus" />],
        eye: [<HiEyeOff key="eyeoff" />, <HiEye key="eye" />],
    }

    const handleChange = (value: string | undefined) => {
        setValue(value || '')
    }

    const handleEdit = () => {
        setIsMarkVisible(!isMarkVisible)
    }

    return (
        <div className="flex w-full flex-col bg-zinc-800 p-4 gap-y-5">
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center gap-3">
                    <h2 className="text-3xl font-semibold">Checklist Title</h2>
                    <div className="flex flex-col">
                        <div className="flex items-center text-base">Progress</div>
                        <div className="flex w-[120px] items-center justify-center bg-zinc-500">0%</div>
                    </div>
                </div>
                <div className="flex gap-3">
                    {Object.keys(icons).map((key) => (
                        <ButtonTools key={key} icon={icons[key]} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col px-8 gap-y-5">
                <div className="flex gap-2">
                    <input type="checkbox" className="bg-zinc-700 rounded p-4" />
                    {isMarkVisible ? <MDEditor value={value} onChange={handleChange} /> : <span>{value}</span>}
                    <button className="px-4 py-2 rounded-full bg-green-500" onClick={handleEdit}>
                        {isMarkVisible ? 'Save' : 'Edit'}
                    </button>
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" className="bg-zinc-700 rounded p-4" />
                    {isMarkVisible ? <MDEditor value={value} onChange={handleChange} /> : <span>{value}</span>}
                </div>
                <div className="flex gap-2">
                    <input type="checkbox" className="bg-zinc-700 rounded p-4" />
                    {isMarkVisible ? <MDEditor value={value} onChange={handleChange} /> : <span>{value}</span>}
                </div>
            </div>
        </div>
    )
}

export default SectionWrapper(MarkdownEditor, '')
