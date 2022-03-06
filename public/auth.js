const email = 'leandrodavilamartins@gmail.com';
const password = '123456';

auth.signInWithEmailAndPassword(email,password).then( res => {
    console.log(res);
})