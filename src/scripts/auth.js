import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


//FUNCION PARA CREAR EL USUARIO
async function createUser(auth, { email, password }) {
    // siempre que usemos un await hay que usar un catch
    try {
       const { user } = await createUserWithEmailAndPassword(auth, email, password);
       return user;
        
    } catch (e) {
      if (e.code === "auth/weak-password") {
        alert("Your password must be at least 6 characters long");
      }
      if (e.code === "auth/email-already-in-use") {
        alert("This email is already used");
      }
    }
  } 

  //FUNCION PARA LOGUEARSE
  async function login(auth, email, password) {

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (e) {

      console.log(e);

      alert("Email or password is not correct");          
    }    
  }

  async function addUserToDatabase (db, userId, userInfo){
    try {
      await setDoc(doc(db, "users", userId), userInfo);
      
    } catch (e) {
      console.log(e);
    }
  }


  export {
      createUser,
      login,
      addUserToDatabase,
  }