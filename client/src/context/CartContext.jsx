import React, {createContext, useState, useEffect} from "react";
import ProductCard from "../components/ProductCard";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    // ✅ Load cart from localStorage on first render
    useEffect( ()=>{
        const storedCart = localStorage.getItem("cart");
        if(storedCart){
            setCart(JSON.parse(storedCart));
        }

    }, []);

    // ✅ Save cart to localStorage whenever it changes
    useEffect( () =>{
        localStorage.setItem("cart", JSON.stringify(cart));

    }, [cart]);

    //Add product to cart
    const addToCart = (Product, qty = 1) =>{
        setCart((prevCart) => {
            const existing = prevCart.find( (item) => item._id == ProductCard._id );
            if(existing){
                return prevCart.map((item) =>
                item._id == Product._id
            ?{  ...item, quantity: item.quantity + qty}
        :item  );
            }
            return [...prevCart, {...Product, quantity: qty}];
        });
    };

     // ✅ Remove product from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  // ✅ Update quantity
  const updateQuantity = (id, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};