document.addEventListener("DOMContentLoaded", () => {
    const ctx = document
        .getElementById("riskBreakdownChart")
        .getContext("2d");

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: [
                "Fraud Score",
                "Disposable Email",
                "Abuse History",
                "Deliverability",
                "Domain Reputation"
            ],
            datasets: [{
                data: [40, 25, 20, 10, 15],
                backgroundColor: [
                    "#ff6384",
                    "#ffcd56",
                    "#ff9f40",
                    "#4bc0c0",
                    "#36a2eb"
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                },
                title: {
                    display: true,
                    text: "Email Risk Factor Contribution (%)"
                }
            }
        }
    });
});
