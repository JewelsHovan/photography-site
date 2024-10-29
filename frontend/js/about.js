// Performance optimization using requestAnimationFrame
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading state
    const founders = document.querySelectorAll('.founder');
    const testimonials = document.querySelectorAll('.testimonial');
    
    // Intersection Observer for founders
    const animateFounder = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('in-view');
                    
                    // Animate text only if reduced motion is not preferred
                    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                        const paragraph = entry.target.querySelector('.founder-text p');
                        animateText(paragraph);
                    }
                    
                    observer.unobserve(entry.target);
                });
            }
        });
    };

    // Text animation function
    const animateText = (element) => {
        if (!element) return;
        
        const text = element.textContent;
        const words = text.split(' ');
        
        // Create document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.animationDelay = `${index * 50}ms`;
            fragment.appendChild(span);
        });
        
        element.textContent = '';
        element.appendChild(fragment);
    };

    // Initialize Intersection Observer with options
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const founderObserver = new IntersectionObserver(animateFounder, observerOptions);
    
    // Observe founders
    founders.forEach(founder => {
        founderObserver.observe(founder);
    });

    // Handle focus states for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('focused');
        });
        
        element.addEventListener('blur', () => {
            element.classList.remove('focused');
        });
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        console.log('Native lazy loading supported');
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }

    // Handle errors gracefully
    window.addEventListener('error', (e) => {
        console.error('An error occurred:', e.message);
        // Implement error tracking or reporting here
    });
});
