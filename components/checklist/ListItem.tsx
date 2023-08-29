'use client'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { HiBan, HiCheck, HiEye, HiEyeOff, HiMinusSm, HiPlusSm } from 'react-icons/hi'

import ButtonTools from '@/components/checklist/ButtonTools'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const ListItem = ({ title, items, listId, onSave, onCompleted }) => {
    
    const [isEditorVisible, setEditorVisible] = useState(false)
    const [listTitle, setListTitle] = useState(title)
    const [markdownValue, setMarkdownValue] = useState(items.map((item) => `## ${item.title}`).join('\n'))
    
    const [isCheck, setIsCheck] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="flex w-full flex-col bg-zinc-800 p-4 gap-y-5 rounded-md relative">
            <div className="absolute top-0 right-2 cursor-pointer">X</div>

            {isEditorVisible ? (
                <>
                    <input
                        type="text"
                        value={listTitle}
                        onChange={(e) => setListTitle(e.target.value)}
                        className="text-3xl font-semibold"
                    />
                    <MDEditor value={markdownValue} onChange={(value: string) => setMarkdownValue(value)} />
                </>
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center gap-3">
                            <h2 className="text-3xl font-semibold">{listTitle}</h2>
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
                        {items.map((item) => (
                            <div
                                className="flex gap-2 cursor-pointer"
                                key={item.id}
                                onClick={() => onCompleted(item.id, item.completed, listId)}
                            >
                                <input
                                    type="checkbox"
                                    checked={item.completed}
                                    className="bg-zinc-700 rounded p-4"
                                />
                                <span className={`${item.completed ? 'text-red-500' : ''}`}>{item.title}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className="flex items-center justify-end gap-3">
                <button
                    className="px-4 py-2 rounded-md bg-green-500"
                    onClick={() => setEditorVisible(!isEditorVisible)}
                >
                    {isEditorVisible ? 'Cancel' : 'Edit'}
                </button>
                {isEditorVisible && (
                    <button
                        className="px-4 py-2 rounded-md bg-green-500"
                        onClick={() => {
                            onSave(listId, markdownValue, listTitle), setEditorVisible(false)
                        }}
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    )
}

export default ListItem
