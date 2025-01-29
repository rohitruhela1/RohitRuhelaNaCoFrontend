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
  
// Call function on page load
window.onload = setValues;

// Generate color based on selection
document.getElementById('generate-btn').addEventListener('click', () => {
  const red = document.getElementById('red').value;
  const green = document.getElementById('green').value;
  const blue = document.getElementById('blue').value;

  const color = `rgb(${red}, ${green}, ${blue})`;
  document.getElementById('color-display').style.backgroundColor = color;
  document.getElementById('color-display').textContent = color;
});

$(function() {
    $("#navbar").load("navbar.html");
  });