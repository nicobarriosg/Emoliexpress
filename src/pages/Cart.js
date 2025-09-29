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
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleBuyerChange = (e) => {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};
    if (!buyer.name) newErrors.name = "El nombre es obligatorio.";
    if (!buyer.phone) newErrors.phone = "El teléfono es obligatorio.";
    if (!buyer.email) newErrors.email = "El correo es obligatorio.";
    else if (!isValidEmail(buyer.email)) newErrors.email = "Por favor ingresa un correo válido.";
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

    const phoneNumber = "569XXXXXXXX"; // Cambia por tu número
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Permitir solo números positivos
  const changeQuantity = (id, value) => {
    // Eliminar todo lo que no sea dígito
    const sanitized = value.replace(/\D/g, "");
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: sanitized } : item))
    );
  };

  const normalizeQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) => {
        let qty = parseInt(item.quantity, 10);
        if (isNaN(qty) || qty < 1) qty = 1;
        return { ...item, quantity: qty };
      })
    );
  };

  const incrementQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) => ({
        ...item,
        quantity: item.id === id ? (parseInt(item.quantity, 10) || 1) + 1 : item.quantity,
      }))
    );
  };

  const decrementQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) => ({
        ...item,
        quantity:
          item.id === id
            ? Math.max((parseInt(item.quantity, 10) || 1) - 1, 1)
            : item.quantity,
      }))
    );
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      justifyContent: "center",
                    }}
                  >
                    <button type="button" onClick={() => decrementQuantity(item.id)}>
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => changeQuantity(item.id, e.target.value)}
                      onBlur={() => normalizeQuantity(item.id)}
                      style={{ width: "50px", textAlign: "center" }}
                    />
                    <button type="button" onClick={() => incrementQuantity(item.id)}>
                      +
                    </button>
                  </div>
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
          <input type="text" name="name" value={buyer.name} onChange={handleBuyerChange} required />
        </div>

        <div>
          <label>
            Número <span className="required">*</span>
          </label>
          <input type="text" name="phone" value={buyer.phone} onChange={handleBuyerChange} required />
        </div>

        <div>
          <label>
            Correo <span className="required">*</span>
          </label>
          <input type="email" name="email" value={buyer.email} onChange={handleBuyerChange} required />
          {!/\S+@\S+\.\S+/.test(buyer.email) && buyer.email.length > 0 && (
            <p className="error-message">Por favor ingresa un correo válido.</p>
          )}
        </div>

        <div>
          <label>Mensaje extra</label>
          <textarea name="message" value={buyer.message} onChange={handleBuyerChange} />
        </div>
      </form>

      <button className="whatsapp-btn" onClick={handleWhatsApp}>
        Cotizar por WhatsApp
      </button>
    </div>
  );
}
