import { useEffect } from "react";
import { seedProducts } from "../firebase";
import { productos } from "./productos";

const Seed = () => {
    useEffect(() => {
        const confirmUpload = window.confirm("¿Seguro que querés subir los productos a Firebase?");
        if (confirmUpload) {
            seedProducts(productos);
        }
    }, []);

    return <div>Subiendo productos</div>;
};

export default Seed;