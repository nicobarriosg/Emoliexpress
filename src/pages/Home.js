// src/pages/Home.js
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

  const providers = [
    { name: "Top Cable", url: "https://www.topcable.com/wp-content/themes/top-cable-wp-theme/imgs/logo_top_cable.svg" },
    { name: "Bticino", url: "https://www.bticino.cl/themes/custom/bticino_theme/logo.svg" },
    { name: "Schneider", url: "https://upload.wikimedia.org/wikipedia/commons/9/95/Schneider_Electric_2007.svg" },
    { name: "Bosch", url: "https://upload.wikimedia.org/wikipedia/commons/1/16/Bosch-logo.svg" },
    { name: "Philips", url: "https://www.emme-esse.com/wp-content/uploads/2020/02/Logo-Philips-big.png" },
    { name: "Osram", url: "https://look.ams-osram.com/transform/2f3e8012-68d3-4dc2-8719-14e23820a091/Logo-rgb-without-bounding-box-orange-transparent-background?" },
    { name: "Gewiss", url: "https://cdn.worldvectorlogo.com/logos/gewiss-1.svg" },
    { name: "Saime SG", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShbO3VNzUcak9qXJTLQ1aBkbXUis1RQODGNA&s" },
    { name: "Phoenix Contact", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Phoenix_Contact_Logo.svg/744px-Phoenix_Contact_Logo.svg.png?20150315074820" },
    { name: "Covisa", url: "https://coladacontinua.cl/wp-content/uploads/2022/12/COVISA-LOGO.png" },
    { name: "ABB", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/512px-ABB_logo.svg.png?20181028032939" },
    { name: "3M", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/3M_wordmark.svg/300px-3M_wordmark.svg.png?20220730193218" },
    { name: "Bahco", url: "https://cdn.worldvectorlogo.com/logos/bahco.svg" },
    { name: "DeWalt", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/DeWalt_Logo.svg/800px-DeWalt_Logo.svg.png?20161105232749" },
    { name: "Makita", url: "https://upload.wikimedia.org/wikipedia/commons/7/71/Makita_Logo.svg" },
    { name: "MEC", url: "https://mec.cl/wp-content/uploads/2025/07/Logo_MEC_sinfondo-scaled-583x77.png" },
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

      {/* Contacto */}
      <section className="contact-section">
        <div className="contact-info">
          <h2>Contáctanos</h2>
          <p><strong>Dirección:</strong> Universidad Santa María #1730, Maipú Santiago de Chile</p>
          <p><strong>Teléfonos:</strong> +56 9 1234 5678 / +56 2 2345 6789</p>
          <p><strong>Email:</strong> contacto@emoliexpress.cl</p>
        </div>
        <div className="contact-map">
          <iframe
            title="Mapa de Emoliexpress"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.013202472092!2d-70.78291055024113!3d-33.5215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662dd86780dffb7%3A0xc79512fb9c598511!2sEmoliexpress!5e0!3m2!1ses-419!2scl!4v1759085335157!5m2!1ses-419!2scl" 
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Proveedores - CARRUSEL INFINITO */}
      <section className="providers">
        <h2>Proveedores</h2>
        <div className="carousel">
          <div className="carousel-track">
            {providers.map((p, i) => (
              <div className="carousel-item" key={`${p.name}-${i}`}>
                <img
                  src={p.url}
                  alt={p.name}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            ))}
          </div>
          <div className="carousel-track">
            {providers.map((p, i) => (
              <div className="carousel-item" key={`${p.name}-dup-${i}`}>
                <img
                  src={p.url}
                  alt={p.name}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
