/* elements */
const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("uppercase");
const lowerEl = document.getElementById("lowercase");
const symbolsEl = document.getElementById("symbols");
const numbersEl = document.getElementById("numbers");
const resultEl = document.getElementById("result");
const copyEl = document.getElementById("copy");
const generateEl = document.getElementById("generate");
const tooltip = document.getElementById("myTooltip");

/* variables */
const symbols = "!@#$%.<^&*_/\\?`'~-*+=,%\"";
let options = {};

/* initial result */
resultEl.textContent = `You haven't generated a password.`;

/* functions */
const generateRandomLowerCaseLetters = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);
const generateRandomUpperCaseLetters = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
const generateRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];
const generateRandomNumbers = () => Math.floor(Math.random() * 10);

const generateThePassword = (myFuncs, length) => {
    if (!resultEl.textContent) resultEl.parentElement.style.borderColor = `green`;

    // make sure the length is positive and is number
    length = +length;
    if (myFuncs.length > 0 && length != 0) {
        let res = "";
        for (let i = 0; i < length; i++) {
            let ran = Math.floor(Math.random() * myFuncs.length);
            res += myFuncs[ran]();
        }
        resultEl.textContent = res;
    } else {
        resultEl.textContent = `No options or length`;
        resultEl.parentElement.style.borderColor = `red`;
    }
};

/* load initial options */
(() => {
    try {
        if (localStorage.length > 0) {
            options = JSON.parse(localStorage.getItem(`options`));
            lengthEl.value = options.length;
            upperEl.checked = options.includesUpper === true;
            lowerEl.checked = options.includesLower === true;
            symbolsEl.checked = options.includesSymbols === true;
            numbersEl.checked = options.includesNumbers === true;
        }
    } catch (error) {
        console.log(error);
    }
})();

/* the generate password element */
generateEl.addEventListener("click", () => {
    options.length = lengthEl.value;
    options.includesUpper = upperEl.checked;
    options.includesLower = lowerEl.checked;
    options.includesSymbols = symbolsEl.checked;
    options.includesNumbers = numbersEl.checked;
    localStorage.setItem(`options`, JSON.stringify(options));

    let length = lengthEl.value;
    let myFuncs = [];
    if (upperEl.checked) myFuncs.push(generateRandomUpperCaseLetters);
    if (lowerEl.checked) myFuncs.push(generateRandomLowerCaseLetters);
    if (symbolsEl.checked) myFuncs.push(generateRandomSymbol);
    if (numbersEl.checked) myFuncs.push(generateRandomNumbers);

    generateThePassword(myFuncs, length);
});

/* the copy password element */
copyEl.addEventListener(
    "click",
    () => {
        navigator.clipboard.writeText(resultEl.textContent);
        tooltip.textContent = `Copied: ${resultEl.textContent}`;
    },
    "onmouseout",
    () => {
        tooltip.innerHTML = "Copy to clipboard";
    }
);