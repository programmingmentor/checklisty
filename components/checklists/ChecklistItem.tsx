import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import { styles } from '@/components/styles';
import { changeChecklistStatus, deleteChecklist, updateChecklist } from '@/lib/api';

type ChecklistItemProps = {
  id: string;
  title: string;
  complete: boolean;
  fetchData: () => Promise<void>;
};

const ChecklistItem = ({ id, title, complete, fetchData }: ChecklistItemProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const menuRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  const [showEditMenu, setShowEditMenu] = useState(false);
  const [isAnyInputOpen, setIsAnyInputOpen] = useState(false);

  const closeAllEditingModes = () => {
    setIsEditing(false);
    setShowEditMenu(false);
  };

  const handleToggleStatus = async () => {
    try {
      await changeChecklistStatus({ id });
      fetchData();
    } catch (error) {
      console.error('Error updating Checklist:', error);
    }
  };

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
        await updateChecklist(id, { title: editedTitle });
        fetchData();
      } catch (error) {
        console.error('Error updating Checklist:', error);
      }
    } else {
      setEditedTitle(title);
    }
    setIsEditing(!isEditing);
    setShowMenu(false);
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
    setIsEditing(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      if (!isEditing && !isAnyInputOpen) {
        setShowMenu(false);
        closeAllEditingModes();
      }
    }
  };
  

  const handleInputFocus = () => {
    setIsAnyInputOpen(true);
  };

  const handleInputBlur = () => {
    setIsAnyInputOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleOtherMenuClick = () => {
      setShowMenu(false);
    };

    if (showMenu) {
      document.addEventListener('click', handleOtherMenuClick);
    }

    return () => {
      document.removeEventListener('click', handleOtherMenuClick);
    };
  }, [showMenu]);

  return (
    <motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.8 }} transition={{ ease: 'easeOut' }}>
      <ul className="pl-4">
        <li className="flex gap-1 items-center">
        <input
            className="form-checkbox h-5 w-5 text-gray-600 cursor-pointer peer"
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
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
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
              onClick={handleToggleMenu}
              onMouseDown={(e) => e.stopPropagation()}
            >
              ...
            </button>

            {showMenu && !isEditing && (
              <div className={`${styles['BackroundDropMenu']} `} onClick={(e) => e.stopPropagation()}>
                <button
                  className={`${styles['buttonsDropMenu']} `}
                  onClick={() => {
                    handleToggleEdit();
                    setShowEditMenu(true);
                  }}
                >
                  Edit
                </button>
                <button className={`${styles['buttonsDropMenu']} `} onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}

            {showEditMenu && (
              <div className={`${styles['BackroundDropMenu']} `} onClick={(e) => e.stopPropagation()}>
                <button
                  className={`${styles['buttonsDropMenu']} `}
                  onClick={() => {
                    handleToggleEdit();
                    setShowEditMenu(false);
                  }}
                >
                  Save
                </button>
                <button className={`${styles['buttonsDropMenu']} `} onClick={closeAllEditingModes}>
                  Close
                </button>
              </div>
            )}
          </div>
        </li>
      </ul>
    </motion.div>
  );
};

export default ChecklistItem;