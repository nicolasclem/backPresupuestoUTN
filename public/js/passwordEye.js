
// hacer visible la  contraseña

let inputPass = document.querySelector('.inputP');
let eye = document.querySelector('.inputE');

eye.addEventListener("click",() =>{
  if(inputPass.type === "password"){
    eye.classList.remove("fa-eye-slash");
    eye.classList.add("fa-eye");
    inputPass.type ="text";
  }else{
    eye.classList.remove("fa-eye");
    eye.classList.add("fa-eye-slash");
    inputPass.type ="password";
  }
})