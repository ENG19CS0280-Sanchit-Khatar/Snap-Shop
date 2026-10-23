import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = (props) => {
  const { product } = props;
  const location = useLocation();
  return (
    <Link
      to={`/products/${product.id}${location.search}`}
      state={{ from: `${location.pathname}${location.search}` }}
      className="product-card"
    >
      <div className="product-card-image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-card-image"
        />
      </div>

      <div className="product-card-content">
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-rating">
          <span className="rating-fallback">★ {product.rating}</span>
        </div>

        <div className="product-card-footer">
          <span className="product-card-price">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
