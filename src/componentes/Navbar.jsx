import { Link } from 'react-router-dom';
import Cartwidget from './Cartwidget.jsx';
import Logo from '../assets/logofem.jpg';
import './Navbar.css';

function Navbar () {
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
            <Cartwidget />
        </nav>
    );
}

export default Navbar;