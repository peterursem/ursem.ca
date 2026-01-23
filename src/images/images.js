// 2020 - 2026 | Peter Ursem //

require('./images.css');
const Collection = require("./collection.mjs").Collection;
const imagesLoaded = require("imagesloaded");

const BOTTOM_SCROLL_TRIGGER_PX = window.innerHeight; //The maximum height of the viewport in pixels from the bottom required to load more images when scrolling
const TOTAL_COLUMNS = 4;

var collectionNum = 0;
function nextCollection() {
    if(collectionNum < Collection.collections.length) {
        Collection.collections[collectionNum++].populateCollection()
        .then(collection => {
            document.getElementById("imgs").appendChild(collection.collectionElem);

            let columnsLoaded = 0;
            collection.columns.forEach(column => {
                imagesLoaded(column, () => {
                if (++columnsLoaded == TOTAL_COLUMNS && collectionNum > 1)
                    nextCollection();
                });
            });
        });
    } else {
        document.getElementById('skeleton-collection').style.display = 'none';
    }
}


function setupPage() {
    fetch('/images/database.json')
        .then(result => result.json())
        .then(data => {
            data.content.reverse().forEach((collectionData) => {
                new Collection(collectionData);
            })})
        .then(() => {
            nextCollection();
            document.addEventListener("scroll", handleScroll);
        });
}

setupPage();

function handleScroll() {
    if(window.scrollY + window.innerHeight > document.body.scrollHeight - BOTTOM_SCROLL_TRIGGER_PX) {
        nextCollection();
        document.removeEventListener("scroll", handleScroll);
    }
}