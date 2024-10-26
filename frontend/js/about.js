// about.js

document.addEventListener('DOMContentLoaded', () => {
  const founders = document.querySelectorAll('.founder');
  
  const animateFounder = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        
        // Animate text word by word
        const paragraph = entry.target.querySelector('.founder-text p');
        const words = paragraph.textContent.split(' ');
        paragraph.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
        
        const spans = paragraph.querySelectorAll('span');
        spans.forEach((span, index) => {
          span.style.animationDelay = `${index * 0.05}s`;
        });
        
        observer.unobserve(entry.target);
      }
    });
  };

  const founderObserver = new IntersectionObserver(animateFounder, {
    root: null,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  founders.forEach(founder => {
    founderObserver.observe(founder);
  });
});
