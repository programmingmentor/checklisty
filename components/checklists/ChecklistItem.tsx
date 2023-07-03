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
    const menuRef = useRef(null)
    const [showMenu, setShowMenu] = useState(false)
    const [activeItemId, setActiveItemId] = useState<string | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(title)
    const [initialTitle, setinitialTitle] = useState(title)

    const handleToggleStatus = async () => {
        try {
            await changeChecklistStatus({ id })
            fetchData()
        } catch (error) {
            console.error('Error updating Checklist:', error)
        }
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    const handleToggleMenu = (itemId: string) => {
        setActiveItemId(itemId)
        if (activeItemId === itemId) {
            setShowMenu(!showMenu)
        }
    }

    const handleToggleEdit = () => {
        setShowMenu(false)
        setIsEditing(true)
    }

    const handleSave = async () => {
        if (editedTitle.trim() === '') {
            alert('The checklist cannot be empty')
            return
        }

        try {
            await updateChecklist(id, { title: editedTitle })
            fetchData()
        } catch (error) {
            console.error('Error updating Checklist:', error)
        }
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditedTitle(initialTitle)
    }

    const handleDelete = async () => {
        try {
            await deleteChecklist(id)
            fetchData()
        } catch (error) {
            console.error('Error deleting Checklist:', error)
        }
    }

    return (
        <motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.8 }} transition={{ ease: 'easeOut' }}>
            <li className={`${styles['checklistLi']} `} ref={menuRef}>
                <Checkbox id={id} checked={complete} onChange={handleToggleStatus} />
                {isEditing ? (
                    <input className={`${styles['inputsMain']} `} type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                ) : (
                    <label htmlFor={id} className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500 mr-2 ml-1">
                        {title}
                    </label>
                )}
                <div className="relative ml-auto">
                    <button className="text-gray-400 hover:text-gray-600 px-3" onClick={() => handleToggleMenu(id)} disabled={isEditing}>
                        ...
                    </button>
                    {showMenu && <OptionsMenu handlers={{ handleToggleEdit, handleDelete }} textData={{ firstLabel: 'Edit', secondLabel: 'Delete' }} />}
                    {isEditing && <OptionsMenu handlers={{ handleSave, handleCancel }} textData={{ firstLabel: 'Save', secondLabel: 'Cancel' }} />}
                </div>
            </li>
        </motion.div>
    )
}
export default ChecklistItem
