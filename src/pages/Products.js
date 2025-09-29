// src/pages/Products.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("cat");
  const searchQuery = queryParams.get("search");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const normalizeText = (text = "") =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .toLowerCase();

  const filteredProducts = products.filter((p) => {
    let matchCat = true;
    let matchSearch = true;

    if (selectedCategory) {
      matchCat =
        p.category && normalizeText(p.category) === normalizeText(selectedCategory);
    }

    if (searchQuery) {
      matchSearch =
        normalizeText(p.name).includes(normalizeText(searchQuery)) ||
        normalizeText(p.description).includes(normalizeText(searchQuery));
    }

    return matchCat && matchSearch;
  });

  // Paginación: calcular productos a mostrar
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // sube al inicio al cambiar de página
  };

  return (
    <div className="products">
      <h2>
        {searchQuery
          ? `Resultados para "${searchQuery}"`
          : selectedCategory
          ? `Productos de ${selectedCategory}`
          : "Productos"}
      </h2>
      <div className="product-list">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button onClick={() => addToCart(product)}>
                <ShoppingCart size={16} /> Agregar
              </button>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            &lt; Anterior
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
