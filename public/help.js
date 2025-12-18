// FAQ accordion
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");
        const answer = button.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});

// Sample email click
document.querySelectorAll(".sample-email").forEach(item => {
    item.addEventListener("click", () => {
        navigator.clipboard.writeText(item.textContent);

        Toastify({
        text: `Copied ${item.textContent} to clipboard`,
        duration: 3000,
        gravity: "top",
        position: "right",
        close: true
        }).showToast();
    });
});
