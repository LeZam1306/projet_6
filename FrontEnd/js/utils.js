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

function templateFormModal(){
    const form = {
        form: createElementClass("form", ["add-photo"]),
        labelUploadPhoto: createElementClass("label", ["upload-photo"]),
        labelUploadPhotoCore: createElementClass("div", ["void"]),
        inputFile: document.createElement("input"),
        labelTitle: document.createElement("label"),
        inputTitle: document.createElement("input"),
        labelCategorie: document.createElement("label"),
        categorieCore: document.createElement("div"),
        selectCategorie: document.createElement("select")
    };

    form.form.setAttribute("methode", "POST");
    form.labelUploadPhoto.setAttribute("for", "upload");

    form.inputFile.setAttribute("type", "file");
    form.inputFile.setAttribute("id", "upload");
    form.inputFile.setAttribute("name", "upload");
    form.inputFile.setAttribute("accept", "image/*");

    form.labelTitle.setAttribute("for", "title");
    form.labelTitle.innerText = "Titre";
    form.inputTitle.setAttribute("type", "text");
    form.inputTitle.setAttribute("id", "title");
    form.inputTitle.setAttribute("name", "title");
    

    form.labelCategorie.setAttribute("for", "categorie");
    form.labelCategorie.innerText = "Catégorie";
    form.selectCategorie.setAttribute("id", "categorie");
    form.selectCategorie.setAttribute("name", "categorie");
    
    form.form.appendChild(form.labelUploadPhoto);
    form.form.appendChild(form.inputFile);
    form.form.appendChild(form.labelTitle);
    form.form.appendChild(form.inputTitle);
    form.form.appendChild(form.labelCategorie);
    form.form.appendChild(form.categorieCore);

    form.labelUploadPhoto.appendChild(form.labelUploadPhotoCore);
    form.categorieCore.appendChild(form.selectCategorie);

    return form;
}
templateFormModal();
export function formModalDisplay(parent){
    parent.innerHTML = "";
    let form = templateFormModal();

    form.inputFile.addEventListener("change", (e) =>{
        let input = e.target;
        if (input.files && input.files[0]){
            if (form.labelUploadPhotoCore.classList.contains("void")){
                form.labelUploadPhotoCore.innerHTML = "";
                if (form.labelUploadPhotoCore.classList.contains("void")){
                    form.labelUploadPhotoCore.classList.remove("void");
                    form.labelUploadPhotoCore.classList.add("preview");
                }

                let img = document.createElement("img");
                form.labelUploadPhotoCore.appendChild(img);

                let reader = new FileReader();

                reader.addEventListener("load", (e) => {
                    img.src = e.target.result;
                });
                reader.readAsDataURL(input.files[0]); 
            }
        }else if (form.labelUploadPhotoCore.classList.contains("preview")){
            form.labelUploadPhotoCore.classList.add("void");
            form.labelUploadPhotoCore.classList.remove("preview");
            formModalDisplay(parent);
        }
    });
    if (form.labelUploadPhotoCore.classList.contains("void")){
        form.labelUploadPhotoCore.innerHTML = "";

        form.labelUploadPhotoCore.appendChild(createElementClass("i", ["fa-regular", "fa-image"]));
        const btnAddPhoto = createElementClass("p", ["void__btn-add"]);
        btnAddPhoto.innerText = "+ Ajouter photo";
        form.labelUploadPhotoCore.appendChild(btnAddPhoto);
        const infoPhoto = createElementClass("p", ["void__info"]);
        infoPhoto.innerText = "jpg, png : 4mo max";
        form.labelUploadPhotoCore.appendChild(infoPhoto);
      
    }

    parent.appendChild(form.form);
}