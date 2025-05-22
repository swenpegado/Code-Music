document.addEventListener("DOMContentLoaded", function () {
    const keys = document.querySelectorAll(".key");
    const customizeButton = document.getElementById("customizeButton");

    // Create an object to store the color for each key
    const keyColors = {};

    let isCustomizing = false;

    customizeButton.addEventListener("click", function () {
        isCustomizing = !isCustomizing;

        // Toggle the button text based on customization status
        if (isCustomizing) {
            customizeButton.textContent = "Stop Customizing";
        } else {
            customizeButton.textContent = "Customize";
        }
    });

    keys.forEach((key) => {
        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.style.display = "none";

        key.addEventListener("click", function () {
            if (!isCustomizing) return;

            // Show the color picker when a key is clicked during customization
            colorPicker.click();

            // Listen for color selection
            colorPicker.addEventListener("input", function () {
                const customColor = colorPicker.value;

                // Apply the color to the clicked key
                key.style.backgroundColor = customColor;

                // Store the selected color for the clicked key
                keyColors[key.id] = customColor;
            });

            // Close the color picker after selecting a color
            colorPicker.addEventListener("change", function () {
                colorPicker.style.display = "none";
            });

            // Position the color picker relative to the key
            const rect = key.getBoundingClientRect();
            colorPicker.style.position = "absolute";
            colorPicker.style.top = `${rect.bottom}px`;
            colorPicker.style.left = `${rect.left}px`;
            colorPicker.style.display = "block";
        });
    });

    // Capture the key press event and select the corresponding key for customization
    document.addEventListener("keydown", function (event) {
        if (isCustomizing) {
            const pressedKey = event.key;
            const keyToCustomize = document.getElementById(`key${pressedKey.toUpperCase()}`);
            
            if (keyToCustomize) {
                keyToCustomize.click();
            }
        }
    });
});
