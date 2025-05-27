// Header scroll effect
const header = document.getElementById('header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Animate nav toggle spans
    const spans = navToggle.querySelectorAll('span');
    if (nav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        // Reset the nav toggle spans
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Send data to PHP endpoint
        fetch('php/contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('There was a problem sending your message. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem sending your message. Please try again later.');
        });
    });
}

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialIndicators = document.querySelectorAll('.indicator');
const prevButton = document.querySelector('.testimonial-prev');
const nextButton = document.querySelector('.testimonial-next');
let currentSlide = 0;

function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Deactivate all indicators
    testimonialIndicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show the current slide and activate its indicator
    testimonialSlides[index].classList.add('active');
    testimonialIndicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
}

if (prevButton && nextButton) {
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Set up indicator clicks
    testimonialIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-play slides every 5 seconds
    setInterval(nextSlide, 5000);
}