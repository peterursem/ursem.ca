/* 2020-2025 Peter Ursem */

const LENGTH_TIME_MULTIPLIER = 0.4; // MS / UNIT LENGTH
const COVER_URLS = [
        '/2023/hualtuco/hualtuco-28',
        '/web/cover1.jpg',
        '/web/cover2.jpg',
        '/web/cover3.jpg',
        '/2024/Astronomy/07',
        '/2023/nl/nl-127',
        '/2024/Nederland/20',
        '/2024/Nederland/12',
        '/2024/Nederland/25',
        '/2024/Montana-Idaho/60',
        '/2024/Montana-Idaho/37',
        '/2024/Montana-Idaho/52',
        '/2023/nl/nl-006'
    ];

var totalDelay = 0;
function animateName() {
    document.querySelectorAll(".cover-text").forEach(el => {
            const time = el.getTotalLength() * LENGTH_TIME_MULTIPLIER;
            setTimeout(() => {
                el.style.strokeDashoffset = 0;
            }, totalDelay);
            totalDelay += time;
        });
}

function load(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', resolve);
        image.addEventListener('error', reject);
        image.src = src;
    });
}

function setCover() {
    const coverIndex = Math.floor(Math.random() * COVER_URLS.length);
    const coverElem = document.getElementById('cover');

    const fastBG = `/thumbs${COVER_URLS[coverIndex]}.webp`;
    load(fastBG).then(() => {
        coverElem.classList.remove("skeleton");
        coverElem.style.backgroundImage = `url(${fastBG})`;
        setTimeout(animateName, 500);
    }).catch(() => {
        setTimeout(animateName, 500);
    });

    const fullBG = `/images${COVER_URLS[coverIndex]}.jpg`;
    load(fullBG).then(() => {
        document.getElementById('cover').style.backgroundImage = `url(${fullBG})`;
    });
}

document.querySelectorAll(".cover-text").forEach(el => {
    const pathLen = el.getTotalLength();
    el.style.strokeDasharray = `${pathLen}, 10000`;
    el.style.strokeDashoffset = pathLen;
    setTimeout(()=>{
        el.style.transition = `stroke-dashoffset ${pathLen*LENGTH_TIME_MULTIPLIER}ms ease-in-out`
    }, 0);
});

setCover();