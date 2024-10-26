// Toggle Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function() {
    this.classList.toggle('open');
    navLinks.classList.toggle('nav-active');
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains('nav-active') ? 'hidden' : 'auto';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('nav-active');
        document.body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('nav') && navLinks.classList.contains('nav-active')) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('nav-active');
        document.body.style.overflow = 'auto';
    }
});
