import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/tienda.css";

// --- BASE DE DATOS DE PRODUCTOS (SIMULADA) ---
// En tu ERP real esto debería venir de una API / tu backend.
const PRODUCTS = [
  { id: 1, name: "Guantes FOX", price: 45000, image: "/IMG/Casco 1.jpg", stock: 5 },
  { id: 2, name: "Casco BELL", price: 120000, image: "/IMG/CHAQUETA 1.jpg", stock: 1 },
  { id: 3, name: "Chaqueta de aventura", price: 180000, image: "/IMG/GUANTES 1.webp", stock: 4 },
];

const STORAGE_KEY = "francoElViajeroCart";

const currency = (value) =>
  value.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

/**
 * Página de tienda con carrito de compras.
 * Requiere Bootstrap 5 (CSS + bundle JS, con `window.bootstrap` disponible)
 * cargado globalmente en tu app, ya que usamos su componente Modal.
 */
export default function Tienda() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const modalRef = useRef(null);
  const bsModalRef = useRef(null);
  const cartIconRef = useRef(null);

  // Persistir carrito en localStorage cada vez que cambie.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Inicializar el modal de Bootstrap una sola vez.
  useEffect(() => {
    if (window.bootstrap && modalRef.current) {
      bsModalRef.current = new window.bootstrap.Modal(modalRef.current);
    }
  }, []);

  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const pulseCartIcon = () => {
    const el = cartIconRef.current;
    if (!el) return;
    el.classList.add("animate__animated", "animate__pulse");
    setTimeout(() => el.classList.remove("animate__animated", "animate__pulse"), 1000);
  };

  const addToCart = (productId) => {
    const productToAdd = PRODUCTS.find((p) => p.id === productId);
    if (!productToAdd) return;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity >= productToAdd.stock) {
          alert(`No hay más stock de ${productToAdd.name}.`);
          return prev;
        }
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...productToAdd, quantity: 1 }];
    });

    pulseCartIcon();
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (!item) return prev;

      const nextQty = item.quantity + change;
      if (nextQty <= 0) {
        return prev.filter((i) => i.id !== productId);
      }

      const productStock = PRODUCTS.find((p) => p.id === productId)?.stock ?? Infinity;
      const cappedQty = Math.min(nextQty, productStock);
      if (nextQty > productStock) {
        alert("No hay más stock de este producto.");
      }

      return prev.map((i) => (i.id === productId ? { ...i, quantity: cappedQty } : i));
    });
  };

  const clearCart = () => {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      setCart([]);
    }
  };

  const checkout = () => {
    alert(
      "¡Gracias por tu compra! (Esta es una simulación). En una tienda real, serías redirigido al proceso de pago."
    );
    setCart([]);
    bsModalRef.current?.hide();
  };

  const openCart = () => {
    bsModalRef.current?.show();
  };

  return (
    <div className="public-page">
      <Navbar activePage="tienda" />

      {/* Ícono del carrito flotante en la navbar: colócalo dentro de tu <Navbar> si prefieres,
          aquí se muestra aparte para mantener la lógica de tienda autocontenida. */}
      <div className="d-flex justify-content-end px-4 py-2 bg-dark">
        <button
          className="btn btn-link nav-link position-relative"
          id="cart-icon"
          ref={cartIconRef}
          onClick={openCart}
        >
          <i className="fas fa-shopping-cart fa-lg text-white"></i>
          {totalItems > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              id="cart-count"
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <section className="video animate__animated animate__fadeIn">
        <div className="hero-content container">
          <h2 className="text-center mb-5">Tienda de Productos</h2>
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/HC2rzFqcB7A"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="store-section">
        <div className="container">
          <h2 className="text-center mb-5">Accesorios para vos</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {PRODUCTS.map((product) => (
              <div className="col" key={product.id}>
                <div className="card">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text price fw-bold">{currency(product.price)}</p>
                    <button
                      className="btn btn-success w-100 mt-2 add-to-cart-btn"
                      onClick={() => addToCart(product.id)}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal del Carrito */}
      <div className="modal fade" id="cartModal" tabIndex="-1" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-secondary">
              <h5 className="modal-title">Tu Carrito de Compras</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div id="cart-items-container">
                {cart.length === 0 ? (
                  <p className="empty-cart-message">Tu carrito está vacío.</p>
                ) : (
                  cart.map((item) => (
                    <div className="cart-item" key={item.id} data-product-id={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <h5>{item.name}</h5>
                        <p>Precio: {currency(item.price)}</p>
                      </div>
                      <div className="cart-item-quantity">
                        <button
                          className="btn btn-sm btn-secondary btn-decrease"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <input type="number" value={item.quantity} min="1" readOnly />
                        <button
                          className="btn btn-sm btn-secondary btn-increase"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-item-total">{currency(item.price * item.quantity)}</div>
                      <button
                        className="btn btn-sm btn-danger btn-remove ms-3"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
              <hr className="border-secondary" />
              <div className="d-flex justify-content-between align-items-center">
                <h4>Total:</h4>
                <h4 id="cart-total">{currency(total)}</h4>
              </div>
            </div>
            <div className="modal-footer border-secondary">
              <button type="button" className="btn btn-danger" onClick={clearCart}>
                Vaciar Carrito
              </button>
              <button type="button" className="btn btn-warning" data-bs-dismiss="modal">
                Seguir Comprando
              </button>
              <button type="button" className="btn btn-success" onClick={checkout}>
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
