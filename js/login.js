import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAkxwA9kKhGqJhvxVe9iombS7hVz3_1mOE",
    authDomain: "gymbuddy-179dc.firebaseapp.com",
    projectId: "gymbuddy-179dc",
  storageBucket: "gymbuddy-179dc.appspot.com",
    messagingSenderId: "767875184847",
    appId: "1:767875184847:web:201fe679e9267525621fba"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  window.auth = auth;
// Get Firebase Auth

// 🔹 LOGIN FUNCTION
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      alert(`Logged in successfully as ${user.email}`);
      closePopup('login-popup');
    })
    .catch(error => {
      alert(`Login Failed: ${error.message}`);
    });
}
function register() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const role = document.getElementById("signup-role").value;

  if (!email || !password || !role) {
    alert("Please fill all fields to sign up.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      alert(`Account created for ${user.email} as ${role}`);
      closePopup('signup-popup');
    })
    .catch(error => {
      alert(`Sign Up Failed: ${error.message}`);
    });
}

function openPopup(id) {
  document.getElementById(id).classList.remove('hidden');
  document.getElementById('blur-overlay').classList.remove('hidden');
}
function closePopup(id) {
  document.getElementById(id).classList.add('hidden');
  document.getElementById('blur-overlay').classList.add('hidden');
  const popupInputs = document.querySelectorAll(`#${id} input`);
  popupInputs.forEach(input => input.value = "");
}
function openRolePopup() {
  openPopup('role-popup');
}
let selectedRole = "";
function openLoginPopup(role) {
  selectedRole = role;
  document.getElementById('login-role-title').innerText = "Login as " + role;
  closePopup('role-popup');
  openPopup('login-popup');
}
function openSignUpPopup() {
  closePopup('role-popup');
  openPopup('signup-popup');
}
function openGymPopup() {
  openPopup('gym-popup');
}
function addEquipment() {
  const container = document.getElementById("equipment-list");
  const div = document.createElement("div");
  div.classList.add("equipment-entry");
  div.innerHTML = `
    <input type="text" placeholder="Equipment Name" class="equipment-name" />
    <input type="text" placeholder="Muscles Targeted" class="equipment-muscle" />
  `;
  container.appendChild(div);
}
function registerGym() {
  const gymName = document.getElementById("gym-name").value;
  const gymEmail = document.getElementById("gym-admin-email").value;
  const gymPass = document.getElementById("gym-admin-password").value;
  
  const equipmentNames = document.querySelectorAll(".equipment-name");
  const equipmentMuscles = document.querySelectorAll(".equipment-muscle");

  let equipmentData = [];
  for (let i = 0; i < equipmentNames.length; i++) {
    if (equipmentNames[i].value && equipmentMuscles[i].value) {
      equipmentData.push({
        name: equipmentNames[i].value,
        muscle: equipmentMuscles[i].value
      });
    }
  }

  if (!gymName || !gymEmail || !gymPass || equipmentData.length === 0) {
    alert("Please fill in all fields!");
    return;
  }

  // For now, log data to console
  console.log({
    gymName: gymName,
    adminEmail: gymEmail,
    adminPass: gymPass,
    equipment: equipmentData
  });

  alert("Gym Registered Successfully!");
  closePopup('gym-popup');
}
window.login = login;
window.register = register;
window.openRolePopup = openRolePopup;
window.openLoginPopup = openLoginPopup;
window.openSignUpPopup = openSignUpPopup;
window.openGymPopup = openGymPopup;
window.addEquipment = addEquipment;
window.registerGym = registerGym;
window.closePopup = closePopup;

