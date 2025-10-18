import React from "react";
import {Link} from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({product}) => {
    return (
        <div className="product-card">
            <img src = {product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <Link to = {`/product/${product._id}`} className="view-button" >
            view details
            </Link>
        </div>
    );
};

export default ProductCard;