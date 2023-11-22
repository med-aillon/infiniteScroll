const imagesList = document.querySelector(".images-list");
const errorMsg = document.querySelector(".error-msg");
const searchQuery = "random";
const pageIndex = 1;

async function handleFetch() {
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
handleFetch();

function createImages(data) {
  data.forEach((img) => {
    const newImage = document.createElement("img");
    newImage.src = img.urls.regular;
    imagesList.appendChild(newImage);
  });
}
