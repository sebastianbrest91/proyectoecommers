import { useCart } from "../context/CartContext";

const CartWidget = () => {
    const { totalItems, cart } = useCart();
    
    console.log("Carrito desde CartWidget:", cart);

    return (
        <span>
            🛒 {totalItems > 0 && <span>{totalItems}</span>}
        </span>
    );
};

export default CartWidget;