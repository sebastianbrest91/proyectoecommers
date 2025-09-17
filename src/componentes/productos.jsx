import sahumerio from '../assets/sahumerio.jpg';
import rutinaexfoliante from '../assets/rutinaexfoliante.jpeg';
import rutinaacne from '../assets/rutinaacne.jpeg';
import rutinapielgrasa from '../assets/rutinapielgrasa.jpeg';
import rutinapielseca from '../assets/rutinapielseca.jpeg';

const products = [
    {
    id: "1",
    name: "Sahumerio Lavanda",
    price: 2000,
    category: "sahumerios",
    description: "Sahumerio natural de lavanda, perfecto para relajarte y purificar el ambiente.",
    image: sahumerio,
    },
    {
    id: "2",
    name: "Sahumerio Palo Santo",
    price: 2500,
    category: "sahumerios",
    description: "Sahumerio de Palo Santo, conocido por sus propiedades purificadoras y espirituales.",
    image: sahumerio,
    },
    {
    id: "3",
    name: "Sahumerio Sándalo",
    price: 2200,
    category: "sahumerios",
    description: "Sahumerio de sándalo, ideal para meditación y armonización del espacio.",
    image: sahumerio,
    },
    {
    id: "4",
    name: "Sahumerio Eucalipto",
    price: 2300,
    category: "sahumerios",
    description: "Sahumerio de eucalipto, fresco y energizante para revitalizar ambientes.",
    image: sahumerio,
    },
    {
    id: "5",
    name: "Rutina Exfoliante",
    price: 55000,
    category: "cremas",
    description: "Incluye gel exfoliante y crema regeneradora.",
    image: rutinaexfoliante,
    },
    {
    id: "6",
    name: "Rutina Anti Acné",
    price: 62000,
    category: "cremas",
    description: "Tratamiento completo para piel con tendencia acneica.",
    image: rutinaacne,
    },
    {
    id: "7",
    name: "Rutina Piel Grasa",
    price: 60000,
    category: "cremas",
    description: "Limpieza profunda y control de brillo facial.",
    image: rutinapielgrasa,
    },
    {
    id: "8",
    name: "Rutina Piel Seca",
    price: 58000,
    category: "cremas",
    description: "Hidratación intensiva para piel seca y sensible.",
    image: rutinapielseca,
    },
];

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(products), 1000);
    });
};

export const getProductById = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(products.find((p) => p.id === id)), 1000);
    });
};

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(products.filter((p) => p.category === categoryId)), 1000);
    });
};
