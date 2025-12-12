// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize confetti
    initConfetti();
    
    // Initialize scroll animations for photos
    initScrollAnimations();
    
    // Add some initial animation to the cake
    animateCake();
});

// Confetti animation
function initConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#FF6B8B', '#FFD166', '#06D6A0', '#4FC3F7', '#FF8E53', '#FFEB3B'];
    
    // Create confetti elements
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 5;
        
        // Apply styles
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size * 2}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.borderRadius = '50%';
        
        // Create animation
        confetti.style.animation = `confetti-fall ${animationDuration}s linear ${animationDelay}s infinite`;
        
        // Add to container
        confettiContainer.appendChild(confetti);
    }
}

// Photo scroll animations using IntersectionObserver
function initScrollAnimations() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class when in viewport
                entry.target.classList.add('active');
            } else {
                // Remove active class when out of viewport (for replay on scroll back)
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point
    });
    
    // Observe each photo item
    photoItems.forEach(item => {
        observer.observe(item);
    });
}

// Cake animation
function animateCake() {
    const cake = document.querySelector('.cake');
    const flame = document.querySelector('.flame');
    
    // Randomly change flame color
    setInterval(() => {
        const colors = ['#FFEB3B', '#FF9800', '#FF5722', '#FFEB3B'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        flame.style.backgroundColor = randomColor;
        flame.style.boxShadow = `0 0 20px ${randomColor}`;
    }, 500);
    
    // Add occasional "wiggle" to cake
    setInterval(() => {
        cake.style.transform = 'translateY(-20px) rotateY(15deg)';
        
        setTimeout(() => {
            cake.style.transform = 'translateY(0) rotateY(0)';
        }, 300);
    }, 5000);
}

// Add some interactive effects to photos
function addPhotoInteractivity() {
    const photos = document.querySelectorAll('.photo');
    
    photos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Call the interactivity function after a short delay
setTimeout(addPhotoInteractivity, 1000);

// Add a scroll progress indicator (optional enhancement)
function addScrollIndicator() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.backgroundColor = 'var(--primary)';
    progressBar.style.width = '0%';
    progressBar.style.zIndex = '1000';
    progressBar.style.transition = 'width 0.3s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Uncomment the line below to add a scroll progress bar
// addScrollIndicator();