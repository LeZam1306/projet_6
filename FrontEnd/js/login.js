import  {postLogin} from "./api.js";

export async function login(){
    //we check if the email is correct
    let emailInput = document.getElementById("email");
    let formLogin = document.querySelector(".login__form");

    //add error indicator to memory
    let errorMailText = document.createElement("p");
    errorMailText.innerText = "Le mail n'est pas valide";
    errorMailText.classList.add("error-mail__text");

    let switchError = false;

    //added an addEventListenner on the mail input to adjust 
    //the display of the error on the mail or not
    emailInput.addEventListener("change", event =>{
        let regexEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

        if (!regexEmail.test(event.target.value)){
            emailInput.classList.add("error-mail__input");
            emailInput.after(errorMailText);
            switchError = true;

        }else if(regexEmail.test(event.target.value) && switchError == true){
            emailInput.classList.remove("error-mail__input");
            formLogin.removeChild(errorMailText); 
            switchError = false;           
        }
    });

}