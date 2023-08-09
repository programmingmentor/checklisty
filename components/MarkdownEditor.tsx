'use client'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import SectionWrapper from './hoc/SectionWrapper'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })


const MarkdownEditor = () => {
    const [value, setValue] = useState('**Hello world!!!**')
    const [isMarkVisible, setIsMarkVisible] = useState(false)

    const handleChange = (value: string | undefined) => {
        setValue(value || '')
    }

    const handleEdit = () => {
        setIsMarkVisible(!isMarkVisible)
    }

    return (
        <div className="flex flex-col gap-y-5">
            {isMarkVisible ? <MDEditor value={value} onChange={handleChange} /> : <h1>{value}</h1>}
            <button className="px-4 py-2 rounded-full bg-green-500" onClick={handleEdit}>
                {isMarkVisible ? 'Save' : 'Edit'}
            </button>
        </div>
    )
}
// export default MarkdownEditor
export default SectionWrapper(MarkdownEditor, '')