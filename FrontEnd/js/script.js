import {index} from "./index.js"
import {login} from "./login.js"

let pageName = window.location.pathname.replace("/",""); 
switch(pageName){
    case "login.html":
        await login();
        break;
    default:
        await index();
        break;
}
