const themeColors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"];
import  "./ThemeSelector.css";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeSelector() {
    const {  changeColor, mode, changeMode } = useContext(ThemeContext);

    const toggleMode = () => {
        changeMode(mode === 'light' ? 'dark' : 'light');
    }

    return(
        <div className="container theme-selector">
            <div className="mode-toggle">
                <i className={`bi bi-moon-stars${mode === 'dark' ? '-fill' : ''}`} onClick={toggleMode}></i>
            </div>
            <div className="theme-links">
                {
                    themeColors.map((color) => (
                        <span key={color} className = {`bg-${color}`} onClick={() => changeColor(color)}></span>
                    ))
                }
            </div>
        </div>
    )
}