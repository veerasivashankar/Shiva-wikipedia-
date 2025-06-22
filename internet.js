// Entry Screen Logic
const entrySection = document.getElementById("entrySection");
const mainApp = document.getElementById("mainApp");
const nameInput = document.getElementById("nameInput");
const startBtn = document.getElementById("startBtn");
const greetingEl = document.getElementById("greeting");

startBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name !== "") {
    entrySection.classList.add("hidden");
    mainApp.classList.remove("hidden");
    greetingEl.textContent = `Welcome, ${name}!`;
  } else {
    alert("Please enter your name");
  }
});

nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    startBtn.click();
  }
});

// Dark/Light Mode Toggle
const modeToggle = document.getElementById("modeToggle");
modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("dark-mode");
});

// Wikipedia Search Logic
const searchInputEl = document.getElementById("searchInput");
const searchResultsEl = document.getElementById("searchResults");
const spinnerEl = document.getElementById("spinner");

function createsearch(result) {
  const { title, link, description } = result;

  const resultItem = document.createElement("div");
  resultItem.classList.add("result-item");

  const resultTitleEl = document.createElement("a");
  resultTitleEl.classList.add("result-title");
  resultTitleEl.textContent = title;
  resultTitleEl.href = link;
  resultTitleEl.target = "_blank";
  resultItem.appendChild(resultTitleEl);

  const resultURL = document.createElement("a");
  resultURL.classList.add("result-url");
  resultURL.textContent = link;
  resultURL.href = link;
  resultURL.target = "_blank";
  resultItem.appendChild(resultURL);

  const resultPara = document.createElement("p");
  resultPara.classList.add("link-description");
  resultPara.textContent = description;
  resultItem.appendChild(resultPara);

  searchResultsEl.appendChild(resultItem);
}

function displayResults(results) {
  spinnerEl.classList.add("hidden");
  for (const result of results) {
    createsearch(result);
  }
}

searchInputEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    spinnerEl.classList.remove("hidden");
    searchResultsEl.textContent = "";
    const query = searchInputEl.value;
    const url = "https://apis.ccbp.in/wiki-search?search=" + query;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        displayResults(data.search_results);
      });
  }
});

// Typing animation
const titleText = "SHIVA'S WIKIPEDIA";
const typedTextEl = document.getElementById("typedText");

let charIndex = 0;
typedTextEl.textContent = "";

function typeLetter() {
  if (charIndex < titleText.length) {
    typedTextEl.textContent += titleText.charAt(charIndex);
    charIndex++;
    setTimeout(typeLetter, 100);
  }
}
typeLetter();
