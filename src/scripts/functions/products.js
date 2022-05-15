import { collection, getDocs } from "firebase/firestore";

async function getProducts (db) {

    try {
       const collectionRef = collection(db,"products"); 
     const { docs } = await getDocs(collectionRef);

     const products = docs.map((doc)=> {
        console.log(doc) ;
        return {
              ...doc.data(),
              id: doc.id,
         };
     });
     return products;    

    } catch (e) {
        
    }

}

export {
    getProducts,
}
 