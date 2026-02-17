// 1. Register new user
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  // Get users from localStorage or empty array
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(users);
  
// let users =[]
//   console.log( JSON.parse(localStorage.getItem("users")));
  


  // Check if email already exists
  const userExists = users.some(u => u.email === email);
//   console.log(userExists);
  
  if(userExists){
    alert("Email already registered!");
    return;
  }

  // Add new user
  users.push({ name, email, password });
//   console.log(users);
  
  localStorage.setItem("users", JSON.stringify(users));
    // console.log(users);

  alert("Registration successful! You can now login.");

  registerForm.reset();

  // Switch to login tab
  const loginTab = new bootstrap.Tab(document.getElementById("login-tab"));
  loginTab.show();
});

// 2. Login
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function(e){    
  e.preventDefault();
    // console.log(e.preventDefault());

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const remember = document.getElementById("rememberMe").checked;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

 if(user){
    alert("Login successful!");
    
    // Store logged in user
    if(remember){
        localStorage.setItem("loggedInUser", JSON.stringify(user));
    } else {
        sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    }

    // Redirect to index.html
    location.href = "index.html";



    // Redirect to dashboard or show welcome message

    // document.body.innerHTML = `<div class="text-center mt-5"><h1>Welcome, ${user.name}!</h1></div>`;

  } else {
    alert("Invalid email or password!");
  }
});
