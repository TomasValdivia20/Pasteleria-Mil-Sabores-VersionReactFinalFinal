import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/* --- BLOQUE DE CSS --- */
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/general.css";
import "./css/catalogo.css";
import "./css/Home.css";

// Contextos
import { UserProvider } from "./context/UserContext";
import { CarritoProvider } from "./context/CarritoContext";

// Componentes globales
import Header from "./components/Header";
import Footer from "./components/Footer";

// Páginas
import Home from "./pages/Home";
import Categorias from "./pages/Categorias"; // muestra las categorías
import Carrito from "./pages/Carrito";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import ConfirmacionCompra from "./pages/ConfirmacionCompra";
import ProductDetail from "./pages/ProductDetail"; // ✅ Página de detalle de producto
import AcercaDeNosotros from "./pages/AcercaDeNosotros";
import CategoriaDetallePage from "./pages/CategoriaDetallePage";

// Blogs
import CategoriaBlogs from "./pages/CategoriaBlogs";
import DetalleBlog from "./pages/DetalleBlog";
import DetalleBlog1 from "./pages/DetalleBlog1";
import DetalleBlog2 from "./pages/DetalleBlog2";

// Componentes del catálogo
import ProductosList from "./components/Catalogo/ProductosList";

// Backoffice
import BackofficeDashboard from "./Backoffice/Dashboard";
import BackofficeOrdenes from "./Backoffice/Ordenes";
import BackofficeProducto from "./Backoffice/Producto";
import BackofficeCategoria from "./Backoffice/Categoria";
import BackofficeUsuario from "./Backoffice/Usuario";
import BackofficeReportes from "./Backoffice/Reportes";
import BackofficePerfil from "./Backoffice/Perfil";

function App() {
  return (
    <UserProvider>
      <CarritoProvider>
        <Router>
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/acercadenosotros" element={<AcercaDeNosotros />} />
              <Route path="/productos" element={<Categorias />} /> {/* muestra las categorías */}
              <Route path="/productos/:categoriaId" element={<CategoriaDetallePage />} />
              <Route
                path="/producto/:id"
                element={<ProductDetail />}
              /> {/* ✅ detalle del producto */}
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/confirmacion" element={<ConfirmacionCompra />} />

               {/* Rutas para el Blogs*/}
              <Route path="/blogs" element={<CategoriaBlogs />} />
              <Route path="/blogs/:slug" element={<DetalleBlog />} />
              <Route path="/blogs/cristalizacion-y-temperado-de-chocolate" element={<DetalleBlog1 />} />
              <Route path="/blogs/el-secreto-esta-en-la-ciencia-la-quimica-del-batido-cremoso" element={<DetalleBlog2 />} />

              {/* Rutas para el BackOffice */}

              <Route path="/backoffice" element={<BackofficeDashboard />} />
              <Route path="/backoffice/Dashboard" element={<BackofficeDashboard />} />
              <Route path="/backoffice/Ordenes" element={<BackofficeOrdenes />} />
              <Route path="/backoffice/Producto" element={<BackofficeProducto />} />
              <Route path="/backoffice/Categoria" element={<BackofficeCategoria />} />
              <Route path="/backoffice/Usuario" element={<BackofficeUsuario />} />
              <Route path="/backoffice/Reportes" element={<BackofficeReportes />} />
              <Route path="/backoffice/Perfil" element={<BackofficePerfil />} />
              <Route path="/backoffice" element={<BackofficeDashboard />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CarritoProvider>
    </UserProvider>
  );
}

export default App;
