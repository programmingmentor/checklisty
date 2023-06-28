import { styles } from '@/components/styles';

type SaveCancelButtonProps = {
  handleSave: () => void;
  handleClose: () => void;
};

const SaveCancelButton = ({ handleSave, handleClose }: SaveCancelButtonProps) => {
  return (
    <div className={`${styles['BackroundDropMenu']} `} onClick={(e) => e.stopPropagation()}>
      <button className={`${styles['buttonsDropMenu']} `} onClick={handleSave}>
        Save
      </button>
      <button className={`${styles['buttonsDropMenu']} `} onClick={handleClose}>
        Cancel
      </button>
    </div>
  );
};

export default SaveCancelButton;