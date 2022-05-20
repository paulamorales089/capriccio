// en espera de algo 
//IMPORT CREAT USER AND LOGIN 
import { db, auth} from "./app";
import { createUser, login, addUserToDatabase } from "./functions/auth";
import { createFirebaseCart } from "./functions/cart";



  const loginForm = document.getElementById("loginForm");
  const signupBtn = document.getElementById("signupBtn");

  const createUserForm = document.getElementById("createUserForm");
  const loginBtn = document.getElementById("loginBtn");

  

  //CREAR USUARIO SUBMIT
  createUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    // aqui entro al elemento y obtengo su contenido
    const name = createUserForm.name.value;
    const lastName = createUserForm.lastName.value;
    const email = createUserForm.email.value;
    const password = createUserForm.password.value;

    const newUser = {
      name, 
      lastName,
      email,
      password,
      isAdmin: false,
    };

    const userCreated = await createUser(auth, newUser);
    await addUserToDatabase(db, userCreated.uid, newUser);
    console.log(userCreated);    
    await createFirebaseCart (db, userCreated.uid, [{name: "prove"}]);

    alert(`Wellcome, ${name}`);
  });
  
    //Open login form
  loginBtn.addEventListener("click", e =>{
    //Hide sign up form and button
    createUserForm.classList.remove('createUserForm--show');
    loginBtn.classList.add('registration__registration--hide');

    //Show login form and button
    loginForm.classList.remove('loginForm--hide');
    signupBtn.classList.remove('registration__registration--hide');
  });

  
  //CREAR LOGIN SUBMIT
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    login(auth, email, password);

    //RECUPERAR INFROMACION ADICIONAL DEL USUARIO
    // if (user.isAdmin){
    //   location.href="./createProduct.html";
    // }else{
    //   location.href="./products.html";
    // }
    
  });

    //Open sign up form
  signupBtn.addEventListener("click", e =>{
    //Hide login form and button
    loginForm.classList.add('loginForm--hide');
    signupBtn.classList.add('registration__registration--hide');

    //Show sign up form and button
    createUserForm.classList.add('createUserForm--show');
    loginBtn.classList.remove('registration__registration--hide');
  });


  