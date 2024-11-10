// JavaScript for Welcome Screen and Scrolling
document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const navbar = document.querySelector('.navbar');
    const heroSection = document.getElementById('hero');

    // Initialize AOS
    AOS.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-out',
        delay: 0,
    });

    // Scroll effect on welcome message click
    welcomeScreen.addEventListener('click', function() {
        // Scroll up the welcome screen
        welcomeScreen.style.transition = 'transform 1s ease-in-out';
        welcomeScreen.style.transform = 'translateY(-100%)'; // Move it out of view

        // Show main content after welcome screen moves up
        setTimeout(() => {
            mainContent.style.display = 'block'; // Show main content
            mainContent.style.opacity = '0'; // Start hidden
            mainContent.style.transition = 'opacity 1s ease-in-out';
            setTimeout(() => {
                mainContent.style.opacity = '1'; // Fade in main content
            }, 50); // Slight delay for fade-in effect
        }, 1000); // Time for welcome screen transition
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.classList.add('visible'); // Add class to show content
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
            navbar.classList.remove('visible'); // Remove class to hide content
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        let scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });

    // Project hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Lazy loading images
    const images = document.querySelectorAll('img');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    }, options);

    images.forEach(img => imageObserver.observe(img));

    // JavaScript for scrolling images in multiple carousels
    const carousels = document.querySelectorAll('.image-carousel');

    carousels.forEach(carousel => {
        let images = carousel.querySelectorAll('img');
        let currentImageIndex = 0;

        function showNextImage() {
            images[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            images[currentImageIndex].classList.add('active');
        }

        // Change image every 3 seconds
        const interval = setInterval(showNextImage, 3000);

        // Add click listener for immediate navigation
        images.forEach((image) => {
            image.addEventListener('click', () => {
                showNextImage();
                // Reset interval on click to prevent interference
                clearInterval(interval);
                setInterval(showNextImage, 3000);
            });
        });

        // Show the first image initially
        if (images.length > 0) {
            images[0].classList.add('active');
        }
    });
});
