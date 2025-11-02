// src/components/Catalogo/ProductosList.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // 👈 Importa Link
import { cargarProductos, cargarCategorias } from "../../assets/data/dataLoader";
import "../../css/ProductosList.css";

export default function ProductosList() {
  const { categoriaId } = useParams();
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [todasCategorias, todosProductos] = await Promise.all([
          cargarCategorias(),
          cargarProductos(),
        ]);

        const categoriaSeleccionada = todasCategorias.find(
          (cat) => cat.id === parseInt(categoriaId)
        );
        setCategoria(categoriaSeleccionada);

        const productosFiltrados = todosProductos.filter(
          (prod) => prod.categoriaId === parseInt(categoriaId)
        );

        // Corrige rutas de imágenes (para /public y /src/assets/img)
        const productosConImagen = productosFiltrados.map((prod) => {
          let imgPath = prod.imagen;
          if (imgPath && !imgPath.startsWith("http")) {
            if (imgPath.startsWith("/")) {
              imgPath = imgPath; // ya es ruta pública (desde /public)
            } else if (imgPath.startsWith("src/")) {
              try {
                imgPath = new URL(
                  `../../../${imgPath.replace(/^src\//, "")}`,
                  import.meta.url
                ).href;
              } catch {
                console.warn("No se pudo resolver la imagen:", imgPath);
              }
            }
          }
          return { ...prod, imagen: imgPath };
        });

        setProductos(productosConImagen);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    }

    fetchData();
  }, [categoriaId]);

  if (!categoria) {
    return (
      <div className="text-center mt-5">
        <h2>Cargando categoría...</h2>
      </div>
    );
  }

  return (
    <div className="productos-page">
      <div className="productos-header">
        <h2>{categoria.nombre}</h2>
        <p>{categoria.descripcion}</p>
      </div>

      {productos.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay productos en esta categoría.
        </p>
      ) : (
        <div className="productos-grid">
          {productos.map((prod) => (
            <Link
              key={prod.id}
              to={`/producto/${prod.id}`} // ✅ Enlace al detalle
              className="producto-card-link"
            >
              <div className="producto-card">
                <img src={prod.imagen} alt={prod.nombre} />
                <h3>{prod.nombre}</h3>
                <p>{prod.descripcion}</p>
                <p className="producto-precio">
                  {prod.tamaños?.[0]?.precio
                    ? `$${prod.tamaños[0].precio.toLocaleString("es-CL")}`
                    : "$"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
