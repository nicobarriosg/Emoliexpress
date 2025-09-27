import React from "react";
import "../App.css";
import nosotrosImg from "../img/about.avif"; // 👈 importa la imagen

function About() {
  return (
    <section className="about">
      <div className="about-content">
        <div className="about-text">
          <h2>Sobre Nosotros</h2>
          <p>
            Somos una empresa que nace para dar soluciones rápidas y efectivas
            a sus necesidades. Con más de 36 años de experiencia en el mercado
            eléctrico, Mario Molina Lagos, director general de EMOLIEXPRESS
            emprende su propio negocio dedicado a la comercialización de una
            amplia gama de materiales eléctricos en general.
          </p>
          <p>
            Hoy podemos decir que somos una empresa emergente, gracias a la
            confianza que han puesto en nosotros nuestros fieles clientes.
          </p>
        </div>
        <div className="about-image">
          <img src={nosotrosImg} alt="Sobre nosotros" />
        </div>
      </div>
    </section>
  );
}

export default About;
