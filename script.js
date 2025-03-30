document.getElementById("submit-button").addEventListener("click", function () {
  const fileInput = document.getElementById("file-upload");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload a file first.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const text = event.target.result;
    const data = {};

    // Parse the file data
    text.split("\n").forEach((line) => {
      const [key, value] = line.split(/: (.+)/);
      if (key && value) data[key.trim()] = value.trim();
    });

    // Alert to check if data is loaded correctly
    alert(
      "File Loaded Successfully! Here's the first key-value pair: " +
        Object.entries(data)[0]
    );

    // Log the parsed data for debugging
    console.log("Parsed data:", data);

    // Fill the table cells based on the data
    document.querySelectorAll("tr").forEach((row, index) => {
      if (index > 0) {
        // skip header row
        row.querySelectorAll("td").forEach((td) => {
          const key = td.className; // Get the class name of the td
          if (data[key]) {
            console.log(`Setting ${key} to ${data[key]}`); // Debugging: Show which data is being added
            td.innerHTML = data[key]; // Assign the value from data
          }
        });
      }
    });
  };

  reader.onerror = function (error) {
    console.error("Error reading file:", error);
  };

  // Read the file as text
  reader.readAsText(file);
});

// Hardcode the dates 1-31 for the "תאריך" column
document.addEventListener("DOMContentLoaded", () => {
  const dateCells = document.querySelectorAll("td.date");
  dateCells.forEach((td, index) => {
    td.textContent = index + 1; // Set text content to 1 through 31
  });
});
