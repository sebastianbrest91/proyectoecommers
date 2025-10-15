import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";

const ItemDetail = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const docRef = doc(db, "items", id);
                const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProducto({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log("Producto no encontrado");
            }
            } catch (error) {
                console.error("Error al obtener el producto:", error);
            } finally {
                setLoading(false);
            }
    };

    fetchProducto();
        }, [id]);

    const handleAdd = async () => {
        console.log("handleAdd ejecutado", producto, cantidad);
        const agregado = await addToCart(producto, cantidad);
        console.log("Resultado de addToCart:", agregado);
        if (agregado) {
            setAdded(true);
        }
    };

        if (loading) return <p>Cargando producto...</p>;
        if (!producto) return <p>Producto no encontrado.</p>;

        return (
            <div>
                <h2>{producto.name}</h2>
                <p>{producto.description}</p>
                <p>${producto.price}</p>
                <p>Stock disponible: {producto.stock}</p>

            <button onClick={() => alert("Click detectado")}>Test</button>

            {added ? (
        <Link to="/cart">
            <button>Ir al carrito</button>
        </Link>
        ) : (
        <>
            <input
            type="number"
            value={cantidad}
            min={1}
            max={producto.stock}
            onChange={(e) => setCantidad(Number(e.target.value))}
        />
            <button onClick={handleAdd}>Agregar al carrito</button>
        </>
    )}
    </div>
    );
};


export default ItemDetail;
