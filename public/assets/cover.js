/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cover.js"
/*!**********************!*\
  !*** ./src/cover.js ***!
  \**********************/
() {

eval("{/* 2020-2025 Peter Ursem */\n\nconst LENGTH_TIME_MULTIPLIER = 0.4; // MS / UNIT LENGTH\nconst COVER_URLS = [\n        '/2023/hualtuco/hualtuco-28',\n        '/web/cover1',\n        '/web/cover2',\n        '/web/cover3',\n        '/2024/Astronomy/07',\n        '/2023/nl/nl-127',\n        '/2024/Nederland/12',\n        '/2024/Nederland/25',\n        '/2024/Montana-Idaho/60',\n        '/2024/Montana-Idaho/37',\n        '/2024/Montana-Idaho/52',\n        '/2023/nl/nl-006'\n    ];\n\nvar totalDelay = 0;\nfunction animateName() {\n    document.querySelectorAll(\".cover-text\").forEach(el => {\n            const time = el.getTotalLength() * LENGTH_TIME_MULTIPLIER;\n            setTimeout(() => {\n                el.style.strokeDashoffset = 0;\n            }, totalDelay);\n            totalDelay += time;\n        });\n}\n\nfunction load(src) {\n    return new Promise((resolve, reject) => {\n        const image = new Image();\n        image.addEventListener('load', resolve);\n        image.addEventListener('error', reject);\n        image.src = src;\n    });\n}\n\nfunction setCover() {\n    const coverIndex = Math.floor(Math.random() * COVER_URLS.length);\n    const coverElem = document.getElementById('cover');\n\n    const fastBG = `/thumbs${COVER_URLS[coverIndex]}.webp`;\n    load(fastBG).then(() => {\n        coverElem.classList.remove(\"skeleton\");\n        coverElem.style.backgroundImage = `url(${fastBG})`;\n        setTimeout(animateName, 500);\n    }).catch(() => {\n        setTimeout(animateName, 500);\n    });\n\n    const fullBG = `/images${COVER_URLS[coverIndex]}.jpg`;\n    load(fullBG).then(() => {\n        document.getElementById('cover').style.backgroundImage = `url(${fullBG})`;\n    });\n}\n\ndocument.querySelectorAll(\".cover-text\").forEach(el => {\n    const pathLen = el.getTotalLength();\n    el.style.strokeDasharray = `${pathLen}, 10000`;\n    el.style.strokeDashoffset = pathLen;\n    setTimeout(()=>{\n        el.style.transition = `stroke-dashoffset ${pathLen*LENGTH_TIME_MULTIPLIER}ms ease-in-out`\n    }, 0);\n});\n\nsetCover();\n\n//# sourceURL=webpack://ursem.ca/./src/cover.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/cover.js"]();
/******/ 	
/******/ })()
;