// Function to populate RGB values from 0 to 255 in the dropdowns
function setValues() {
  const selectors = ['red', 'green', 'blue'];
  selectors.forEach(selector => {
    const dropdown = document.getElementById(selector);
    for (let i = 0; i <= 255; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      dropdown.appendChild(option);
    }
  });
}

// Function to convert RGB to Hexadecimal
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

// Function to store RGB color in local storage
function storeColor(r, g, b) {
  const color = { red: r, green: g, blue: b };
  localStorage.setItem('lastColor', JSON.stringify(color));
}

// Function to retrieve and display the last color from local storage
function displayLastColor() {
  const lastColor = JSON.parse(localStorage.getItem('lastColor'));
  if (lastColor) {
    const { red, green, blue } = lastColor;
    const color = `rgb(${red}, ${green}, ${blue})`;
    const hexColor = rgbToHex(red, green, blue);

    document.getElementById('rgb-float-values').textContent = `RGB(${red}, ${green}, ${blue})`;
    document.getElementById('hex-display').textContent = `Hexadecimal: ${hexColor}`;
    document.getElementById('color-display').style.backgroundColor = color;

    // Set the dropdown values
    document.getElementById('red').value = red;
    document.getElementById('green').value = green;
    document.getElementById('blue').value = blue;
  }
}

// Call function on page load
window.onload = function() {
  setValues();
  displayLastColor();
};

// Generate color based on selection
document.getElementById('generate-btn').addEventListener('click', () => {
  const red = document.getElementById('red').value;
  const green = document.getElementById('green').value;
  const blue = document.getElementById('blue').value;

  const color = `rgb(${red}, ${green}, ${blue})`;
  const hexColor = rgbToHex(red, green, blue);

  document.getElementById('rgb-float-values').textContent = `RGB(${red}, ${green}, ${blue})`;
  document.getElementById('hex-display').textContent = `Hexadecimal: ${hexColor}`;
  document.getElementById('color-display').style.backgroundColor = color;

  // Store the color in local storage
  storeColor(red, green, blue);
});

// Load the navbar
$(function() {
  $("#navbar").load("navbar.html");
});