const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
let works = [];
const urlApi = "http://localhost:5678/api/";
async function getWorks() {
  const answer = await fetch(urlApi + "works");
  works = await answer.json();
  works.forEach((work) => {
    const figureElement = document.createElement("figure");
    figureElement.dataset.category = work.categoryId;
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
  const buttonAll = document.createElement("button");
  buttonAll.textContent = "Tous";
  buttonAll.classList.add("filter-button");
  buttonAll.classList.add("active");
  filters.appendChild(buttonAll);
  buttonAll.addEventListener("click", function () {
    const buttons = document.querySelectorAll(".filter-button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    buttonAll.classList.add("active");
    const figures = document.querySelectorAll(".gallery figure");
    figures.forEach((figure) => {
      figure.style.display = "";
    });
  });
  categories.forEach((category) => {
    const buttonFilters = document.createElement("button");
    buttonFilters.textContent = category.name;
    buttonFilters.classList.add("filter-button");
    filters.appendChild(buttonFilters);
    buttonFilters.addEventListener("click", function () {
      const buttons = document.querySelectorAll(".filter-button");
      buttons.forEach((button) => {
        button.classList.remove("active");
      });
      buttonFilters.classList.add("active");
      const figures = document.querySelectorAll(".gallery figure");
      figures.forEach((figure) => {
        if (Number(figure.dataset.category) === category.id) {
          figure.style.display = "";
        } else {
          figure.style.display = "none";
        }
      });
    });
  });
}
getCategories();
