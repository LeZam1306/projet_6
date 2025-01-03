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
    }catch(error)
    {
        console.log(`Message : ${error.message}`);
    }
}
//Function for get works data in the api
export async function getWorks(){
   return await getAny("http://localhost:5678/api/works");
}
//function for get caterogies
export async function getCategories(){
    return await getAny("http://localhost:5678/api/categories");
 }