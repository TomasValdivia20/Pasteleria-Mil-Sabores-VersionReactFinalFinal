import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import "../css/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [producto, setProducto] = useState(null);
  const [tamanoSeleccionado, setTamanoSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" }); // ✅ notificación (texto + tipo)

  useEffect(() => {
    fetch("/data/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find((p) => p.id.toString() === id.toString());
        setProducto(encontrado);
        if (encontrado?.tamaños?.length === 1) {
          setTamanoSeleccionado(encontrado.tamaños[0]);
        }
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, [id]);

  if (!producto) return <div className="cargando">Cargando producto...</div>;

  const handleAgregar = () => {
    if (!tamanoSeleccionado) {
      // ❌ mensaje visual en vez de alert
      setMensaje({ texto: "⚠️ Debes seleccionar un tamaño antes de agregar al carrito.", tipo: "error" });
      setTimeout(() => setMensaje({ texto: "", tipo: "" }), 3000);
      return;
    }

    agregarAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      imagen: producto.imagen,
      precio: tamanoSeleccionado.precio,
      tamano:
        tamanoSeleccionado.personas
          ? `${tamanoSeleccionado.personas} personas`
          : tamanoSeleccionado.descripcion || "Tamaño único",
    });

    // ✅ mensaje visual de éxito
    setMensaje({ texto: "✅ Producto agregado al carrito.", tipo: "exito" });
    setTimeout(() => setMensaje({ texto: "", tipo: "" }), 2500);
  };

  return (
    <div className="producto-detalle">
      <div className="detalle-contenido">
        <div className="detalle-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        <div className="detalle-info">
          <h2>{producto.nombre}</h2>
          <p className="descripcion">{producto.descripcion}</p>

          {/* Selector de tamaño */}
          {producto.tamaños && producto.tamaños.length > 1 && (
            <div className="selector-tamano">
              <label htmlFor="tamano">Seleccionar tamaño:</label>
              <select
                id="tamano"
                onChange={(e) => {
                  const indice = e.target.value;
                  setTamanoSeleccionado(producto.tamaños[indice]);
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  -- Elegir tamaño --
                </option>
                {producto.tamaños.map((t, i) => (
                  <option key={i} value={i}>
                    {t.personas
                      ? `${t.personas} personas`
                      : t.descripcion || "Tamaño único"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Precio */}
          <p className="precio">
            {tamanoSeleccionado
              ? `$${tamanoSeleccionado.precio.toLocaleString("es-CL")}`
              : ""}
          </p>

          {/* Botón agregar */}
          <button
            className="boton-agregar"
            onClick={handleAgregar}
            disabled={!producto}
          >
            🛒 Agregar al Carrito
          </button>

          {/* ✅ Mensajes visuales */}
          {mensaje.texto && (
            <div
              className={`mensaje-notificacion ${
                mensaje.tipo === "exito" ? "mensaje-exito" : "mensaje-error"
              }`}
            >
              {mensaje.texto}
            </div>
          )}

          {/* Nutrición */}
          {tamanoSeleccionado?.nutricion && (
            <div className="nutricion">
              <h4>Información Nutricional (por porción)</h4>
              <ul>
                <li><strong>Peso total:</strong> {tamanoSeleccionado.nutricion.peso}</li>
                <li><strong>Energía:</strong> {tamanoSeleccionado.nutricion.energia}</li>
                <li><strong>Porción:</strong> {tamanoSeleccionado.nutricion.porcion}</li>
                <li><strong>Proteínas:</strong> {tamanoSeleccionado.nutricion.proteinas}</li>
                <li><strong>Grasas:</strong> {tamanoSeleccionado.nutricion.grasas}</li>
                <li><strong>Carbohidratos:</strong> {tamanoSeleccionado.nutricion.carbohidratos}</li>
                <li><strong>Azúcares:</strong> {tamanoSeleccionado.nutricion.azucares}</li>
                <li><strong>Sodio:</strong> {tamanoSeleccionado.nutricion.sodio}</li>
              </ul>
            </div>
          )}

          {/* Notas */}
          {producto.notas && (
            <p className="notas">
              <em>{producto.notas}</em>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
