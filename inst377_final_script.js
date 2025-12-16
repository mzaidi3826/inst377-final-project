document.getElementById("emailForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const resultDiv = document.getElementById("result");

    resultDiv.textContent = "Checking email risk...";

    try {
      const response = await fetch(`/api/check-email?email=${email}`);
      const data = await response.json();

      resultDiv.textContent = `Risk Level: ${data.risk}`;
    } catch (err) {
      resultDiv.textContent = "Error checking email.";
    }
});
