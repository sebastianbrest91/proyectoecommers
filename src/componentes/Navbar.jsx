import Cartwidget from './Cartwidget.jsx'
import Logo from '../assets/logofem.jpg'

function Navbar () {
    return (
    <nav>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo MiTienda" style={{ height: '40px', marginRight: '10px' }} />
            <h2>Estudio Fem</h2>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '15px' }}>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Contacto</a></li>
        </ul>
        <Cartwidget />
    </nav>
    )
}

export default Navbar
