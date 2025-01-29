// Function to populate CMYK values from 0 to 100 in the dropdowns
function setCMYKValues() {
    const selectors = ['cyan', 'magenta', 'yellow', 'black'];
    selectors.forEach(selector => {
      const dropdown = docu// Function to populate CMYK dropdowns (0-100%)
      function populateDropdowns() {
          const selectors = ['cyan', 'magenta', 'yellow', 'black'];
          selectors.forEach(selector => {
              const dropdown = document.getElementById(selector);
              dropdown.innerHTML = ""; // Clear previous values
              for (let i = 0; i <= 100; i += 10) { // Step of 10 for better control
                  let option = document.createElement("option");
                  option.value = i;
                  option.textContent = i;
                  dropdown.appendChild(option);
              }
          });
      }
      
      // Convert CMYK to RGB
      function cmykToRgb(c, m, y, k) {
          let r = 255 * (1 - c / 100) * (1 - k / 100);
          let g = 255 * (1 - m / 100) * (1 - k / 100);
          let b = 255 * (1 - y / 100) * (1 - k / 100);
          return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
      }
      
      // Generate color based on CMYK selection
      function generateColor() {
          const c = document.getElementById('cyan').value;
          const m = document.getElementById('magenta').value;
          const y = document.getElementById('yellow').value;
          const k = document.getElementById('black').value;
      
          const rgbColor = cmykToRgb(c, m, y, k);
          const displayBox = document.getElementById('color-display');
          displayBox.style.backgroundColor = rgbColor;
          displayBox.textContent = `CMYK(${c}, ${m}, ${y}, ${k}) → ${rgbColor}`;
      }
      
      // Initialize dropdowns and event listener
      window.onload = function () {
          populateDropdowns();
          document.getElementById('generate-btn').addEventListener('click', generateColor);
      };
      ment.getElementById(selector);
      for (let i = 0; i <= 100; i += 5) { // Step of 5 for better control
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        dropdown.appendChild(option);
      }
    });
}

// Call function on page load
window.onload = setCMYKValues;

// Convert CMYK to RGB
function cmykToRgb(c, m, y, k) {
    let r = 255 * (1 - c / 100) * (1 - k / 100);
    let g = 255 * (1 - m / 100) * (1 - k / 100);
    let b = 255 * (1 - y / 100a) * (1 - k / 100);
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

// Generate color based on selection
document.getElementById('generate-btn').addEventListener('click', () => {
  const c = document.getElementById('cyan').value;
  const m = document.getElementById('magenta').value;
  const y = document.getElementById('yellow').value;
  const k = document.getElementById('black').value;

  const color = cmykToRgb(c, m, y, k);
  document.getElementById('color-display').style.backgroundColor = color;
  document.getElementById('color-display').textContent = `CMYK(${c}, ${m}, ${y}, ${k})`;
});
