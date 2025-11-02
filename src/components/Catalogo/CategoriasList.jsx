import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/Categorias.css";

export default function CategoriasList() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function cargarCategorias() {
      try {
        const response = await fetch("/data/categorias.json");
        if (!response.ok) throw new Error("Error al cargar las categorías");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    }
    cargarCategorias();
  }, []);

  return (
    <div className="categorias-page">
      <div className="categorias-header">
        <h2 class>Categorías de Productos</h2>
        <p>Elige una categoría para ver los productos disponibles</p>
      </div>

      <div className="categorias-grid">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="categoria-card">
            <Link to={`/productos/${categoria.id}`}>
              <div className="categoria-imagen">
                <img src={categoria.imagen} alt={categoria.nombre} />
              </div>
              <div className="categoria-info">
                <h3>{categoria.nombre}</h3>
                <p>{categoria.descripcion}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
