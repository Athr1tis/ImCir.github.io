// Loading screen
window.addEventListener('load', function() {
    setTimeout(function() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 0, 0, 0.95)';
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    setTimeout(function() {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 150);
        }
    }, 1500);
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skill cards hover effect with blood effect
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
        this.style.boxShadow = '0 20px 40px rgba(255, 0, 0, 0.5)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    });
});

// Project cards click effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px)';
        }, 150);
    });
});

// Book cards flip effect
document.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'rotateY(5deg) translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateY(0deg) translateY(0)';
    });
});

// Blood drip effect
function createBloodDrip() {
    const bloodDrip = document.createElement('div');
    bloodDrip.className = 'blood-drip';
    bloodDrip.style.left = Math.random() * window.innerWidth + 'px';
    bloodDrip.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(bloodDrip);
    
    setTimeout(() => {
        bloodDrip.remove();
    }, 3000);
}

// Create blood drips periodically
setInterval(createBloodDrip, 5000);

// Horror sound effect on hover (optional)
function playHorrorSound() {
    // Create a simple horror sound effect using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Add horror sound to skill cards (optional)
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Uncomment the next line if you want horror sounds
        // playHorrorSound();
    });
});

// Smooth reveal for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Cursor trail effect
let mouseX = 0;
let mouseY = 0;
let trail = [];

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create trail effect
    const dot = document.createElement('div');
    dot.style.position = 'fixed';
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    dot.style.width = '4px';
    dot.style.height = '4px';
    dot.style.backgroundColor = '#ff0000';
    dot.style.borderRadius = '50%';
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '9999';
    dot.style.opacity = '0.7';
    document.body.appendChild(dot);
    
    trail.push(dot);
    
    // Remove old trail elements
    if (trail.length > 10) {
        const oldDot = trail.shift();
        oldDot.remove();
    }
    
    // Animate trail
    setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
        setTimeout(() => {
            dot.remove();
        }, 300);
    }, 100);
});

// Text shadow effect on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.hero h1, .hero p');
    
    parallax.forEach(element => {
        const speed = scrolled * 0.5;
        element.style.textShadow = `${speed * 0.1}px ${speed * 0.1}px 20px rgba(255, 0, 0, 0.8)`;
    });
});

// Glitch effect for hero title
function addGlitchEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        setInterval(() => {
            heroTitle.style.textShadow = `
                2px 2px 0 #ff0000,
                -2px -2px 0 #00ff00,
                2px -2px 0 #0000ff
            `;
            setTimeout(() => {
                heroTitle.style.textShadow = '0 0 20px #ff0000';
            }, 100);
        }, 3000);
    }
}

// Initialize glitch effect
window.addEventListener('load', function() {
    setTimeout(addGlitchEffect, 2000);
});

// Dark mode toggle (if needed)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'B' for blood effect
    if (e.key === 'b' || e.key === 'B') {
        for (let i = 0; i < 5; i++) {
            setTimeout(createBloodDrip, i * 200);
        }
    }
    
    // Press 'G' for glitch effect
    if (e.key === 'g' || e.key === 'G') {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            heroTitle.style.textShadow = `
                2px 2px 0 #ff0000,
                -2px -2px 0 #00ff00,
                2px -2px 0 #0000ff
            `;
            setTimeout(() => {
                heroTitle.style.textShadow = '0 0 20px #ff0000';
            }, 500);
        }
    }
});

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #1a0000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 0, 0, 0.3);
        border-top: 4px solid #ff0000;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    loading.appendChild(spinner);
    document.body.appendChild(loading);
    
    // Remove loading after page loads
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 1500);
}); 