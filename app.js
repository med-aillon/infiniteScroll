const imagesList = document.querySelector(".images-list");
const errorMsg = document.querySelector(".error-msg");
let searchQuery = "random";
let pageIndex = 1;

async function fetchData() {
  try {
    const responce = await fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchQuery}&client_id=0unNupAopJGFgpauNX4xduyd1iXsjgdNO2pPsoJMr_Y`
    );
    const data = await responce.json();
    console.log(data);
    if (!responce.ok) {
      throw new Error(`Erreur : ${responce.error}`);
    }
    if (!data.total) {
      imagesList.textContent = "";
      errorMsg.textContent = "Aucun resultat avec ce mot clé, essayer avec quelque chose de plus précis !";
    }
    createImages(data.results);
  } catch (error) {
    errorMsg.textContent = `${error}`;
  }
}
fetchData();

function createImages(data) {
  data.forEach((img) => {
    const newImage = document.createElement("img");
    newImage.src = img.urls.regular;
    imagesList.appendChild(newImage);
  });
}

const observer = new IntersectionObserver(handleIntersect, { rootMargin: "50%" });
observer.observe(document.querySelector(".infinite-marker"));

function handleIntersect(entries) {
  console.log(entries);
  if (window.scrollY > window.innerHeight && entries[0].isIntersecting) {
    pageIndex++;
    fetchData();
  }
}

const form = document.querySelector("form");
const input = document.querySelector("#search");

form.addEventListener("submit", handleSearch);

function handleSearch(e) {
  e.preventDefault();
  imagesList.textContent = "";
  if (!input.value) {
    errorMsg.textContent = "Aucun mot clé, entrez en un!";
    return;
  }
  imagesList.textContent = "";
  searchQuery = input.value;
  pageIndex = 1;
  fetchData();
}

const scrollToTop = document.querySelector(".scroll-to-top");
scrollToTop.addEventListener("click", toTop);

function toTop() {
  window.scrollTo({ top: "0", behavior: "smooth" });
}
