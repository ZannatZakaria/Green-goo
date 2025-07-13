const cycles = [
  { id: 1, name: "City Cruiser", price: "€5/hour", emoji: "🚲" },
  { id: 2, name: "Mountain Bike", price: "€8/hour", emoji: "🚵" },
  { id: 3, name: "Electric Scooter", price: "€10/hour", emoji: "🛴" }
];

let rented = JSON.parse(localStorage.getItem("rentedCycles") || "[]");
let customerInfo = JSON.parse(localStorage.getItem("customerInfo") || "null");

document.getElementById("customer-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const idNumber = document.getElementById("idNumber").value.trim();

  if (!name || !phone || !address || !idNumber) {
    alert("Please fill in all customer details.");
    return;
  }

  customerInfo = { name, phone, address, idNumber };
  localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
  alert("Customer info saved!");
});

function renderCycles() {
  const list = document.getElementById("cycle-list");
  list.innerHTML = "";

  cycles.forEach(cycle => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="emoji">${cycle.emoji}</div>
      <h2>${cycle.name}</h2>
      <p>${cycle.price}</p>
      <button class="rent-btn" ${rented.includes(cycle.id) ? "disabled" : ""} onclick="rentCycle(${cycle.id})">
        ${rented.includes(cycle.id) ? "Rented ✅" : "Rent Now"}
      </button>
    `;

    list.appendChild(card);
  });
}

function rentCycle(id) {
  if (!customerInfo) {
    alert("Please enter customer details before renting a cycle.");
    return;
  }

  if (!rented.includes(id)) {
    rented.push(id);
    localStorage.setItem("rentedCycles", JSON.stringify(rented));
    alert(`Cycle rented successfully!\n\nCustomer:\nName: ${customerInfo.name}\nPhone: ${customerInfo.phone}`);
    renderCycles();
  }
}

renderCycles();
