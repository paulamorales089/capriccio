//FUNCION PARA CREAR EL USUARIO
async function createUser(name, lastname, email, password) {
    // siempre que usemos un await hay que usar un catch
    try {
       const { user } = await createUserWithEmailAndPassword(auth, email, password);
       alert(`Welcome, user ${user.email}`);
       //console.log(newUser);      
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
  async function login(email, password) {

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (e) {

      console.log(e);

      alert("Email or password is not correct");
      /*if (e.code === "auth/wrong-password") {
        alert("Your password is not correct");
      }      
      if (e.code === "auth/user-not-found") {
        alert("User not found");
      }*/      
    }
    
  }

  export {
      createUser,
      login,
  }