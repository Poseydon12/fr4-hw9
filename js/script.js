const form = document.getElementById("contact-form");
const contactsList = document.getElementById("contacts-list");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function renderContacts() {
  contactsList.innerHTML = "";
  contacts.forEach((contact, index) => {
    const div = document.createElement("div");
    div.className = "contact";
    div.innerHTML = `
      <strong>${contact.firstName} ${contact.lastName}</strong><br>
      Тел: ${contact.phone} <br>
      Email: ${contact.email}<br>
      <button onclick="editContact(${index})">Редагувати</button>
      <button onclick="deleteContact(${index})">Видалити</button>
    `;
    contactsList.appendChild(div);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newContact = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    phone: form.phone.value,
    email: form.email.value,
  };

  if (form.dataset.editIndex !== undefined) {
    contacts[form.dataset.editIndex] = newContact;
    delete form.dataset.editIndex;
    form.querySelector("button").textContent = "Зберегти";
  } else {
    contacts.push(newContact);
  }

  saveContacts();
  renderContacts();
  form.reset();
});

window.editContact = function (index) {
  const contact = contacts[index];
  form.firstName.value = contact.firstName;
  form.lastName.value = contact.lastName;
  form.phone.value = contact.phone;
  form.email.value = contact.email;
  form.dataset.editIndex = index;
  form.querySelector("button").textContent = "Оновити";
};

window.deleteContact = function (index) {
  if (confirm("Ви впевнені, що хочете видалити контакт?")) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
  }
};

renderContacts();
