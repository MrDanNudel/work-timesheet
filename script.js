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

    // Log the parsed data for debugging
    console.log("Parsed data:", data);

    // Mapping the keys from the text file to the class names of the <td> elements
    const keyToClassNameMap = {
      "מקום התייצבות": "work-location",
      "שעת התייצבות": "start-time",
      "שעת סיום": "end-time",
      "סהכ שעות": "total-hours",
      "תחילת פיצול": "split-start",
      "סיום פיצול": "split-end",
      'סה"כ פיצול': "total-split",
      'סה"כ שעות נוספות': "total-overtime",
      שינה: "sleep",
      'מרחק בק"מ': "distance",
      "עלות נסיעה": "travel-cost",
      "מנהל נסיעה": "travel-manager",
      חתימה: "signature",
      "מספר טלפון של מנהל נסיעה": "manager-phone",
    };

    // Fill the table cells based on the data
    document.querySelectorAll("tr").forEach((row, index) => {
      if (index > 0) {
        // Skip the header row
        row.querySelectorAll("td").forEach((td) => {
          // Skip cells with the "empty" class
          if (td.classList.contains("empty")) return;

          const className = td.className;

          // Skip the date column (תאריך) as it is hardcoded
          if (className === "date") {
            td.textContent = index; // Set text content to 1 through 31
            return;
          }

          // Find the key that corresponds to the class name of the <td>
          const key = Object.keys(keyToClassNameMap).find(
            (k) => keyToClassNameMap[k] === className
          );

          // Debugging: Log the className and the key to see if they're being matched correctly
          console.log(`Checking className: ${className}, key: ${key}`);

          // Check if a key was found and if data exists for that key
          if (key && data[key]) {
            console.log(`Setting ${className} to ${data[key]}`); // Debugging: Show which data is being added
            td.innerHTML = data[key]; // Assign the value from data
          } else {
            console.log(`No match for class: ${className}, key: ${key}`);
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
