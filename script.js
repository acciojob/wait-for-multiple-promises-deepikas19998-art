const output = document.getElementById("output");

// Function that returns a promise resolving after a random delay (1–3 seconds)
function createRandomPromise() {
  const timeTaken = (Math.random() * 2 + 1).toFixed(3); // between 1 and 3
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(parseFloat(timeTaken));
    }, timeTaken * 1000);
  });
}

// Main function to handle table updates
function loadPromises() {
  // Initially show "Loading..." (already in HTML)
  const startTime = performance.now();

  // Create 3 promises
  const promises = [createRandomPromise(), createRandomPromise(), createRandomPromise()];

  // Wait for all to resolve
  Promise.all(promises)
    .then((times) => {
      const endTime = performance.now();
      const totalTime = ((endTime - startTime) / 1000).toFixed(3);

      // Clear "Loading..." row
      output.innerHTML = "";

      // Add rows for each promise
      times.forEach((time, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>Promise ${index + 1}</td>
          <td>${time.toFixed(3)}</td>
        `;
        output.appendChild(row);
      });

      // Add total row (max of times OR actual elapsed time)
      const totalRow = document.createElement("tr");
      totalRow.innerHTML = `
        <td>Total</td>
        <td>${totalTime}</td>
      `;
      output.appendChild(totalRow);
    })
    .catch((err) => {
      // Handle errors gracefully
      output.innerHTML = `
        <tr><td colspan="2" style="color:red;">Error: ${err}</td></tr>
      `;
    });
}

// Run when page loads
loadPromises();

