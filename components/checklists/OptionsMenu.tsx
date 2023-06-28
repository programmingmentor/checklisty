import { styles } from '@/components/styles';

type OptionsMenuProps = {
  id: string;
  fetchData: () => Promise<void>;
  handleToggleEdit: () => void;
  handleDelete: () => void;
};

const OptionsMenu = ({ id, fetchData, handleToggleEdit, handleDelete }: OptionsMenuProps) => {
  const handleEdit = () => {
    handleToggleEdit();
  };

  return (
    <div className={`${styles['BackroundDropMenu']} `} onClick={(e) => e.stopPropagation()}>
      <button className={`${styles['buttonsDropMenu']} `} onClick={handleEdit}>
        Edit
      </button>
      <button className={`${styles['buttonsDropMenu']} `} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default OptionsMenu;