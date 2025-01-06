import { postLogin } from "./api.js";

export async function login(){
    function checkValidMail(){
        //we check if the email is correct
        const emailInput = document.getElementById("email");
        const formLogin = document.querySelector(".login__form");

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
    checkValidMail()
    async function submitLoginInfo(){
        const formLogin = document.querySelector(".login__form");

        let switchError = false;

        formLogin.addEventListener("submit", async function (event) {
                event.preventDefault();

                let password = document.getElementById("password");
                let email = document.getElementById("email");
                let loginForm = document.querySelector(".login__form");
                password = password.value;
                email = email.value;

                let errorLogin = document.createElement("p");
                errorLogin.classList.add("error-login");
                errorLogin.innerText = "Email ou mot de passe incorrect";

                let regexEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

                if (password != "" && regexEmail.test(email)) {
                    try{
                        let data = await postLogin({
                            email: email,
                            password: password
                        });
                        
                        if (data.id != "" && data.token != ""){
                            localStorage.setItem("token", JSON.stringify(data.token));
                            window.location.replace("http://127.0.0.1:5500/index.html");
                        }
                    }catch{
                        if(switchError == false){
                            switchError = true;
                            document.querySelector('label[for="email"]').before(errorLogin);
                        }
                    }
                }
            });
    }
    await submitLoginInfo();
}