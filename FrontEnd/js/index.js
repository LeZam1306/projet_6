import { getWorks, getCategories, postLogin } from "./api.js";
import { createElementFilter, dynamicDisplayGallery } from "./utils.js";

export async function index(){
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
}
