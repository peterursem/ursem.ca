// 2020 - 2026 | Peter Ursem //

import imagesLoaded from "imagesloaded";

export class GridItem {
    constructor(img, id) {
        this.id = id; // A numerical id, used for favs
        this.tags = [...img.tags]; // Used for search
        
        this.imgElem = document.createElement('img');
        this.imgElem.src = '/thumbs/' + img.url + '.webp';
        this.imgElem.classList = "w-full rounded-xl shadow";

        this.gridElem = document.createElement('div');
        this.gridElem.classList = 'grid-item hover-3d';
        this.gridElem.setAttribute("onclick", "modal.showModal()");
        this.gridElem.addEventListener("click", () => {
            let modalImg = document.getElementById("modal-img");
            let skeleton = document.getElementById("skeleton");
            modalImg.style.display = 'none';
            skeleton.style.display = 'block';
            modalImg.src = '/images/' + img.url + '.jpg';

            imagesLoaded(document.getElementById("modal"), () => {
                skeleton.style.display = 'none';
                modalImg.style.display = 'block';
            });
        });
        this.gridElem.appendChild(this.imgElem);
        return this;
    }
}
