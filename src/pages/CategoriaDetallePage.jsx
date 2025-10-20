// src/pages/CategoriaDetallePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cargarProductos } from "../assets/data/dataLoader";
import "../css/catalogo.css";

function CategoriaDetallePage() {
  const { categoriaId } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function obtenerDatos() {
      const categorias = await cargarCategorias();
      const productos = await cargarProductos();

      const categoriaSeleccionada = categorias.find(
        (cat) => cat.id === parseInt(categoriaId)
      );
      const productosFiltrados = productos.filter(
        (prod) => prod.categoriaId === parseInt(categoriaId)
      );

      setCategoria(categoriaSeleccionada);
      setProductos(productosFiltrados);
    }

    obtenerDatos();
  }, [categoriaId]);

  if (!categoria) return <p>Cargando...</p>;

  return (
    <section className="catalogo-container">
      <h2 className="titulo-seccion">{categoria.nombre}</h2>
      <p className="categoria-descripcion">{categoria.descripcion}</p>

      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen"
            />
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-precio">
              Desde ${producto.precios?.[0]?.precio || "—"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoriaDetallePage;
