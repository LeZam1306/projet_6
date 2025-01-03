//Function for create a template element of the galery
export function createElementGallery(imageSrc,title,id){
    return `
        <figure>
            <img data-id="${id}" src="${imageSrc}" alt="${title}">
            <figcaption>${title}</figcaption>
        </figure>
    `;
}
export function createElementFilter(){
    
}