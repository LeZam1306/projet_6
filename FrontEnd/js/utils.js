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