// Header Component
class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="container">
                    <a href="index.html" class="logo">Photography Collective</a>
                    <nav>
                        <div class="hamburger" aria-label="Toggle navigation" role="button" tabindex="0">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <ul class="nav-links">
                            <li style="--item-index: 1;"><a href="index.html">Home</a></li>
                            <li style="--item-index: 2;"><a href="about.html">About</a></li>
                            <li style="--item-index: 3;"><a href="#">Collections</a></li>
                            <li style="--item-index: 4;"><a href="#">Services</a></li>
                            <li style="--item-index: 5;"><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;

        // Add event listener for hamburger menu
        const hamburger = this.querySelector('.hamburger');
        const navLinks = this.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('nav-active');
        });
    }
}

// Footer Component
class FooterComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="container">
                    <div class="footer-columns">
                        <div class="footer-column">
                            <h3>Photography Collective</h3>
                            <p>Your story through our lens.</p>
                        </div>
                        <div class="footer-column">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="#">Collections</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                        <div class="footer-column">
                            <h3>Contact Us</h3>
                            <p>Email: info@photographycollective.com</p>
                            <p>Phone: (123) 456-7890</p>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2023 Photography Collective. All rights reserved.</p>
                        <div class="social-icons">
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Register the custom elements
customElements.define('header-component', HeaderComponent);
customElements.define('footer-component', FooterComponent);
