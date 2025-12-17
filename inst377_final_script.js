let riskChart;

function renderChart(score) {
    const ctx = document.getElementById("riskChart").getContext("2d");

    const color =
        score >= 70 ? "rgba(255, 99, 132, 0.7)" :
        score >= 40 ? "rgba(255, 206, 86, 0.7)" :
        "rgba(75, 192, 192, 0.7)";

    if (riskChart) {
        riskChart.data.datasets[0].data = [score];
        riskChart.data.datasets[0].backgroundColor = [color];
        riskChart.update();
        return;
    }

    riskChart = new Chart(ctx, {
        type: "bar",
        data: {
        labels: ["Email Risk Score"],
        datasets: [{
            label: "Risk Score (0–100)",
            data: [score],
            backgroundColor: [color]
        }]
        },
        options: {
        responsive: true,
        scales: {
            y: {
            min: 0,
            max: 100,
            title: {
                display: true,
                text: "Risk Score"
            }
            }
        }
        }
    });
}

document.getElementById("emailForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Checking email risk...";

  try {
    const response = await fetch(
      `/api/check-email?email=${encodeURIComponent(email)}`
    );
    const data = await response.json();

    if (data.error) {
      resultDiv.textContent = data.error;
      return;
    }

    resultDiv.innerHTML = `
      <h3>Risk Assessment</h3>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Risk Level:</strong> ${data.riskLevel}</p>
      <p><strong>Risk Score:</strong> ${data.riskScore} / 100</p>

      <h4>Why this score?</h4>
      <ul>
        ${(data.reasons && data.reasons.length > 0)
          ? data.reasons.map(r => `<li>${r}</li>`).join("")
          : "<li>No significant risk factors detected</li>"
        }
      </ul>
    `;

    renderChart(data.riskScore);

  } catch (err) {
    resultDiv.textContent = "Failed to check email risk.";
  }
});

async function loadSampleEmails() {
  try {
    const response = await fetch("/data/sample_emails.csv");
    const text = await response.text();

    const lines = text.split("\n").slice(1);
    const list = document.getElementById("sampleEmails");

    lines.forEach(line => {
      const email = line.trim();
      if (!email) return;

      const li = document.createElement("li");
      li.textContent = email;

      li.addEventListener("click", () => {
        document.getElementById("email").value = email;
      });

      list.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to load sample emails", err);
  }
}

// Load samples on page load
loadSampleEmails();
