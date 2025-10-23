import React, {useEffect, useState} from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "./HomePage.css";
import API_URL from "../api";

const HomePage = () =>{
    const [products, setProducts] = useState([]); //state to store products
    const [loading, setLoading] = useState(true);  //loading state

    useEffect(()=>{
        const fetchProduts = async () => {
            try{
                const response = await axios.get(API_URL + "/api/products");

                if(Array.isArray(response.data)){
                    setProducts(response.data);
                }
                else if(Array.isArray(response.data.products)){
                    setProducts(response.data.products);
                }
                else {
                    setProducts([]);
                }

                //setProducts(response.data);
                setLoading(false);
            }
            catch(error){
                console.error("error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProduts();

    }, []);

    if(loading){
        return <div>Loading products...</div>;
    }

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard key = {product.id} product = {product} />
            ))}
        </div>
    );
};

export default HomePage;