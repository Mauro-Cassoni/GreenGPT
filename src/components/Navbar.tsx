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
                    <img src="https://previews.dropbox.com/p/thumb/ACQNOnOo7zmVcD3wpVGnDGaODuEUzf2ksePXaRJ2podYnOgfig-J5ar4WOJIVvin_13cdxgu-33iu2Vgb6ITAExf9gY--9W-y6Z5JilXc3IV4E8PIIhjCxuplqzwkrWiyF8cPD_LlLa1hZF2WVKL6-R4eguM8k6Vev_E-5B_5fYhz1Jn2odkRwyZZj3Bp7GcTRhVfnFGI6QbrU1lGgTBCAGJAiqcZREdEKvFGkf3y0Mv-FpclJ8nnifGku5Av0yD2rpuI662HpDcy7mmUeM0CRyDG3XPEwYTIkyFw7Z78pJ2zr0LbugQhAPDhpEyevON9SRG-KxszBiqZZ7uZhRUg9vl/p.png" alt="logo" className="h-10"/>
                </div>
                <ThemeButton onClick={changeTheme}></ThemeButton>
            </div>

        </header>
    )
}
