import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore, getDocs, doc, addDoc,query, where, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBQoA5YjFpEoaAtu1Q-aqLbq-H93T6QW0U",
    authDomain: "ecommerssb.firebaseapp.com",
    projectId: "ecommerssb",
    storageBucket: "ecommerssb.firebasestorage.app",
    messagingSenderId: "625950110419",
    appId: "1:625950110419:web:f40473b7024fb3df09da26",
    measurementId: "G-2VF293D4KN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

export async function getProductsFromFirebase() {
    const q = collection(db, "items");
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    }));
}

export async function getProductsByCategoryFromFirebase(category) {
    const q = query(collection(db, "items"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    }));
}

export async function seedProducts(productos) {
    const itemsCollection = collection(db, "items");
    for (let producto of productos) {
    try {
        await addDoc(itemsCollection, producto);
        console.log(`Producto agregado: ${producto.name}`);
    } catch (error) {
        console.error("Error al agregar producto:", error);
        }
    }
}

export async function restarStock(productoId, cantidad) {
    const itemRef = doc(db, "items", productoId);
    const itemSnap = await getDoc(itemRef);

    if (itemSnap.exists()) {
        const currentStock = itemSnap.data().stock || 0;

        if (currentStock >= cantidad) {
            await updateDoc(itemRef, {
                stock: currentStock - cantidad
            });
            return true;
        } else {
            console.warn("Stock insuficiente");
            return false;
        }
    } else {
        console.error("Producto no encontrado para restar stock");
        return false;
    }
}

export async function devolverStock(productoId, cantidad) {
    const itemRef = doc(db, "items", productoId);
    const itemSnap = await getDoc(itemRef);

    if (itemSnap.exists()) {
        const currentStock = itemSnap.data().stock || 0;
        await updateDoc(itemRef, {
            stock: currentStock + cantidad
        });
        return true;
    } else {
        return false;
    }
}

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

