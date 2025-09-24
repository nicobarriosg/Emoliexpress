import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("cat");
  const searchQuery = queryParams.get("search");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const normalizeText = (text = "") =>
    text
      .normalize("NFD") // separa caracteres y tildes
      .replace(/[\u0300-\u036f]/g, "") // elimina tildes
      .replace(/\s+/g, " ") // elimina espacios extra
      .toLowerCase();

  const filteredProducts = products.filter((p) => {
    let matchCat = true;
    let matchSearch = true;

    if (selectedCategory) {
      matchCat =
        p.category &&
        normalizeText(p.category) === normalizeText(selectedCategory);
    }

    if (searchQuery) {
      matchSearch =
        normalizeText(p.name).includes(normalizeText(searchQuery)) ||
        normalizeText(p.description).includes(normalizeText(searchQuery));
    }

    return matchCat && matchSearch;
  });

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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
    </div>
  );
}

export default Products;
