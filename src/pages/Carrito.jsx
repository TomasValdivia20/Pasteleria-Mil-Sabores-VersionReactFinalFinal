// src/pages/Carrito.jsx
import React from "react";
import "../css/Carrito.css";
import { useCarrito } from "../context/CarritoContext";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();

  const calcularTotal = () => {
    return carrito.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
  };

  return (
    <div className="carrito-container">
      <h2>🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">Tu carrito está vacío.</p>
      ) : (
        <>
          <table className="carrito-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>${item.precio.toLocaleString()}</td>
                  <td>{item.cantidad}</td>
                  <td>${(item.precio * item.cantidad).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="carrito-total">
            <h3>Total: ${calcularTotal().toLocaleString()}</h3>
            <div className="carrito-botones">
              <button className="btn-vaciar" onClick={vaciarCarrito}>
                Vaciar carrito
              </button>
              <button
                className="btn-comprar"
                onClick={() => (window.location.href = "/confirmacion")}
              >
                Confirmar compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
