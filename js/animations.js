// Reveal elements on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    const scaleElements = document.querySelectorAll('.scale-in');
    const rotateElements = document.querySelectorAll('.rotate-in');
    
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    // Function to add active class when element is in viewport
    function addActiveClass(elements) {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Check all animation element types
    addActiveClass(elements);
    addActiveClass(slideLeftElements);
    addActiveClass(slideRightElements);
    addActiveClass(scaleElements);
    addActiveClass(rotateElements);
}

// Run on scroll and on initial load
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPositionY = `calc(50% + ${scrollPosition * 0.5}px)`;
    });
}

// Property image hover effect
const propertyCards = document.querySelectorAll('.property-card');
propertyCards.forEach(card => {
    const image = card.querySelector('img');
    card.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// Button hover animation
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});