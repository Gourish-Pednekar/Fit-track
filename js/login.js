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
