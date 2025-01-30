// Function to populate CMY values from 0 to 100 in the dropdowns
function setValues() {
    const selectors = ['cyan', 'magenta', 'yellow'];
    selectors.forEach(selector => {
        const dropdown = document.getElementById(selector);
        for (let i = 0; i <= 100; i++) {
            const option = document.createElement("option");
            option.value = i / 100; // Convert to decimal (0-1)
            option.textContent = i;
            dropdown.appendChild(option);
        }
    });
}

// Function to convert CMY to RGB
function cmyToRgb(c, m, y) {
    let r = 255 * (1 - c);
    let g = 255 * (1 - m);
    let b = 255 * (1 - y);
    return `RGB(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

// Function to store CMY color in local storage
function storeColor(c, m, y) {
    const color = { cyan: c, magenta: m, yellow: y };
    localStorage.setItem('lastCMYColor', JSON.stringify(color));
}

// Function to retrieve and display the last color from local storage
function displayLastColor() {
    const lastColor = JSON.parse(localStorage.getItem('lastCMYColor'));
    if (lastColor) {
        const { cyan, magenta, yellow } = lastColor;
        const rgbColor = cmyToRgb(cyan, magenta, yellow);

        document.getElementById('cmy-float-values').textContent = `CMY(${cyan.toFixed(2)}, ${magenta.toFixed(2)}, ${yellow.toFixed(2)})`;
        document.getElementById('rgb-equivalent').textContent = rgbColor;
        document.getElementById('color-display').style.backgroundColor = rgbColor;

        // Set the dropdown values
        document.getElementById('cyan').value = cyan;
        document.getElementById('magenta').value = magenta;
        document.getElementById('yellow').value = yellow;
    }
}

// Call function on page load
window.onload = function() {
    setValues();
    displayLastColor();
};

$(function () {
    $("#navbar").load("navbar.html");
  });

// Generate color based on selection
document.getElementById('generate-btn').addEventListener('click', () => {
    const cyan = parseFloat(document.getElementById('cyan').value);
    const magenta = parseFloat(document.getElementById('magenta').value);
    const yellow = parseFloat(document.getElementById('yellow').value);

    const rgbColor = cmyToRgb(cyan, magenta, yellow);

    document.getElementById('cmy-float-values').textContent = `CMY(${cyan.toFixed(2)}, ${magenta.toFixed(2)}, ${yellow.toFixed(2)})`;
    document.getElementById('rgb-equivalent').textContent = rgbColor;
    document.getElementById('color-display').style.backgroundColor = rgbColor;

    // Store the color in local storage
    storeColor(cyan, magenta, yellow);
});

