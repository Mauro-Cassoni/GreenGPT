import { GiEvilMoon } from 'react-icons/gi';
import { IoMoon } from 'react-icons/io5';

interface iThemeButton {
    onClick: () => void;
}

export default function ThemeButton({ onClick }: iThemeButton) {
    return (

        <button className={`bg-[var(--bg)] flex items-center gap-2 rounded-2xl p-1 theme_button`}
        onClick={onClick}>
            <span className="text-[var(--d-text)] bg-[var(--d-button)] p-1 rounded-2xl"><IoMoon /></span>
            <span className="text-[var(--ed-text)] bg-[var(--ed-button)] p-1 rounded-2xl"><GiEvilMoon /></span>
        </button>

    )
}
