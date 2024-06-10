import { useEffect, useState } from "react"
import ThemeButton from "./ThemeButton";

const getThemeFromLocalStorage = () => {
    if (localStorage.getItem('theme')) {
        return localStorage.getItem('theme')
    } else {
        return 'dark-mode'
    }
}

interface iNavbar {
    className?: string;
}

export default function Navbar({ className }: iNavbar) {

    const [theme, setTheme] = useState(getThemeFromLocalStorage());

    const changeTheme = () => {
        if (theme === 'dark-mode') {
            setTheme('evil-dark-mode')
        } else {
            setTheme('dark-mode');
        }
    }

    useEffect(() => {
        if (theme !== null) {
            document.documentElement.className = theme;
            localStorage.setItem('theme', theme);
        }
    })

    return (
        <header
            className={`bg-[var(--primary)] 
            ${className}`}>
            <div className="flex justify-between items-center h-full p-3">
                <div>
                    <img src="../../public/Logo.png" alt="logo" className="h-10"/>
                </div>
                <ThemeButton onClick={changeTheme}></ThemeButton>
            </div>

        </header>
    )
}
