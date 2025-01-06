document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission for demo
    alert('Thank you for your message! An email has been sent, and you can expect to receive a rsponse in 3-5 business days.');
    this.reset(); // Clear the form
});
