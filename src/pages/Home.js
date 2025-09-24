import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  const categories = [
    { id: 1, name: "Cables", image: "https://www.kei-ind.com/wp-content/uploads/2023/06/power-cables-and-their-various-types.jpg" },
    { id: 2, name: "Iluminación", image: "https://www.enelx.com/content/dam/local-argentina/01-img-slider/empresas/1440x768/2-slide-hero-iluminaci%C3%B3n_1440x768.jpg" },
    { id: 3, name: "Herramientas", image: "https://grupocasalima.com/wp-content/uploads/destornilladores-tipo-estrella-casa-lima.jpg" },
    { id: 4, name: "Canalizaciones", image: "https://www.findtop.com/wp-content/uploads/2024/11/1-23.jpg" },
  ];

  return (
    <div className="home">
      {/* Banner */}
      <section className="banner">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h1>Bienvenido a Emoliexpress</h1>
          <p>Encuentra todo lo que necesitas para tus proyectos</p>
        </div>
      </section>

      {/* Categorías */}
      <section className="categories">
        <h2>Categorías</h2>
        <div className="category-list">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?cat=${encodeURIComponent(cat.name)}`}
              className="category-card"
              style={{ backgroundImage: `url(${cat.image})` }}
            >
              <div className="category-overlay"></div>
              <h3>{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
