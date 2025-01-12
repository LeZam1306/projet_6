import { getWorks, getCategories, postLogin, removeWorks } from "./api.js";
import { createElementFilter, dynamicDisplayGallery } from "./utils.js";
import { modal } from "./modal.js";

export async function index(){

    async function displayForLogged(){
        if (window.localStorage.getItem("token") && window.localStorage.getItem("token") != ""){
            //edit mode header
            const editModeHeader = document.createElement("div");
            editModeHeader.classList.add("edit-mode__header");
            editModeHeader.innerHTML = `
                <i class="fa-solid fa-pen-to-square"></i>
		        <p>Mode édition</p>
            `;
            document.querySelector("header").before(editModeHeader); 

            //btn edit new to title "projet"
            const btnEdit = document.createElement("span");
            btnEdit.classList.add("btn-edit");
            btnEdit.classList.add("modal-trigger");
            btnEdit.innerHTML = `
                <i class="fa-regular fa-pen-to-square"></i>
		        Modifier
            `;
            document.querySelector("#portfolio h2").appendChild(btnEdit);
            //Delet display of filters
            document.querySelector(".filter").classList.add("display-none");

            await modal();
        }
    }

    //get element of api/word in array
    const dataWorks = await getWorks();
    const galleryElement = document.querySelector(".gallery");
    //Inser in DOM the element
    dynamicDisplayGallery(dataWorks,galleryElement);
    //get categories elements for filter
    const dataCategories = await getCategories();
    const filterElement = document.querySelector(".filter");
    //create filter item
    for (let i = 0; i < dataCategories.length; i++){
        if (i == 0){    //create the first element preselected
            createElementFilter(filterElement,"Tous");
            let item = document.querySelector(".filter__item");
            item.classList.add("filter__item--selected");
        }
        createElementFilter(filterElement, dataCategories[i].name);
    }

    //add event listener on items of filter
    const filtersItems = document.querySelectorAll(".filter__item");
    for (let i = 0; i < filtersItems.length; i++){
        filtersItems[i].addEventListener("click", (event) => {
            //management of selection display styles
            filtersItems.forEach(atr => {
                atr.classList.remove("filter__item--selected");
            });
            filtersItems[i].classList.add("filter__item--selected");
            //Now we will copy our list of gallery items and 
            // filter it based on the similar name of our filter
            let dataWorksFilter = Array.from(dataWorks);
            if (event.target.dataset.name != "Tous"){
                dataWorksFilter = dataWorksFilter.filter(data => {
                        return data.category.name === event.target.dataset.name;  
                });
            }
            dynamicDisplayGallery(dataWorksFilter,galleryElement);
        });
    }
    displayForLogged();
}
