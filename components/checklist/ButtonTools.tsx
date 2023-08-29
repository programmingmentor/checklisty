const ButtonTools = ({ icons, state, onToggle }) => {
    return (
        <button
            type="button"
            className="border-2 border-zinc-600 hover:border-zinc-500 transition duration-300 rounded p-2"
            onClick={onToggle}
        >
            {state ? icons[0] : icons[1]}
        </button>
    )
}
export default ButtonTools