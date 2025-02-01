// Function to generate a random CMY color
function getRandomColor() {
    let c = Math.floor(Math.random() * 256);
    let m = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    return { c, m, y, cmy: `cmy(${c}, ${m}, ${y})`, hex: cmyToHex(c, m, y) };
  }
  
  // Function to convert CMY to Hex
  function cmyToHex(c, m, y) {
    let r = 255 - c;
    let g = 255 - m;
    let b = 255 - y;
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
          <th>CMY Values</th>
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
        <td>${color.cmy}</td>
        <td>${color.hex}</td>
        <td>
          <div class="random-color-box" style="background-color: ${color.hex}; width: 40px; height: 40px;"></div>
        </td>
      `;
      tbody.appendChild(row);
    }
  
    table.appendChild(tbody);
    container.appendChild(table);
  }
  
  // Function to update color selection
  function updateSelectedColor() {
    const c = document.getElementById("cyan").value;
    const m = document.getElementById("magenta").value;
    const y = document.getElementById("yellow").value;
    const hex = cmyToHex(c, m, y);
  
    document.getElementById("cmy-float-values").textContent = `CMY(${c}, ${m}, ${y})`;
    document.getElementById("hex-display").textContent = hex;
    document.getElementById("color-display").style.backgroundColor = `rgb(${255 - c}, ${255 - m}, ${255 - y})`;
  }
  
  // Function to populate dropdowns
  function setValues() {
    const selectors = ["cyan", "magenta", "yellow"];
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
  document.getElementById("cyan").addEventListener("change", updateSelectedColor);
  document.getElementById("magenta").addEventListener("change", updateSelectedColor);
  document.getElementById("yellow").addEventListener("change", updateSelectedColor);
  
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
  

// Load Navbar
$(function () {
    $("#navbar").load("Navbar.html");
});


