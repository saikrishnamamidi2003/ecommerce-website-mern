import React, {createContext, useState, useEffect, Children} from "react";
import ProductCard from "../components/ProductCard";

export const CartContext = createContext();

export const CartProvider = ({Children}) => {
    const [cart, setCart] = useState([]);

    // ✅ Load cart from localStorage on first render
    useEffect( ()=>{
        const storedCart = loacalStorage.getItem("cart");
        if(storedCart){
            setCart(JSON.parse(storedCart));
        }

    }, []);

    // ✅ Save cart to localStorage whenever it changes
    useEffect( () =>{
        localStorage.setItem("cart", JSON.stringify(cart));

    }, [cart]);

    //Add product to cart
    const addTocart = (Product, qty = 1) =>{
        setCart((prevCart) => {
            const existing = prevCart.find( (item) => item.id == ProductCard.id );
            if(existing){
                return prevCart.map((item) =>
                item.id == Product.id
            ?{  ...item, quantity: item.quantity + qty}
        :item  );
            }
            return [...prevCart, {...Product, quantity: qty}];
        });
    };

     // ✅ Remove product from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // ✅ Update quantity
  const updateQuantity = (id, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};