
import { useParams } from "react-router-dom";
import blogs from "../assets/data/blogs.json";
import blogImages from "../utils/blogImages";

export default function DetalleBlog() {
  const { slug } = useParams();
  let blog = null;

  if (slug) {
    blog = blogs.find((b) => b.slug === slug);
    if (!blog) {
      const maybeId = parseInt(slug, 10);
      if (!Number.isNaN(maybeId)) {
        blog = blogs.find((b) => b.id === maybeId);
      }
    }
  }

  if (!blog) return <p>Blog no encontrado.</p>;

  return (
    <div className="detalle-blog-container">
      <header>
      </header>

      <section className="page-section">
        <div className="detalle-blog">
          <h2 className="pacifico-regular">{blog.titulo}</h2>
          <p className="blog-fecha">{blog.fecha}</p>
          <img src={blogImages[blog.id] || blog.imagen} alt={blog.titulo} className="detalle-blog-img" />
        </div>
      </section>

      <footer className=" text-faded text-center py-5">
        <div className="container">
        </div>
      </footer>
    </div>
  );
}
