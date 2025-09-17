import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts, getProductsByCategory } from '../componentes/productos';
import './Medio.css';

const Medio = ({ section }) => {
    const { sectionId, categoriaId } = useParams();
    
    const currentSection = section || sectionId || "inicio";

    const [productos, setProductos] = useState([]);
    
    useEffect(() => {
        if (currentSection === "productos") {
            if (categoriaId) {
                getProductsByCategory(categoriaId).then(setProductos);
            } else {
                getProducts().then(setProductos);
            }
        }
    }, [currentSection, categoriaId]);

    const renderContent = () => {
        switch (currentSection) {
            case "inicio":
                return <h2>¡Bienvenido a Estudio Fem!</h2>;
            case "productos":
                return <div>
                        <h2>Productos</h2>
                        <div style={{ marginBottom: '20px' }}>
                            <Link to="/section/productos" style={{ marginRight: '10px' }}>Todos</Link>
                            <Link to="/section/productos/sahumerios" style={{ marginRight: '10px' }}>Sahumerios</Link>
                            <Link to="/section/productos/cremas">Cremas</Link>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {productos.length === 0 ? (
                        <p>Cargando productos...</p>
                    ) : (
                    productos.map((producto) => (
                        <div key={producto.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                            <img src={producto.image} alt={producto.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                            <h3>{producto.name}</h3>
                            <p>{producto.description}</p>
                            <p><strong>${producto.price}</strong></p>
                            </div>
                    ))
                    )}
                    </div>
                </div>;
            case "contacto":
                return <p>Por pedidos envianos un mail a: contacto@estudiofem.com</p>;
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