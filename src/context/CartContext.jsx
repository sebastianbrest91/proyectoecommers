import { createContext, useContext, useState } from "react";
import { restarStock, devolverStock } from '../firebase';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = async (item, quantity) => {
        const existing = cart.find(prod => prod.id === item.id);
        const totalQuantity = existing ? existing.quantity + quantity : quantity;
        const itemRef = doc(db, "items", item.id);
        const itemSnap = await getDoc(itemRef);
        const currentStock = itemSnap.exists() ? itemSnap.data().stock : 0;
    if (totalQuantity > currentStock) {
        alert(`Solo quedan ${currentStock} unidades disponibles`);
        return false;
        }
    await restarStock(item.id, quantity);
    if (existing) {
    const updatedCart = cart.map(prod =>
        prod.id === item.id ? { ...prod, quantity: totalQuantity } : prod
    );
    setCart(updatedCart);
    } else {
    setCart([...cart, { ...item, quantity }]);
    } return true;
};

    const removeFromCart = async (id) => {
        const itemToRemove = cart.find(item => item.id === id);
        if (itemToRemove) {
            await devolverStock(itemToRemove.id, itemToRemove.quantity);
            setCart(cart.filter(item => item.id !== id));
        }
    }

    const clearCart = async () => {
        for (const item of cart) {
            await devolverStock(item.id, item.quantity);
        }
        setCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
        {children}
    </CartContext.Provider>
    );
};
