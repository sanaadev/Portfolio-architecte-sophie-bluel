const urlApi = "http://localhost:5678/api/";
let loginForm = document.querySelector(".login-form");
let inputEmail = document.getElementById("email");
let inputPassword = document.getElementById("password");
let errorMessage = document.querySelector(".error-message");

// Send the email and password to the API, then store the token and go to the home page
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let email = inputEmail.value;
  let password = inputPassword.value;
  try {
    let response = await fetch(urlApi + "users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    if (response.ok) {
      sessionStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe";
    }
  } catch (error) {
    errorMessage.textContent =
      "Impossible de contacter le serveur, veuillez recommencer.";
  }
});
