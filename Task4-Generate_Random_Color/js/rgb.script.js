// Function to generate a random RGB color
function getRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return { r, g, b, rgb: `rgb(${r}, ${g}, ${b})`, hex: rgbToHex(r, g, b) };
}

// Function to convert RGB to Hex
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// Function to generate and display 10 random colors in a table
function generateRandomColors() {
  const container = document.getElementById("random-colors-container");

  // Clear previous table if it exists
  container.innerHTML = "";

  // Create a new table
  const table = document.createElement("table");
  table.classList.add("random-colors-table");

  // Add table header
  table.innerHTML = `
    <thead>
      <tr>
        <th>RGB Values</th>
        <th>Hexadecimal</th>
        <th>Color</th>
      </tr>
    </thead>
  `;

  const tbody = document.createElement("tbody");

  for (let i = 0; i < 10; i++) {
    const color = getRandomColor();

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${color.rgb}</td>
      <td>${color.hex}</td>
      <td>
        <div class="random-color-box" style="background-color: ${color.rgb}; width: 40px; height: 40px;"></div>
      </td>
    `;
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  container.appendChild(table);
}

// Function to update color selection
function updateSelectedColor() {
  const r = document.getElementById("red").value;
  const g = document.getElementById("green").value;
  const b = document.getElementById("blue").value;
  const hex = rgbToHex(r, g, b);

  document.getElementById("rgb-float-values").textContent = `RGB(${r}, ${g}, ${b})`;
  document.getElementById("hex-display").textContent = hex;
  document.getElementById("color-display").style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// Function to populate dropdowns
function setValues() {
  const selectors = ["red", "green", "blue"];
  selectors.forEach(selector => {
    const dropdown = document.getElementById(selector);
    dropdown.innerHTML = "";
    for (let i = 0; i <= 255; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      dropdown.appendChild(option);
    }
  });
}

// Event Listeners
document.getElementById("generate-btn").addEventListener("click", generateRandomColors);
document.getElementById("red").addEventListener("change", updateSelectedColor);
document.getElementById("green").addEventListener("change", updateSelectedColor);
document.getElementById("blue").addEventListener("change", updateSelectedColor);

// Initialize dropdowns on page load
window.onload = function () {
  setValues();
};

// Load the navbar
$(document).ready(function () {
  $("#navbar").load("Navbar.html", function(response, status, xhr) {
    if (status === "error") {
      console.error("Navbar failed to load: ", xhr.status, xhr.statusText);
    }
  });
});
