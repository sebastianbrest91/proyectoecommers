import { useCart } from "../context/CartContext";

const ItemDetail = ({ producto }) => {
    const [cantidad, setCantidad] = useState(1);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();
    const handleAdd = () => {
    addToCart(producto, cantidad);
    setAdded(true);
    };
    return (
        <div>
            <h2>{producto.name}</h2>
            <p>{producto.description}</p>
            <p>${producto.price}</p>

        {added ? (
        <Link to="/cart"><button>Ir al carrito</button></Link>
        ) : (
        <>
            <input
            type="number"
            value={cantidad}
            min={1}
            onChange={(e) => setCantidad(Number(e.target.value))}
            />
            <button onClick={handleAdd}>Agregar al carrito</button>
            </>
        )}
        </div>
    );
};
