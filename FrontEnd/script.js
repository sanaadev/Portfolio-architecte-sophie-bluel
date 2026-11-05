const galerie = document.querySelector(".gallery");

async function recupererTravaux() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const travaux = await reponse.json();
  for (let i = 0; i < travaux.length; i++) {
    const titreGalerie = travaux[i].title;
    console.log(titreGalerie);
    const figureElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = travaux[i].imageUrl;
    imageElement.alt = travaux[i].title;
    const captionElement = document.createElement("figcaption");
    captionElement.textContent = travaux[i].title;
    galerie.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(captionElement);
  }
}
recupererTravaux();
