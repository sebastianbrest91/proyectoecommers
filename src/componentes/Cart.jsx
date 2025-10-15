import { useCart } from "../context/CartContext";

const Cart = () => {
    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();
    
    console.log("Contenido del carrito:", cart);

    if (cart.length === 0) {
    return <h2>Carrito vacío</h2>;
    }
    const phoneNumber = "5491166707791";
    let message = "Hola, quiero realizar un pedido:%0A";
    cart.forEach(producto => {
    message += `- ${producto.name} (Cantidad: ${producto.quantity})%0A`;
    });

    message += `Total: $${totalPrice.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <div>
            <h2>Tu carrito</h2>
            {cart.map(producto => (
            <div key={producto.id} style={{ marginBottom: "20px" }}>
            <h3>{producto.name}</h3>
            <p>Cantidad: {producto.quantity}</p>
            <button onClick={() => decreaseQuantity(producto.id)}>-</button>
            <button onClick={() => increaseQuantity(producto.id)}>+</button>
            <p>Precio: ${producto.price}</p>
            <p>Subtotal: ${producto.quantity * producto.price}</p>
            <button onClick={() => removeFromCart(producto.id)}>Eliminar</button>
        </div>
    ))}
            <h3>Total: ${totalPrice}</h3>
            <button onClick={clearCart}>Vaciar carrito</button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><button>Finalizar compra</button></a>
        </div>
    );
};

export default Cart;