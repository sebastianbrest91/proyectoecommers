import { Link, NavLink } from 'react-router-dom';
import CartWidget from './Cartwidget';
import Logo from '../assets/logofem.jpg';
import './Navbar.css';
import { useCart } from '../context/CartContext';

function Navbar () {
    const { totalItems } = useCart();
    return (
        <nav>
            <div className="logo-container">
                <img src={Logo} alt="Logo" />
                <h2>Estudio Fem</h2>
            </div>
            <ul>
                <li><Link to="/section/inicio">Inicio</Link></li>
                <li><Link to="/section/productos">Productos</Link></li>
                <li><Link to="/section/contacto">Contacto</Link></li>
            </ul>
            <div>
                <NavLink to="/cart">
                    <CartWidget totalItems={totalItems} />
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;