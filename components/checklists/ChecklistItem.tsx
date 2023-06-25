import { motion } from 'framer-motion'
import { useState } from 'react'

import { changeChecklistStatus, deleteChecklist, updateChecklist } from '@/lib/api'

type ChecklistItemProps = {
  id: string
  title: string
  complete: boolean
  fetchData: () => Promise<void>
}

const ChecklistItem = ({ id, title, complete, fetchData }: ChecklistItemProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const handleToggleStatus = async () => {
    try {
      await changeChecklistStatus({ id })
      fetchData()
    } catch (error) {
      console.error('Error updating Checklist:', error)
    }
  }   


  const handleDelete = async () => {
    try {
      await deleteChecklist(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting Checklist:', error);
    }
  };
  


  const handleToggleEdit = async () => {
    if (isEditing) {
      try {
        await updateChecklist(id, { title: editedTitle })
        fetchData()
      } catch (error) {
        console.error('Error updating Checklist:', error)
      }
    } else {
      setEditedTitle(title)
    }
    setIsEditing(!isEditing)
  }

  return (
    <motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.8 }} transition={{ ease: 'easeOut' }}>
      <ul className="pl-4">
        <li className="flex gap-1 items-center">
          <input
            className="form-checkbox h-5 w-5  text-gray-600 cursor-pointer peer"
            id={id}
            type="checkbox"
            defaultChecked={complete}
            onChange={handleToggleStatus}
          />
          {isEditing ? (
            <input
              className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <label
              htmlFor={id}
              className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500 mr-2 ml-1"
            >
              {title}
            </label>
          )}
          <div className="relative ml-auto">
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowMenu(!showMenu)}
            >
              ...
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded shadow">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-500 hover:text-gray-700"
                  onClick={handleToggleEdit}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-500 hover:text-gray-700"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </li>
      </ul>
    </motion.div>
  )
}

export default ChecklistItem