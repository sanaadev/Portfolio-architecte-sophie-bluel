const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

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

async function getCategories() {
  const answer = await fetch(urlApi + "categories");
  const categories = await answer.json();
  console.log(categories);
  const buttonAll= document.createElement ("button")
    buttonAll.textContent = "Tous"
    buttonAll.classList.add("filter-button")
    filters.appendChild(buttonAll)
  categories.forEach((category)=>{
    const buttonFilters= document.createElement ("button")
    buttonFilters.textContent = category.name
    buttonFilters.classList.add("filter-button")  
    filters.appendChild(buttonFilters)
    
    

  })
}
getCategories()
