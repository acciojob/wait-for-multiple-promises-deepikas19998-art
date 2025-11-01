const output = document.getElementById("output");
const loadingRow = document.getElementById("loading");

// Function that returns a promise resolving after a random delay (1–3 seconds)
function createRandomPromise() {
  const timeTaken = (Math.random() * 2 + 1).toFixed(3); // between 1 and 3
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(parseFloat(timeTaken));
    }, timeTaken * 1000);
  });
}

// Main function to run promises and populate table
function loadPromises() {
  const startTime = performance.now();

  // Create 3 promises
  const promises = [createRandomPromise(), createRandomPromise(), createRandomPromise()];

  Promise.all(promises)
    .then((times) => {
      const endTime = performance.now();
      const totalTime = ((endTime - startTime) / 1000).toFixed(3);

      // Remove loading row
      if (loadingRow) {
        loadingRow.remove();
      }

      // Add rows for each promise
      times.forEach((time, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>Promise ${index + 1}</td>
          <td>${time.toFixed(3)}</td>
        `;
        output.appendChild(row);
      });

      // Add total row
      const totalRow = document.createElement("tr");
      totalRow.innerHTML = `
        <td>Total</td>
        <td>${totalTime}</td>
      `;
      output.appendChild(totalRow);
    })
    .catch((error) => {
      // Handle errors gracefully
      output.innerHTML = `
        <tr><td colspan="2" style="color:red;">Error: ${error}</td></tr>
      `;
    });
}

// Run the promises when the page loads
loadPromises();
