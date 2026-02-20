// 2020 - 2026 | Peter Ursem //

import imagesLoaded from "imagesloaded";
import { GridItem } from "./gridItem.mjs";

export class Collection {
    static collections = [];

    constructor(collectionData) {
        this.expanded = false;
        this.images = collectionData.imgs; // Image urls
        this.favs = collectionData.favs; // The indices of favourite images
        this.numFavs = 4; // Number of favourites to show
        this.gridItems = [...Array(this.images.length)]; // The loaded image objects
        this.columns = []; // The HTML column elements to hold rendered images
        // Create the collection element
        this.defineElements(collectionData.title, collectionData.date);
        // Add to array of all collections
        Collection.collections.push(this);
        return this.collectionElem;
    }

    /*
        Expand or contract this collection, collapsing the rest if necessary.
    */
    expand(state) {
        if(state == this.expanded) {
            // No change, just return
            return new Promise((res, rej) => {res();});
        }

        if (state) {
            // Expand this section, but first collapse the rest
            var collapsed = 1;
            Collection.collections.forEach(collection => {
                if (collection != this) 
                    // Collapse each other section
                    collection.expand(false)
                        .then(() => {
                            collapsed++;  
                            if(collapsed >= Collection.collections.length)
                                // Scroll to this collection once all other collections are collapsed
                                this.collectionElem.scrollIntoView({ block: "start", behavior: "smooth"});                        
                        });
            });
        }

        return new Promise((res, rej) => {
            // Clear existing images
            this.columns.forEach(column => {
                while (column.firstChild) {
                    column.removeChild(column.lastChild);
                }
            });

            // Fill the collection
            this.populateCollection(state)
            .then(() => {
                this.expanded = state;

                imagesLoaded(this.collectionElem, () => {
                    res();
                });
            });
        });
    }
    
    createExpansionToggle() {
        let expandToggle = document.createElement("button");
        expandToggle.classList = "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-500";
        expandToggle.setAttribute('style', "width: 80%; margin-top: 50px; margin-inline: 10%;"); 
        expandToggle.innerHTML = '\
        <div id="text" class="translate-y-0 opacity-100 transition group-hover:-translate-y-[150%] group-hover:opacity-0">\
        Expand\
        </div><div class="absolute translate-y-[150%] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"><path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></div>';
        
        expandToggle.onclick = () => {
            let contracted = expandToggle.innerText == "Expand";
            this.expand(contracted)
            .then(() => {
                if (!contracted)
                    this.collectionElem.scrollIntoView({ block: "start", behavior: "smooth"});
            });
        };

        return expandToggle;
    }

    newColumn() {
        let col = document.createElement('div');
        col.classList = "grid gap-4";
        return col;
    }

    /*
        Define the collections html elements.
    */
    defineElements(title, date) {
        const infoCard = document.createElement('div'),
            titleElem = document.createElement('h1'),
            dateElem = document.createElement('h2');
        titleElem.textContent = title;
        dateElem.textContent = date;
        infoCard.classList.add('title-text');
        infoCard.appendChild(titleElem);
        infoCard.appendChild(dateElem);
        this.grid = document.createElement('div');
        this.grid.classList.add('grid', 'grid-cols-2', 'gap-4', 'md:grid-cols-4');
        this.grid.setAttribute('height', 'maxContent');

        for (var i = 0; i < 4; i++) {
            this.columns.push(this.newColumn());
            this.grid.appendChild(this.columns[i]);
        }

        const collectionBg = document.createElement('img'),
        randomBackground = this.images[this.favs[Math.floor(Math.random() * this.favs.length)]];
        collectionBg.classList.add('background');
        collectionBg.src = "/thumbs/" + randomBackground.url + ".webp";

        const contentElem = document.createElement('div');
        contentElem.classList.add('content');
        contentElem.appendChild(infoCard);
        contentElem.appendChild(this.grid);
        contentElem.appendChild(this.createExpansionToggle());
        
        this.collectionElem = document.createElement('div');
        this.collectionElem.classList.add('collection','snap');
        this.collectionElem.id = title;
        this.collectionElem.setAttribute('style', 'display: none;');
        this.collectionElem.appendChild(collectionBg);
        this.collectionElem.appendChild(contentElem);

        imagesLoaded(this.collectionElem, () => {
            this.collectionElem.setAttribute("style", "height: max-content;");
        });
    }

    makeGridItem(index) {
        let newItem = new GridItem(this.images[index], index);
        this.gridItems[index] = newItem;
        return newItem;
    }

    loadGridItem(imageNumber, index) {
        if(this.gridItems[index] != null)
            this.columns[imageNumber % 4].appendChild(this.gridItems[index].gridElem);
        else
            this.columns[imageNumber % 4].appendChild(this.makeGridItem(index).gridElem);
    }

    populateCollection = (expanded = false) => {
        return new Promise((res, rej) => {
            let imageNumber = 0;

            if (expanded) {
                for (var img = 0; img < this.images.length; img++) {
                    this.loadGridItem(imageNumber++, img);
                }
            }
            //If the grid is not expanded and the "fav" images fit in the given number.
            else if (this.favs.length <= this.numFavs) {
                this.favs.forEach(fav => {
                    this.loadGridItem(imageNumber++, fav);
                });
            }
            //If the grid is not expanded and there are too many "fav" images to fit.
            else {
                //Copy the list of indexes for "fav" images.
                let possibleFavs = [...this.favs];
                for (let i = 0; i < this.numFavs; i++) {
                    //Get a random index from the "favs".
                    let index = Math.floor(Math.random() * possibleFavs.length);
                    let fav = possibleFavs[index];
                    possibleFavs.splice(index, 1);

                    this.loadGridItem(imageNumber++, fav);
                }
            }
            
            //If there are more images than favs create an expand / contract toggle.
            console.log(this.images.length, this.numFavs, this.images.length > this.numFavs);
            if (this.images.length > this.numFavs) {
                const toggle = this.collectionElem.querySelector("button");
                if(toggle) {
                    if(expanded)
                        toggle.innerText = 'Collapse';
                    else
                        toggle.innerText = 'Expand';
                } else
                    this.createExpansionToggle();
            }

            res(this);
        });}
}