import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import "../styles/ProductListingPage.css";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch((fetchError) => setError(fetchError.message));
  }, [id]);

  if (error) return <p className="error-state">Error: {error}</p>;
  if (!product) return <p className="loading-state">Loading product...</p>;

  return (
    <main className="product-detail">
      <button
        className="product-detail-back"
        type="button"
        onClick={() => navigate(location.state?.from || `/${location.search}`)}
      >
        <ArrowLeft size={16} />
        Back
      </button>
      <img src={product.images?.[0] || product.thumbnail} alt={product.title} />
      <section>
        <h1>{product.title}</h1>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <p className="product-card-rating">
          <span className="rating-fallback">★ {product.rating}</span>
        </p>
        <p>Discription: {product.description}</p>
        <p>Brand: {product.brand || "Not specified"}</p>
        <p>Category: {product.category}</p>
      </section>
    </main>
  );
};

export default ProductDetail;
