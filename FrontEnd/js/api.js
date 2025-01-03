//Function for get works data in the api
export async function getWorks(){
    try{
        let reponse = await fetch("http://localhost:5678/api/works");
        if (!reponse.ok){
            throw new Error(`Error ${reponse.status} for api/works`);
        }else{
            let data = await reponse.json();
            //console.log(data);
            return data;
        }
    }catch(error)
    {
        console.log(`Message : ${error.message}`);
    }
}