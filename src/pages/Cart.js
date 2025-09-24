import React, { useState } from "react";

export default function Cart({ cart, setCart }) {
  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const changeQuantity = (id, value) => {
    let quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 1) quantity = 1;
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };

  const handleBuyerChange = (e) => {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));

    // limpiar error si empieza a escribir
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    let newErrors = {};
    if (!buyer.name) newErrors.name = "El nombre es obligatorio.";
    if (!buyer.phone) newErrors.phone = "El teléfono es obligatorio.";
    if (!buyer.email) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!isValidEmail(buyer.email)) {
      newErrors.email = "Por favor ingresa un correo válido.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsApp = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    if (!validateForm()) return;

    let message = `¡Hola! Quiero cotizar los siguientes productos:\n\n`;
    cart.forEach((item) => {
      message += `- ${item.name} x ${item.quantity}\n`;
    });

    message += `\nDatos del comprador:\n`;
    message += `Nombre: ${buyer.name}\n`;
    message += `Teléfono: ${buyer.phone}\n`;
    message += `Correo: ${buyer.email}\n`;
    if (buyer.message) message += `Mensaje: ${buyer.message}\n`;

    const phoneNumber = "569XXXXXXXX"; // 👉 cambia por tu número
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="cart-container">
      <h2>Carrito de Cotización</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => changeQuantity(item.id, e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => removeItem(item.id)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Datos del comprador</h3>
      <form className="buyer-form">
  <div>
    <label>
      Nombre <span className="required">*</span>
    </label>
    <input
      type="text"
      value={buyer.name}
      onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
      required
    />
  </div>

  <div>
    <label>
      Número <span className="required">*</span>
    </label>
    <input
      type="text"
      value={buyer.phone}
      onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
      required
    />
  </div>

  <div>
    <label>
      Correo <span className="required">*</span>
    </label>
    <input
      type="email"
      value={buyer.email}
      onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
      required
    />
    {!/\S+@\S+\.\S+/.test(buyer.email) && buyer.email.length > 0 && (
      <p className="error-message">Por favor ingresa un correo válido.</p>
    )}
  </div>

  <div>
    <label>Mensaje extra</label>
    <textarea
      value={buyer.message}
      onChange={(e) => setBuyer({ ...buyer, message: e.target.value })}
    />
  </div>
</form>


      <button className="whatsapp-btn" onClick={handleWhatsApp}>
        Cotizar por WhatsApp
      </button>
    </div>
  );
}
