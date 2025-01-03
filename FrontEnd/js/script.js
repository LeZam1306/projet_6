import { getWorks } from "./api.js";
import { createElementGallery } from "./utils.js";

//get element of api/word in array
const dataWorks = await getWorks();
const galleryElement = document.querySelector(".gallery");
console.log(galleryElement);
//Inser in DOM the element
dataWorks.forEach(data => {
    let element = createElementGallery(data.imageUrl,data.title,data.id);
    galleryElement.innerHTML += element;
});

