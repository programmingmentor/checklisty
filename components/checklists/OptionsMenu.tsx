import { styles } from '@/components/styles'

const OptionsMenu = ({ handlers, textData }) => {
    const { handleToggleEdit, handleDelete, handleSave, handleCancel } = handlers
    const { firstLabel, secondLabel } = textData

    return (
        <div className={`${styles['BackroundDropMenu']} `} onClick={(e) => e.stopPropagation()}>
            <button className={`${styles['buttonsDropMenu']} `} onClick={handleToggleEdit || handleSave}>
                {firstLabel}
            </button>
            <button className={`${styles['buttonsDropMenu']} `} onClick={handleDelete || handleCancel}>
                {secondLabel}
            </button>
        </div>
    )
}
export default OptionsMenu
