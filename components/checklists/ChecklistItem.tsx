import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

import Checkbox from './Checkbox';
import OptionsMenu from './OptionsMenu';
import EditableText from './EditableText';
import { styles } from '@/components/styles';
import SaveCancelButton from './SaveCancelButton';
import { changeChecklistStatus, deleteChecklist, updateChecklist } from '@/lib/api';

type ChecklistItemProps = {
  id: string;
  title: string;
  complete: boolean;
  fetchData: () => Promise<void>;
};

const ChecklistItem = ({ id, title, complete, fetchData }: ChecklistItemProps) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [originalTitle, setOriginalTitle] = useState(title);
  const [isAnyInputOpen, setIsAnyInputOpen] = useState(false);  

  const closeAllEditingModes = () => {
    setIsEditing(false);
    setShowMenu(false);
    setEditedTitle(originalTitle); 
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

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
    setShowMenu(false);
  };

  const handleToggleMenu = () => {
    if (isAnyInputOpen) {
      closeAllEditingModes();
    } else {
      setShowMenu(!showMenu);
      setIsEditing(false);
    }
  };

  const handleInputFocus = () => {
    setIsAnyInputOpen(true);
  };

  const handleInputBlur = () => {
    setIsAnyInputOpen(false);
  };

  const handleSave = async () => {
    if (editedTitle.trim() === '') {     
      alert('The checklist cannot be empty');
      return;
    }
  
    try {
      await updateChecklist(id, { title: editedTitle });
      fetchData();
    } catch (error) {
      console.error('Error updating Checklist:', error);
    }
    setIsEditing(false);
  };

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
      <ul className="pl-4" ref={menuRef}>
        <li className={`${styles['checklistLi']} `}>
          <Checkbox id={id} checked={complete} onChange={handleToggleStatus} />
          {isEditing ? (
            <EditableText value={editedTitle} onChange={setEditedTitle} onFocus={handleInputFocus} onBlur={handleInputBlur} />
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
              className="text-gray-400 hover:text-gray-600 mr-1"
              onClick={handleToggleMenu}
              onMouseDown={(e) => e.stopPropagation()}
            >
              ...
            </button>
            {showMenu && !isEditing && (
              <OptionsMenu
                id={id}
                fetchData={fetchData}
                handleToggleEdit={handleToggleEdit}
                handleDelete={handleDelete}
              />
            )}
            {isEditing && <SaveCancelButton handleSave={handleSave} handleClose={closeAllEditingModes} />}
          </div>
        </li>
      </ul>
    </motion.div>
  );
};

export default ChecklistItem;