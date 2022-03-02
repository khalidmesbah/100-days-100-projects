// dom elements
const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("uppercase");
const lowerEl = document.getElementById("lowercase");
const symbolsEl = document.getElementById("symbols");
const numbersEl = document.getElementById("numbers");
const resultEl = document.getElementById("result");
const copyEl = document.getElementById("copy");
const generateEl = document.getElementById("generate");
const tooltip = document.getElementById("myTooltip");

// functions
const generateRandomLowerCaseLetters = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const generateRandomUpperCaseLetters = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
};

const generateRandomSymbol = () => {
  return "!@#$%.<^&*_/\\?`'~"[
    Math.floor(Math.random() * "!@#$%.<^&*_/\\?`'~".length)
  ];
};

const generateRandomNumbers = () => {
  return Math.floor(Math.random() * 10);
};

const generateThePassword = (myfuncs, length) => {
  if (!resultEl.value) resultEl.parentElement.style.borderColor = `green`;

  // make sure the length is positive
  length = +length;
  if (myfuncs.length > 0 && length != 0) {
    let res = "";
    for (let i = 0; i < length; i++) {
      let ran = Math.floor(Math.random() * myfuncs.length);
      res += myfuncs[ran]();
    }
    resultEl.value = res;
    return res;
  } else {
    resultEl.value = ``;
    resultEl.parentElement.style.borderColor = `red`;
    alert("no options or length");
    return;
  }
};

upperEl.checked = localStorage.getItem(`upperEl.checked`) === `true` ? 1 : 0;
lowerEl.checked = localStorage.getItem(`lowerEl.checked`) === `true` ? 1 : 0;
symbolsEl.checked =
  localStorage.getItem(`symbolsEl.checked`) === `true` ? 1 : 0;
numbersEl.checked =
  localStorage.getItem(`numbersEl.checked`) === `true` ? 1 : 0;
lengthEl.value = localStorage.getItem(`lengthEl.value`);

generateEl.addEventListener("click", () => {
  localStorage.setItem(`lengthEl.value`, lengthEl.value);
  localStorage.setItem(`upperEl.checked`, upperEl.checked);
  localStorage.setItem(`lowerEl.checked`, lowerEl.checked);
  localStorage.setItem(`symbolsEl.checked`, symbolsEl.checked);
  localStorage.setItem(`numbersEl.checked`, numbersEl.checked);

  let length = lengthEl.value;
  let myfuncs = [];
  if (upperEl.checked) myfuncs.push(generateRandomUpperCaseLetters);
  if (lowerEl.checked) myfuncs.push(generateRandomLowerCaseLetters);
  if (symbolsEl.checked) myfuncs.push(generateRandomSymbol);
  if (numbersEl.checked) myfuncs.push(generateRandomNumbers);

  generateThePassword(myfuncs, length);
});

copyEl.addEventListener(
  "click",
  () => {
    resultEl.select();
    navigator.clipboard.writeText(resultEl.value);
    tooltip.innerHTML = "Copied: " + resultEl.value;
  },
  "onmouseout",
  () => {
    tooltip.innerHTML = "Copy to clipboard";
  }
);
