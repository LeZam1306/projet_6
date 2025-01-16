import { createElementClass, galleryDisplayModal, formModalDisplay, submitForm} from "./utils.js";
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
    const modal = templateModal();
    document.querySelector("body").appendChild(modal.template);

    //dynamic display of the modal
    const modalTrigger = document.querySelectorAll(".modal-trigger");
    modalTrigger.forEach(toggle => {
        toggle.addEventListener("click", () =>{
            modal.template.classList.toggle("active");
        })
    });
    //page change management
    modal.btnNext.addEventListener("click", () => {
        if(steps == 0){ 
            steps++;
            display();
        }else if(steps == 1){
            submitForm();
        }
    });
    modal.btnBack.addEventListener("click", () => {
        steps--;
        display();
    });

    //get gallery images only
    let dataWorks = await getWorks();
    display();
    function display(){
        switch (steps){
            case 0:
                console.log(steps);
                modal.btnBack.classList.add("hidden");

                modal.title.innerText = "Galerie Photo";

                modal.btnNext.innerText = "Ajouter une photo";
                
                modal.core.classList.value = "";
                modal.core.classList.add("modal__gallery");
                modal.body.style.overflow = "scroll";
                galleryDisplayModal(dataWorks, modal.core);
                break;
            case 1:
                console.log(steps);
                modal.btnBack.classList.remove("hidden");
                
                modal.title.innerText = "Ajout photo";
                modal.btnNext.innerText = "Valider";
                modal.core.classList.value = "";
                modal.core.classList.add("modal__add-Gallery");
                modal.body.style.overflow = "visible";
                formModalDisplay(modal.core,modal.btnNext);
                break;
            default:
                console.log(steps);
                steps = 0;
                display();
                break;
        }
    }

}