import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, clearCart, totalPrice } = useCart();
    if (cart.length === 0) {
    return <h2>Carrito vacío</h2>;
    }
    return (
        <div>
            <h2>Tu carrito</h2>
            {cart.map(producto => (
            <div key={producto.id} style={{ marginBottom: "20px" }}>
            <h3>{producto.name}</h3>
            <p>Cantidad: {producto.quantity}</p>
            <p>Precio: ${producto.price}</p>
            <p>Subtotal: ${producto.quantity * producto.price}</p>
            <button onClick={() => removeFromCart(producto.id)}>Eliminar</button>
        </div>
    ))}
            <h3>Total: ${totalPrice}</h3>
            <button onClick={clearCart}>Vaciar carrito</button>
            <Link to="/checkout"><button>Finalizar compra</button></Link>
    </div>
    );
};

export default Cart;