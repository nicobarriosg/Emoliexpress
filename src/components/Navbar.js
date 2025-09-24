import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useState } from "react";
import logoImg from "../img/logo.png";

export default function Navbar({ cartCount }) {
  const [tempSearch, setTempSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (tempSearch.trim() !== "") {
      // redirige a /products con query
      navigate(`/products?search=${encodeURIComponent(tempSearch)}`);
      setTempSearch(""); // limpia input
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={logoImg} alt="Emoli" className="logo-image" />
        </Link>
      </div>

      {/* Buscador */}
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>
          <Search size={20} />
        </button>
      </div>

      {/* Links */}
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/about">Sobre Nosotros</Link>
        <Link to="/cart" className="cart-icon">
          <ShoppingCart size={22} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}
