const gallery = document.querySelector(".gallery");
const urlApi = "http://localhost:5678/api/";
async function getWorks() {
  const answer = await fetch(urlApi + "works");
  const works = await answer.json();
  works.forEach((work) => {
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    const captionElement = document.createElement("figcaption");
    captionElement.textContent = work.title;
    gallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(captionElement);
  });
}
getWorks();
