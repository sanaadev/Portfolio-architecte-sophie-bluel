let gallery = document.querySelector(".gallery");
let filters = document.querySelector(".filters");
let login = document.querySelector(".login-link");
let editMode = document.querySelector(".edit-mode");
let editButton = document.querySelector(".edit-button");
let modalOverlay = document.querySelector(".modal-overlay");
let modal = document.querySelectorAll(".modal");
let closeButtons = document.querySelectorAll(".close-button");
let modalGallery = document.querySelector(".modal-gallery");
let galleryView = document.querySelector(".gallery-view");
let formView = document.querySelector(".form-view");
let addPhotoButton = document.querySelector(".add-photo-button");
let backButton = document.querySelector(".back-button");
let categorySelect = document.getElementById("category");
let imgPhotoZone = document.querySelector(".img-photo-zone");
let fileInput = document.querySelector(".load-file");
let txtAddPhoto = document.querySelector(".txt-add-photo");
let iconPhoto = document.querySelector(".icon-photo");
let typePhoto = document.querySelector(".type-photo");
let titleInput = document.querySelector(".title-input");
let btnSubmit = document.querySelector(".btn-submit");
let addProjectForm = document.querySelector(".add-project-form");

let works = [];
const urlApi = "http://localhost:5678/api/";
async function getWorks() {
  const response = await fetch(urlApi + "works");
  works = await response.json();
  works.forEach((work) => {
    displayWork(work);
  });
}
getWorks();

function displayWork(work) {
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
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      },
    );
    // Remove the project from the page only if the API confirms the deletion
    if (removeProjects.ok) {
      figureElement.remove();
      thumbnail.remove();
    }
  });
}

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
    let optionSelect = document.createElement("option");
    optionSelect.textContent = category.name;
    optionSelect.value = category.id;
    filters.appendChild(buttonFilters);
    categorySelect.appendChild(optionSelect);
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

const token = sessionStorage.getItem("token");
if (token) {
  login.textContent = "logout";
  editMode.classList.remove("hidden");
  filters.classList.add("hidden");
  editButton.classList.remove("hidden");

  //  Pour la déconnexion
  login.addEventListener("click", (event) => {
    event.preventDefault();
    sessionStorage.removeItem("token");
    window.location.reload();
  });
  //  Pour ouvrir la modale
  editButton.addEventListener("click", () => {
    modalOverlay.classList.remove("hidden");
    formView.classList.add("hidden");
    galleryView.classList.remove("hidden");
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

  addPhotoButton.addEventListener("click", () => {
    galleryView.classList.add("hidden");
    formView.classList.remove("hidden");
  });
  backButton.addEventListener("click", () => {
    formView.classList.add("hidden");
    galleryView.classList.remove("hidden");
  });
  fileInput.addEventListener("change", () => {
    imgPhotoZone.src = URL.createObjectURL(fileInput.files[0]);
    imgPhotoZone.classList.remove("hidden");
    txtAddPhoto.classList.add("hidden");
    iconPhoto.classList.add("hidden");
    typePhoto.classList.add("hidden");
    checkForm();
  });
  titleInput.addEventListener("input", () => {
    checkForm();
  });

  categorySelect.addEventListener("change", () => {
    checkForm();
  });

  addProjectForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", titleInput.value);
    formData.append("image", fileInput.files[0]);
    formData.append("category", categorySelect.value);
    const response = await fetch(urlApi + "works", {
      method: "post",
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      body: formData,
    });
    if (response.ok) {
      // ← ici
      const newWork = await response.json();
      displayWork(newWork);
      formView.classList.add("hidden");
      galleryView.classList.remove("hidden");
      addProjectForm.reset();
      imgPhotoZone.classList.add("hidden"); // hide the preview
      txtAddPhoto.classList.remove("hidden"); // show the add photo button
      iconPhoto.classList.remove("hidden"); // show the icon
      typePhoto.classList.remove("hidden"); // show the type file info
      checkForm()// disable the submit button again
    }
  });
} else {
  login.textContent = "login";
}

function checkForm() {
  if (
    titleInput.value !== "" &&
    fileInput.files.length !== 0 &&
    categorySelect.value !== ""
  ) {
    btnSubmit.disabled = false;
  } else {
    btnSubmit.disabled = true;
  }
}
