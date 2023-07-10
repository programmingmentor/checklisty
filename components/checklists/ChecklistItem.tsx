import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { styles } from '@/components/styles'
import { changeChecklistStatus, deleteChecklist, updateChecklist } from '@/lib/api'

import Checkbox from './Checkbox'
import OptionsMenu from './OptionsMenu'

type ChecklistItemProps = {
    id: string
    title: string
    complete: boolean
    fetchData: () => Promise<void>
}

const ChecklistItem = ({ id, title, complete, fetchData }: ChecklistItemProps) => {
    const menuRef = useRef<HTMLLIElement>(null)
    const [initialTitle, setInitialTitle] = useState(title)
    const [editedTitle, setEditedTitle] = useState(title)
    const [showMenu, setShowMenu] = useState(false)
    const [showEditMenu, setShowEditMenu] = useState(false)

    const handleToggleStatus = async () => {
        try {
            await changeChecklistStatus({ id })
            fetchData()
        } catch (error) {
            console.error('Error updating Checklist:', error)
        }
    }
    const handleOutsideClick = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowMenu(false)
            setShowEditMenu(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    const handleToggleMenu = () => {
        setShowMenu((prevShowMenu) => !prevShowMenu)
        setShowEditMenu(false)
    }

    const handleToggleEdit = () => {
        setShowEditMenu((prevShowEditMenu) => !prevShowEditMenu)
        setShowMenu(false)
    }

    const handleDelete = async () => {
        try {
            await deleteChecklist(id)
            fetchData()
        } catch (error) {
            console.error('Error deleting Checklist:', error)
        }
    }

    const handleSave = async () => {
        // TODO: Add toasts instead of browser alerts

        // if (editedTitle.trim() === '') {
        //     alert('The checklist cannot be empty')
        //     return
        // }

        try {
            await updateChecklist(id, { title: editedTitle })
            fetchData()
        } catch (error) {
            console.error('Error updating Checklist:', error)
        }
        setShowEditMenu(false)
    }

    const handleCancel = () => {
        setShowEditMenu(false)
        setEditedTitle(initialTitle)
    }

    return (
        <motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.8 }} transition={{ ease: 'easeOut' }}>
            <li className={`${styles['checklistLi']} `} ref={menuRef}>
                <Checkbox id={id} checked={complete} onChange={handleToggleStatus} />
                {showEditMenu ? (
                    <input className={`${styles['inputsMain']} `} type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                ) : (
                    <label htmlFor={id} className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500 mr-2 ml-1">
                        {title}
                    </label>
                )}
                <div className="relative ml-auto">
                    <button className="text-gray-400 hover:text-gray-600 px-3" onClick={handleToggleMenu} disabled={showEditMenu}>
                        ...
                    </button>
                    {(showMenu || showEditMenu) && (
                        <OptionsMenu
                            handlers={{ handleToggleEdit, handleDelete, handleSave, handleCancel }}
                            btnLabel={{ firstLabel: showEditMenu ? 'Save' : 'Edit', secondLabel: showEditMenu ? 'Cancel' : 'Delete' }}
                            state={{ showEditMenu }}
                        />
                    )}
                </div>
            </li>
        </motion.div>
    )
}
export default ChecklistItem
