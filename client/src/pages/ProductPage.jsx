import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";

const ProductPage = () =>{
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>{
      const fetchProduct = async ()=> {
        try{
          const response = await axios.get(`/api/products/${id}`);
          setProduct(response.data);
          setLoading(false);
        }
        catch (error){
          console.log("Error fetching product:", error);
          setLoading(false);
        }
      };
      fetchProduct();
    }, [id]
  );

  if(loading) return <di>Loading product...</di>
  if(!product) return <div>Product not found!</div>

  return (
    <div className="product-page">
      <img src={product.image} alt={product.name} className="product-page-image" />
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>Price : ₹{product.price} </p>
        <p>{product.description}</p>
      </div>
    </div>
  );

};

export default ProductPage;