import { createElementClass, galleryDisplayModal, formModalDisplay, submitForm, dynamicDisplayGallery} from "./utils.js";
import { getWorks } from "./api.js";

export async function modal(){
    //This function return modal Object
    function templateModal(){
        const modal = {
            template: createElementClass("div", ["modal"]),
            triggerBackground: createElementClass("div", ["background-click", "modal-trigger"]),
            content: createElementClass("div", ["modal-content"]),
            header: createElementClass("div", ["modal-header"]),
            body: createElementClass("div", ["modal-body"]),
            footer: createElementClass("div", ["modal-footer"]),

            btnBack: createElementClass("i", ["fa-solid", "fa-arrow-left", "fa-xl"]),
            btnClose: createElementClass("i", ["fa-solid", "fa-xmark", "fa-xl", "modal-trigger"]),
            title: createElementClass("h2", []),
            core: createElementClass("div", []),
            btnNext: createElementClass("button", ["next"])
        };

        modal.template.appendChild(modal.triggerBackground);
        modal.template.appendChild(modal.content);
        modal.content.appendChild(modal.header);
        modal.content.appendChild(modal.body);
        modal.content.appendChild(modal.footer);
        modal.header.appendChild(modal.btnBack);
        modal.header.appendChild(modal.btnClose);
        modal.body.appendChild(modal.title);
        modal.body.appendChild(modal.core);
        modal.footer.appendChild(modal.btnNext);

        return modal;
    }
    //"steps" is the variable that is used to know which page of the modal we are on to adapt the display
    let steps = 0;
    let dataWorks = await getWorks();
    const modal = templateModal();
    document.querySelector("body").appendChild(modal.template);

    //dynamic display of the modal
    const modalTrigger = document.querySelectorAll(".modal-trigger");
    modalTrigger.forEach(toggle => {
        toggle.addEventListener("click", () =>{
            modal.template.classList.toggle("active");
            steps = 0;
            display();
        })
    });
    //page change management
    modal.btnNext.addEventListener("click", async () => {
        if(steps == 0){ 
            steps++;
            display();
        }else if(steps == 1){
            modal.btnNext.disabled = true;
            let reponseOfSubmit = await submitForm();
            if(reponseOfSubmit){
                dataWorks = await getWorks(); 
                dynamicDisplayGallery(dataWorks,document.querySelector(".gallery"));
            }
            modal.btnNext.disabled = false;
        }
    });
    modal.btnBack.addEventListener("click", () => {
        steps--;
        display();
    });
    //get gallery images only
    
    display();
    async function display(){
        switch (steps){
            case 0:
                modal.btnBack.classList.add("hidden");
                modal.title.innerText = "Galerie Photo";
                modal.btnNext.innerText = "Ajouter une photo";
                modal.core.classList.value = "";
                modal.core.classList.add("modal__gallery");
                modal.body.style.overflow = "scroll";
                dataWorks = await getWorks();
                galleryDisplayModal(dataWorks, modal.core);
                break;
            case 1:
                modal.btnBack.classList.remove("hidden");
                modal.title.innerText = "Ajout photo";
                modal.btnNext.innerText = "Valider";
                modal.core.classList.value = "";
                modal.core.classList.add("modal__add-Gallery");
                modal.body.style.overflow = "visible";
                formModalDisplay(modal.core);
                break;
            default:
                steps = 0;
                display();
                break;
        }
    }
}