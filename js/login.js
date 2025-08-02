// ✅ Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAkxwA9kKhGqJhvxVe9iombS7hVz3_1mOE",
  authDomain: "gymbuddy-179dc.firebaseapp.com",
  projectId: "gymbuddy-179dc",
  storageBucket: "gymbuddy-179dc.appspot.com", // ✅ Fix storage bucket
  messagingSenderId: "767875184847",
  appId: "1:767875184847:web:201fe679e9267525621fba"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
window.auth = auth;
window.db = db;

// ===================== POPUP FUNCTIONS =====================
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

// ===================== AUTH FUNCTIONS =====================

// 🔹 REGISTER USER
async function register() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const role = document.getElementById("signup-role").value;

  if (!email || !password || !role) {
    alert("Please fill all fields to sign up.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save role in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      role: role
    });

    alert(`Account created for ${user.email} as ${role}`);
    closePopup('signup-popup');
  } catch (error) {
    alert(`Sign Up Failed: ${error.message}`);
  }
}

// 🔹 LOGIN USER WITH ROLE CHECK
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check Firestore role
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      alert("No user data found! Please sign up first.");
      await signOut(auth);
      return;
    }

    const userData = userDoc.data();
    if (userData.role !== selectedRole) {
      alert(`Login denied. This account is registered as ${userData.role}.`);
      await signOut(auth);
      return;
    }

    alert(`Logged in as ${selectedRole} successfully!`);
    closePopup('login-popup');

  } catch (error) {
    alert(`Login Failed: ${error.message}`);
  }
}

// ===================== GYM REGISTER =====================
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

  console.log({
    gymName: gymName,
    adminEmail: gymEmail,
    adminPass: gymPass,
    equipment: equipmentData
  });

  alert("Gym Registered Successfully!");
  closePopup('gym-popup');
}

// ✅ Expose to HTML
window.login = login;
window.register = register;
window.openRolePopup = openRolePopup;
window.openLoginPopup = openLoginPopup;
window.openSignUpPopup = openSignUpPopup;
window.openGymPopup = openGymPopup;
window.addEquipment = addEquipment;
window.registerGym = registerGym;
window.closePopup = closePopup;
