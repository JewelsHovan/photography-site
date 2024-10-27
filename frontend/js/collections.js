// Collection items data
const collectionItems = [
    {
        title: 'University Football Match',
        description: 'An exhilarating match between rival universities capturing the intensity and spirit of college sports.',
        category: 'sports',
        image: 'assets/imgs/placeholders/sports.svg',
        link: '#'
    },
    {
        title: 'Graduation Ceremony',
        description: 'Celebrating academic achievements and new beginnings at the annual graduation ceremony.',
        category: 'graduations',
        image: 'assets/imgs/placeholders/graduation.svg',
        link: '#'
    },
    {
        title: 'Charity Gala',
        description: 'An elegant evening of philanthropy and community support at our annual charity gala.',
        category: 'social',
        image: 'assets/imgs/placeholders/social.svg',
        link: '#'
    }
];

class CollectionsGallery {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container not found:', containerId);
            return;
        }
        
        this.modal = document.getElementById('modal');
        this.modalTitle = document.getElementById('modal-title');
        this.modalDescription = document.getElementById('modal-description');
        this.modalViewMore = document.getElementById('modal-view-more');
        
        this.setupEventListeners();
        this.currentFilter = 'all';
    }

    createCard(item) {
        const card = document.createElement('div');
        card.className = 'collection-card';
        card.setAttribute('data-category', item.category);
        
        card.innerHTML = `
            <div class="image-container">
                <img src="${item.image}" alt="${item.title}" class="card-image">
                <div class="card-overlay">
                    <span class="view-collection-btn">View Collection</span>
                </div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
            </div>
        `;

        card.addEventListener('click', () => this.openModal(item));
        
        return card;
    }

    loadItems(items, animate = true) {
        // Fade out existing cards
        const existingCards = this.container.children;
        if (existingCards.length > 0) {
            Array.from(existingCards).forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
            });
        }

        // Clear container after fade out
        setTimeout(() => {
            this.container.innerHTML = '';
            const fragment = document.createDocumentFragment();

            items.forEach(item => {
                if (this.currentFilter === 'all' || item.category === this.currentFilter) {
                    const card = this.createCard(item);
                    if (animate) {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                    }
                    fragment.appendChild(card);
                }
            });

            this.container.appendChild(fragment);

            if (animate) {
                this.setupCardAnimations();
            }
        }, existingCards.length > 0 ? 200 : 0);
    }

    setupCardAnimations() {
        const cards = document.querySelectorAll('.collection-card');
        
        // Trigger entrance animations
        setTimeout(() => {
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 50);
    }

    setupEventListeners() {
        // Modal close button
        const closeBtn = document.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => this.closeModal());

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Category filtering
        const categories = document.querySelectorAll('.category-btn');
        categories.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.category === this.currentFilter) return;
                
                categories.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.category;
                this.loadItems(collectionItems, true);
            });
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal(item) {
        this.modalTitle.textContent = item.title;
        this.modalDescription.textContent = item.description;
        this.modalViewMore.href = item.link;
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new CollectionsGallery('collections-container');
    gallery.loadItems(collectionItems, true);
});
