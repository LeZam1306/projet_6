//function for get any elements
async function getAny(request){
    try{
        let reponse = await fetch(request);
        if (!reponse.ok){
            throw new Error(`Error ${reponse.status} for ${request}`);
        }else{
            let data = await reponse.json();
            return data;
        }
    }catch(error){
        console.error(`Message : ${error.message}`);
    }
}
//function for past any request with data
async function postAny(request,data){
    try{
        let reponse = await fetch(request, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        switch (reponse.status){
            case 401:
                throw new Error("Not Authorized");
            case 404:
                throw new Error("User not found");
        }
        reponse = await reponse.json();
        return reponse;
    }catch(error){
        console.log(error.message);
    }
}
//Function for post login to the API
export async function postLogin(data){
    return await postAny("http://localhost:5678/api/users/login",data);
}
//Function for get works data in the api
export async function getWorks(){
   return await getAny("http://localhost:5678/api/works");
}
//function for get caterogies
export async function getCategories(){
    return await getAny("http://localhost:5678/api/categories");
}
export async function removeWorks(id){
    
    try{
        let token = JSON.parse(window.localStorage.getItem("token"));

        let reponse = await fetch(`http://localhost:5678/api/works/${id}`,{
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (reponse.ok){
                return true;
        }else{
            switch(reponse.status){
                case 401:
                    throw new Error("Action non authoriser");
                default:
                    throw new Error(`Comportement inattendu, code : ${reponse.status}`);
            }
        }
    }catch(error){
        console.log(error.message);
    }
}