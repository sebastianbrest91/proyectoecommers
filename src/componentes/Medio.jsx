import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {getProductsFromFirebase, 
getProductsByCategoryFromFirebase} from '../firebase';
import './Medio.css';
import { useCart } from '../context/CartContext';

const Medio = ({ section }) => {
    const { sectionId, categoriaId } = useParams();
    
    const currentSection = section || sectionId || "inicio";

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    async function fetchData() {
    setLoading(true);
    try {
        if (currentSection === "productos") {
        const data = categoriaId
            ? await getProductsByCategoryFromFirebase(categoriaId)
            : await getProductsFromFirebase();
        setProductos(data);
        }
        } catch (error) {
        console.error("Error al cargar productos:", error);
        } finally {
        setLoading(false);
        }
    }

    fetchData();
    }, [currentSection, categoriaId]);

const { addToCart } = useCart();

const handleAgregarAlCarrito = async (producto) => {
    const agregado = await addToCart(producto, 1);

    if (agregado) {
        const data = categoriaId
            ? await getProductsByCategoryFromFirebase(categoriaId)
            : await getProductsFromFirebase();
        setProductos(data);
    } else {
        alert("Sin Stock");
    }
};

    const renderContent = () => {
        switch (currentSection) {
        case "inicio":
    return (
        <div>
            <h2>¡Bienvenido a Estudio Fem!</h2>
            <h1>CENTRO ESTÉTICO UNISEX</h1>

            <div>
                <iframe 
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/Fjj8YrfrA1w?si=WcJm8OAY0rnHYKJx"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>

            <p>Aplicamos los mejores tratamientos estéticos evaluando <strong>TUS</strong> necesidades y <strong>TUS</strong> metas.</p>

            <div>
                <h2>Maca</h2>
                <img src="https://nucleocursos.com.br/blog/wp-content/uploads/2023/03/Saiba-tudo-sobre-a-Profissao-Esteticista-768x576.jpeg" alt="Maca" />
                <p>Cosmetóloga, cosmiatra y esteticista</p>
            </div>

            <div>
                <h2>Moni</h2>
                <img src="https://nucleocursos.com.br/blog/wp-content/uploads/2023/03/Saiba-tudo-sobre-a-Profissao-Esteticista-768x576.jpeg" alt="Moni" />
                <p>Masajista, cosmetóloga y operadora de depilación láser</p>
            </div>

            <div>
                <h2>Flor</h2>
                <img src="https://nucleocursos.com.br/blog/wp-content/uploads/2023/03/Saiba-tudo-sobre-a-Profissao-Esteticista-768x576.jpeg" alt="Flor" />
                <p>Manicura especializada en técnicas soft gel y esculpidas</p>
            </div>
        </div>
    );
        case "productos":
        return (
            <div>
            <h2>Productos</h2>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/section/productos" style={{ marginRight: '10px' }}>Todos</Link>
                <Link to="/section/productos/sahumerios" style={{ marginRight: '10px' }}>Sahumerios</Link>
                <Link to="/section/productos/cremas">Cremas</Link>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {loading ? (
                <p>Cargando productos...</p>
                ) : productos.length === 0 ? (
                <p>No hay productos en esta categoría.</p>
                ) : (
                productos.map((producto) => (
                    <div
                        key={producto.id}
                        style={{
                            border: '1px solid #ccc',
                            padding: '10px',
                            width: '200px'
                            }}>
            <img
                src={producto.image}
                alt={producto.name}
                style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover'
            }}/>
            <h3>{producto.name}</h3>
            <p>{producto.description}</p>
            <p><strong>${producto.price}</strong></p>
            <p>Stock disponible: {producto.stock}</p>
            {producto.stock > 0 ? (
                <button onClick={() => handleAgregarAlCarrito(producto)}>
                    Agregar al carrito
                </button>
            ) : (
                <button disabled style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}>
                    Sin stock
                </button>
            )}
            </div>
        ))
            )}
        </div>
    </div>
        );

        case "contacto":
        return (
    <div>
        <p>Por pedidos envianos un mail a: contacto@estudiofem.com</p>
        <div>
            <h3>Podes encontrarnos en:</h3>
            <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="500"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    </div>
);

        default:
        return <h2>404 - No funciona</h2>;
    }
    };

    return (
    <main className="main-grid">
        <div className="grid-content">
        {renderContent()}
        </div>
    </main>
    );
};

export default Medio;