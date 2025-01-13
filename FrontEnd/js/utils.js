import { removeWorks } from "./api.js";
//Function for create a template element of the galery
function createElementGallery(imageSrc,title,id){
    return `
        <figure data-id="${id}">
            <img src="${imageSrc}" alt="${title}">
            <figcaption>${title}</figcaption>
        </figure>
    `;
}
//function for create a filter item
export function createElementFilter(parent,name){
    let filterElement = document.createElement("div");
    filterElement.classList.add("filter__item");
    filterElement.dataset.name = name;
    filterElement.innerText = name;
    parent.appendChild(filterElement);
}
//dynamic display of elements in the page
export function dynamicDisplayGallery(array,parent){
    parent.innerHTML = ""; //Delete preset gallery
    array.forEach(data => {
        let element = createElementGallery(data.imageUrl,data.title,data.id);
        parent.innerHTML += element;
    });
}
//function for create element with class
export function createElementClass(element,classNames){
    const elementWithClass = document.createElement(element);

    classNames.forEach(className => 
        elementWithClass.classList.add(className)
    );
    return elementWithClass;
}

export async function galleryDisplayModal(data,parent){
    parent.innerHTML = "";
    for (let i = 0; i < data.length; i++){
        const element = document.createElement("div");
        element.dataset.id = data[i].id;
        const image = document.createElement("img");
        image.src = data[i].imageUrl;
        const trash = createElementClass("div", ["delete"]);

        element.appendChild(image);
        element.appendChild(trash);
        trash.appendChild(createElementClass("i", ["fa-solid", "fa-trash-can", "fa-xs"])); 
        parent.appendChild(element);

        trash.addEventListener("click", async (e) =>{
            let request = await removeWorks(data[i].id);
            if (request){
                removeWorksOfDisplay(data[i].id,data,parent);
            }
        });
    }
}
function removeWorksOfDisplay(id,data,parent){
    data = data.filter( (data) => {
        return data.id != id;
    });
    dynamicDisplayGallery(data,document.querySelector(".gallery"));
    galleryDisplayModal(data,parent);
}

export function formModalDisplay(){
    const form = createElementClass("form", ["upload-photo"]);
    form.setAttribute("for", "upload");
    
}