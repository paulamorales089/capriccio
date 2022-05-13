
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


async function addProduct(db, product) {

    try {
        await addDoc(collection(db, "products"),product);  
        console.log("product added");      
    } catch (e) {
        console.log(e);        
    }
}
async function imageUpLoadReference(storage, image) {
    let ro = 'products/images/'+image.name;
    const storageRef = ref(storage,ro);
    console.log(storageRef)
    return await uploadBytes(storageRef, image);
}

async function upLoadImages (storage, images = [] ){

    const upLoadedImages = images.map(async (image) => {

        const imageReference = await imageUpLoadReference(storage, image);
        // console.log(imageReference);
        return getDownloadURL(ref(storage, imageReference.ref.fullPath));

    });
    return upLoadedImages;

}

export {
    addProduct,
    upLoadImages,
}