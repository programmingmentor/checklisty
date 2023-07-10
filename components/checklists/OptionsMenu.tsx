import { styles } from '@/components/styles'

const OptionsMenu = ({ handlers, btnLabel, state }) => {
    const { handleToggleEdit, handleDelete, handleSave, handleCancel } = handlers
    const { firstLabel, secondLabel } = btnLabel
    const { showEditMenu } = state

    const handleFirstButton = () => {
        if (showEditMenu) {
            handleSave()
        } else {
            handleToggleEdit()
        }
    }
    const handleSecondButton = () => {
        if (showEditMenu) {
            handleCancel()
        } else {
            handleDelete()
        }
    }

    return (
        <div className={`${styles['BackroundDropMenu']}`}>
            <button className={`${styles['buttonsDropMenu']} `} onClick={handleFirstButton}>
                {firstLabel}
            </button>
            <button className={`${styles['buttonsDropMenu']} `} onClick={handleSecondButton}>
                {secondLabel}
            </button>
        </div>
    )
}
export default OptionsMenu
