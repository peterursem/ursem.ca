// 2020 - 2026 | Peter Ursem //

require('./images.css');
const Collection = require("./collection.mjs").Collection;
const imagesLoaded = require("imagesloaded");

const BOTTOM_SCROLL_TRIGGER_PX = window.innerHeight * 0.5; //The maximum height of the viewport (in pixels from the bottom) required to load more images when scrolling
const TOTAL_COLUMNS = 4;

var collectionNum = 0;
/*
    Load the next collection.
    After loading the second collection, recursively load all collections.
*/
function nextCollection() {
    if(collectionNum < Collection.collections.length) {
        Collection.collections[collectionNum++].populateCollection()
        .then(collection => {
            document.getElementById("imgs").appendChild(collection.collectionElem);

            let columnsLoaded = 0;
            collection.columns.forEach(column => {
                imagesLoaded(column, () => {
                    columnsLoaded++;
                    if (columnsLoaded >= TOTAL_COLUMNS && collectionNum > 1)
                        // If all images are loaded, load the next collection
                        nextCollection();
                });
            });
        });
    } else {
        document.getElementById('skeleton-collection').style.display = 'none';
    }
}

/*
 Set up all collections and render the first.
*/
function setupPage() {
    fetch('/images/database.json')
        .then(result => result.json())
        .then(data => {
            data.content.reverse().forEach((collectionData) => {
                new Collection(collectionData);
            })})
        .then(() => {
            nextCollection();
            document.body.addEventListener("scroll", handleScroll);
        });
}

setupPage();

function handleScroll() {
    if(document.body.scrollTop + window.innerHeight > document.body.scrollHeight - BOTTOM_SCROLL_TRIGGER_PX) {
        nextCollection();
        document.body.removeEventListener("scroll", handleScroll);
    }
}