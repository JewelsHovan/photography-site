// Data for carousel items
const carouselItems = [
    {
      image: 'https://placeholder.pics/svg/300x200?text=University+Football+Match',
      title: 'University Football Match',
      description: 'An exhilarating match between rival universities.',
      category: 'sports',
      link: '#'
    },
    {
      image: 'https://placeholder.pics/svg/300x200?text=Graduation+Ceremony',
      title: 'Graduation Ceremony',
      description: 'Celebrating the achievements of graduates.',
      category: 'graduations',
      link: '#'
    },
    {
      image: 'https://placeholder.pics/svg/300x200?text=Charity+Gala',
      title: 'Charity Gala',
      description: 'An elegant evening supporting a great cause.',
      category: 'social',
      link: '#'
    },
    // Add more items as needed
  ];
  
  // Wheel Carousel Implementation
  document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const categories = document.querySelectorAll('.category-btn');
    let angle = 0;
    let radius = window.innerWidth > 768 ? 600 : 300; // Adjust radius based on screen size
    const itemCount = carouselItems.length;
  
    // Function to populate carousel
    function populateCarousel(items) {
      carousel.innerHTML = '';
      items.forEach((item, index) => {
        const theta = (2 * Math.PI / items.length) * index;
        const itemElement = document.createElement('div');
        itemElement.classList.add('carousel-item');
        itemElement.style.transform = `rotateY(${theta * (180 / Math.PI)}deg) translateZ(${radius}px)`;
        itemElement.dataset.index = index;
  
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
  
        itemElement.appendChild(img);
        carousel.appendChild(itemElement);
      });
    }
  
    // Initial population
    populateCarousel(carouselItems);
  
    // Smooth rotation function
    function rotateCarousel() {
      carousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
    }
  
    // Event listeners for carousel rotation
    let startX;
    let isDragging = false;
  
    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      e.preventDefault(); // Prevent default to avoid text selection
    });
  
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.pageX - startX;
      angle -= deltaX * 0.2;
      rotateCarousel();
      startX = e.pageX;
    });
  
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  
    // Touch events for mobile
    carousel.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
    });
  
    carousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].pageX - startX;
      const deltaY = e.touches[0].pageY - startY;
      
      // Check if the user is scrolling vertically
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        isDragging = false;
        return;
      }
      
      angle -= deltaX * 0.2;
      rotateCarousel();
      startX = e.touches[0].pageX;
      e.preventDefault(); // Prevent default only for horizontal scrolling
    });
  
    carousel.addEventListener('touchend', () => {
      isDragging = false;
    });
  
    // Click event for items
    carousel.addEventListener('click', (e) => {
      if (isDragging) return; // Prevent click when dragging
      const item = e.target.closest('.carousel-item');
      if (!item) return;
      const index = parseInt(item.dataset.index);
      openModal(carouselItems[index]);
    });
  
    // Modal functionality
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalViewMore = document.getElementById('modal-view-more');
  
    function openModal(item) {
      modalImage.src = item.image;
      modalTitle.textContent = item.title;
      modalDescription.textContent = item.description;
      modalViewMore.href = item.link;
      modal.style.display = 'block';
    }
  
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', (e) => {
      if (e.target == modal) {
        modal.style.display = 'none';
      }
    });
  
    // Category filtering
    categories.forEach((btn) => {
      btn.addEventListener('click', () => {
        categories.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        filterItems(category);
      });
    });
  
    function filterItems(category) {
      const filteredItems = category === 'all' ? carouselItems : carouselItems.filter(item => item.category === category);
      populateCarousel(filteredItems);
      angle = 0;
      carousel.style.transform = `rotateY(${angle}deg)`;
    }
  
    // Resize event listener
    window.addEventListener('resize', () => {
      radius = window.innerWidth > 768 ? 600 : 300;
      rotateCarousel();
    });
  });
