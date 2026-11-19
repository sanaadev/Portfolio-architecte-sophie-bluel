let gallery = document.querySelector(".gallery");
let filters = document.querySelector(".filters");
let login = document.querySelector(".login-link");
let editMode = document.querySelector(".edit-mode");
let editButton = document.querySelector(".edit-button");
let modalOverlay = document.querySelector(".modal-overlay");
let modal = document.querySelectorAll(".modal");
let closeButtons = document.querySelectorAll(".close-button");
let modalGallery = document.querySelector(".modal-gallery");
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
    let thumbnail = document.createElement("figure");
    thumbnail.classList.add("thumbnail");
    let thumbnailImage = document.createElement("img");
    thumbnailImage.src = work.imageUrl;
    thumbnailImage.alt = work.title;
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.dataset.id = work.id;
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    modalGallery.appendChild(thumbnail);
    thumbnail.appendChild(thumbnailImage);
    thumbnail.appendChild(deleteButton);
    deleteButton.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log(deleteButton.dataset.id);
      let removeProjects = await fetch(
        urlApi + "works/" + deleteButton.dataset.id,
        {
          method: "delete",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        },
      );

      console.log(removeProjects.status);
      figureElement.remove();
      thumbnail.remove();
    });
  });
}
getWorks();

async function getCategories() {
  let response = await fetch(urlApi + "categories");
  let categories = await response.json();
  let buttonAll = document.createElement("button");
  buttonAll.textContent = "Tous";
  buttonAll.classList.add("filter-button", "active");
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
  login.textContent = "logout";
  editMode.classList.remove("hidden");
  filters.classList.add("hidden");
  editButton.classList.remove("hidden");

  //  Pour la déconnexion
  login.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
  });
  //  Pour ouvrir la modale
  editButton.addEventListener("click", () => {
    modalOverlay.classList.remove("hidden");
  });
  // Fermer avec les croix
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modalOverlay.classList.add("hidden");
    });
  });

  // Fermer en cliquant en dehors de la fenêtre
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      modalOverlay.classList.add("hidden");
    }
  });
} else {
  login.textContent = "login";
}
