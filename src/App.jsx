import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './componentes/Navbar';
import Medio from './componentes/Medio';
import Futer from './componentes/Futer';
import Seed from './componentes/Seed';
import Cart from "./componentes/Cart";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Medio section="inicio" />} />
          <Route path="/section/:sectionId" element={<Medio />} />
          <Route path="/section/:sectionId/:categoriaId" element={<Medio />} />
          <Route path="/seed" element={<Seed />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h2>404 - No funciona</h2>} />
      </Routes>
      <Futer />
    </BrowserRouter>
  );
}

export default App;
