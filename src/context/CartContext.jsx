import { createContext, useContext, useState, useEffect } from "react";
import { restarStock, devolverStock } from '../firebase';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
    const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const increaseQuantity = async (id) => {
        const productInCart = cart.find(item => item.id === id);
        if (!productInCart) return;
        if (productInCart.quantity + 1 > productInCart.stock) {
            alert("No hay stock");
            return;
        }
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
        setCart(updatedCart);
    };

    const decreaseQuantity = (id) => {
        const productInCart = cart.find((item) => item.id === id);
        if (!productInCart) return;

        if (productInCart.quantity === 1) {
            setCart(cart.filter((item) => item.id !== id));
        } else {
            const updatedCart = cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
        setCart(updatedCart);
        }
    };

    const addToCart = (item, quantity) => {
        const existing = cart.find((prod) => prod.id === item.id);
        const totalQuantity = existing ? existing.quantity + quantity : quantity;

        if (totalQuantity > item.stock) {
            alert("No hay suficiente stock disponible.");
        return false;
        }

        if (existing) {
            const updatedCart = cart.map((prod) =>
                prod.id === item.id ? { ...prod, quantity: totalQuantity } : prod
            );
        setCart(updatedCart);
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
        return true;
    };

    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, totalItems,totalPrice, }} >
            {children}
        </CartContext.Provider>
    );
};
