// contact.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple form validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const eventType = form["event-type"].value;
    const eventDate = form["event-date"].value;
    const message = form.message.value.trim();

    if (!name || !email || !eventType || !eventDate || !message) {
      alert("Please fill out all required fields.");
      return;
    }

    // Simulate form submission
    alert("Thank you for your message! We will get back to you soon.");
    form.reset();
  });
});
