const urlApi = "http://localhost:5678/api/";
const form = document.querySelector("form");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const errorMessage = document.querySelector(".error-message");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = inputEmail.value;
  const password = inputPassword.value;
  const answer = await fetch(urlApi + "users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  });
  const data = await answer.json();
  if (answer.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
  } else {
    errorMessage.textContent ="Erreur dans l'identifiant ou le mot de passe" ;
  }
});
