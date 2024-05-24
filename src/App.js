import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { ThemeContext } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";

function App() {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <div className={`app ${theme}`}>
    <BrowserRouter>
      <nav>
        <h1>Notes Up</h1>
        <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/create">Create a New Note</Link>
          </div>
          <div className="theme-toggler" onClick={toggleTheme}>
        <button>{theme === "light" ? <FaMoon /> : <FaSun/>}</button>
      </div>
      </nav>
      <ToastContainer className="custom-toast-container"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
