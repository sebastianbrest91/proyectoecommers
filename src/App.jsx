import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './componentes/Navbar';
import Medio from './componentes/Medio';
import Futer from './componentes/Futer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Medio section="inicio" />} />
        <Route path="/section/:sectionId" element={<Medio />} />
        <Route path="/section/:sectionId/:categoriaId" element={<Medio />} />
        <Route path="*" element={<h2>404 - No funciona</h2>} />
      </Routes>
      <Futer />
    </BrowserRouter>
  );
}

export default App;
