function getMainPagePath(fileName) {
  const normalizedPath = window.location.pathname.replace(/\\/g, "/");
  const isGuidelinesPage = normalizedPath.includes("/mini-project-guidelines/");
  return isGuidelinesPage ? `../${fileName}` : fileName;
}

/* Password toggle */
function togglePassword(id, icon) {
  const input = document.getElementById(id);

  if (!input || !icon) {
    return;
  }

  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "\u{1F648}";
  } else {
    input.type = "password";
    icon.textContent = "\u{1F441}";
  }
}

/* Sign up */
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const error = document.getElementById("signupError");

    error.textContent = "";

    if (password !== confirmPassword) {
      error.textContent = "Passwords do not match!";
      return;
    }

    // getting existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // if username already exists
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      error.textContent = "User already exists!";
      return;
    }

    // new user
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("loggedInUser", username);
    window.location.href = getMainPagePath("index.html");
  });
}

/* Sign in */
const signinForm = document.getElementById("signinForm");

if (signinForm) {
  signinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const error = document.getElementById("loginError");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("loggedInUser", user.username);
      window.location.href = getMainPagePath("index.html");
    } else {
      error.textContent = "Invalid email or password";
    }
  });
}

/* Session check */
function checkAuth() {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = getMainPagePath("signin.html");
  }
}

/* Show username in navbar */
function showLoggedInUser() {
  const username = localStorage.getItem("loggedInUser");
  const userElement = document.getElementById("navUsername");

  if (userElement) {
    userElement.textContent = username ? username : "User";
  }
}

/* Logout */
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loggedInUser");
  window.location.href = getMainPagePath("signin.html");
}
