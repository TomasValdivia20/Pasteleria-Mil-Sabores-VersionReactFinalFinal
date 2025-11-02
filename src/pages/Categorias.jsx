// src/pages/Categorias.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cargarCategorias } from "../assets/data/dataLoader";
import "../css/Categorias.css";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    cargarCategorias().then(setCategorias);
  }, []);

  return (
    <div className="categorias-page">
      <h2 className="titulo-categorias">Categorías de Productos</h2>

      <div className="categorias-grid">
        {categorias.map((cat) => (
          <Link
            to={`/productos/${cat.id}`}
            key={cat.id}
            className="categoria-card-link"
            aria-label={`Ver productos de ${cat.nombre}`}
          >
            <div className="categoria-card">
              <img src={cat.imagen} alt={cat.nombre} className="categoria-imagen" />
              <div className="categoria-meta">
                <h3 className="categoria-nombre">{cat.nombre}</h3>
                <p className="categoria-descripcion">{cat.descripcion}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
