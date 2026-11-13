const urlApi = "http://localhost:5678/api/";
let form = document.querySelector("form");
let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let errorMessage = document.querySelector(".error-message");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let email = inputEmail.value;
  let password = inputPassword.value;
  let response = await fetch(urlApi + "users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
  } else {
    errorMessage.textContent ="Erreur dans l'identifiant ou le mot de passe" ;
  }
});
