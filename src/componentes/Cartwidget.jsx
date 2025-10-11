import { useCart } from "../context/CartContext";

const CartWidget = () => {
    const { totalItems } = useCart();
    return (
        <span>
            🛒 {totalItems > 0 && <span>{totalItems}</span>}
        </span>
    );
};

export default CartWidget;