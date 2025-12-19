document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("aboutChart");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Low Risk", "Medium Risk", "High Risk"],
      datasets: [{
        data: [60, 25, 15],
        backgroundColor: [
          "#4CAF50",
          "#FFC107",
          "#F44336"
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
});
