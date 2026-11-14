let gallery = document.querySelector(".gallery");
let filters = document.querySelector(".filters");
let login = document.querySelector(".login-link")
let works = [];
const urlApi = "http://localhost:5678/api/";
async function getWorks() {
  const response = await fetch(urlApi + "works");
  works = await response.json();
  works.forEach((work) => {
    let figureElement = document.createElement("figure");
    figureElement.dataset.category = work.categoryId;
    let imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    imageElement.alt = work.title;
    let captionElement = document.createElement("figcaption");
    captionElement.textContent = work.title;
    gallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(captionElement);
  });
}
getWorks();

async function getCategories() {
  let response = await fetch(urlApi + "categories");
  let categories = await response.json();
  let buttonAll = document.createElement("button");
  buttonAll.textContent = "Tous";
  buttonAll.classList.add("filter-button","active");
  filters.appendChild(buttonAll);
  buttonAll.addEventListener("click", function () {
    let buttons = document.querySelectorAll(".filter-button");
    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    buttonAll.classList.add("active");
    let figures = document.querySelectorAll(".gallery figure");
    figures.forEach((figure) => {
      figure.style.display = "";
    });
  });
  categories.forEach((category) => {
    let buttonFilters = document.createElement("button");
    buttonFilters.textContent = category.name;
    buttonFilters.classList.add("filter-button");
    filters.appendChild(buttonFilters);
    buttonFilters.addEventListener("click", function () {
      let buttons = document.querySelectorAll(".filter-button");
      buttons.forEach((button) => {
        button.classList.remove("active");
      });
      buttonFilters.classList.add("active");
      let figures = document.querySelectorAll(".gallery figure");
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

const token = localStorage.getItem("token");
if (token) {
  login.textContent ="logout";
  login.addEventListener("click",(event)=>{
    event.preventDefault()
    localStorage.removeItem("token")
    window.location.reload()
  })
} else {    
    login.textContent= "login";
  }

