import { Button } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <header className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Product Management Dashboard</a>
                <Button
                    variant={theme === "light" ? "dark" : "light"}
                    size="sm"
                    onClick={toggleTheme}
                >
                    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </Button>
            </div>
        </header>
    )
}

export default Header;