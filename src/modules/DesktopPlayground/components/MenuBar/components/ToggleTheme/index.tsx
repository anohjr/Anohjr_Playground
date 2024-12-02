import { Button } from "@/components/ui/button";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useEffect, useState } from "react";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
/**
 * Render Toggle Theme Button
 */
const ToggleTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    return (
        <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <NightlightOutlinedIcon /> : <LightModeOutlinedIcon />}
        </Button>
    );
};

export default ToggleTheme;
