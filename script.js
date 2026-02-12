/**
 * =================================================
 *  GRISHMA BHURTYAL - PORTFOLIO JAVASCRIPT
 *  Complete interactive functionality for portfolio
 * =================================================
 */

'use strict';

/**
 * ====================
 * UTILITY FUNCTIONS
 * ====================
 */

// Debounce function for performance optimization
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

// Throttle function for scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * ====================
 * THEME TOGGLE
 * ====================
 */
const themeToggle = (() => {
    const toggleBtn = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme or use system preference
    const getCurrentTheme = () => {
        return localStorage.getItem('theme') || 
               (prefersDarkScheme.matches ? 'dark' : 'light');
    };
    
    // Set theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };
    
    // Initialize theme
    const init = () => {
        const currentTheme = getCurrentTheme();
        setTheme(currentTheme);
        
        // Toggle theme on button click
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
            });
        }
    };
    
    return { init };
})();

/**
 * ====================
 * SCROLL PROGRESS INDICATOR
 * ====================
 */
const scrollProgress = (() => {
    const progressBar = document.getElementById('scrollProgress');
    
    const updateProgress = () => {
        if (!progressBar) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollPercent}%`;
    };
    
    const init = () => {
        window.addEventListener('scroll', throttle(updateProgress, 10));
    };
    
    return { init };
})();

/**
 * ====================
 * NAVIGATION
 * ====================
 */
const navigation = (() => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    // Handle navbar background on scroll
    const handleScroll = () => {
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Handle mobile menu toggle
    const toggleMenu = () => {
        if (!menuToggle || !navLinks) return;
        
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    };
    
    // Close menu when clicking outside
    const handleClickOutside = (e) => {
        if (!menuToggle || !navLinks) return;
        
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Smooth scroll to section
    const smoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            if (navLinks && navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Update active link
            updateActiveLink(targetId);
        }
    };
    
    // Update active navigation link based on scroll position
    const updateActiveLink = (activeId = null) => {
        const sections = document.querySelectorAll('section[id]');
        const navHeight = navbar ? navbar.offsetHeight : 0;
        
        if (activeId) {
            navLinkElements.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === activeId);
            });
            return;
        }
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = `#${section.getAttribute('id')}`;
            }
        });
        
        navLinkElements.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentSection);
        });
    };
    
    const init = () => {
        // Scroll event for navbar background
        window.addEventListener('scroll', throttle(handleScroll, 50));
        
        // Scroll event for active link
        window.addEventListener('scroll', throttle(updateActiveLink, 100));
        
        // Menu toggle
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMenu);
        }
        
        // Click outside to close menu
        document.addEventListener('click', handleClickOutside);
        
        // Smooth scroll for nav links
        navLinkElements.forEach(link => {
            link.addEventListener('click', smoothScroll);
        });
        
        // Initial check
        handleScroll();
        updateActiveLink();
    };
    
    return { init };
})();

/**
 * ====================
 * TYPING EFFECT
 * ====================
 */
const typingEffect = (() => {
    const typingElement = document.getElementById('typingText');
    const texts = [
        'Computer Engineer',
        'AI Enthusiast',
        'ML Developer',
        'Data Analyst',
        'Research Scholar'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const type = () => {
        if (!typingElement) return;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(type, typingSpeed);
    };
    
    const init = () => {
        if (typingElement) {
            setTimeout(type, 1000);
        }
    };
    
    return { init };
})();

/**
 * ====================
 * NEURAL NETWORK BACKGROUND
 * ====================
 */
const neuralNetwork = (() => {
    const canvas = document.getElementById('neuralBg');
    if (!canvas) return { init: () => {} };
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = 2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 245, 255, 0.6)';
            ctx.fill();
        }
    }
    
    // Initialize particles
    const initParticles = () => {
        particles = [];
        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }
    };
    
    // Draw connections between nearby particles
    const drawConnections = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 245, 255, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    };
    
    // Animation loop
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    };
    
    // Resize canvas
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    };
    
    const init = () => {
        resizeCanvas();
        animate();
        
        window.addEventListener('resize', debounce(resizeCanvas, 200));
    };
    
    const destroy = () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    };
    
    return { init, destroy };
})();

/**
 * ====================
 * ANIMATED COUNTERS
 * ====================
 */
const animatedCounters = (() => {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounter = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                element.textContent = Math.floor(current * 100) / 100;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const checkScroll = () => {
        if (hasAnimated) return;
        
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const rect = heroSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            counters.forEach(counter => animateCounter(counter));
            hasAnimated = true;
        }
    };
    
    const init = () => {
        if (counters.length > 0) {
            window.addEventListener('scroll', throttle(checkScroll, 100));
            checkScroll(); // Check on load
        }
    };
    
    return { init };
})();

/**
 * ====================
 * SKILL BARS ANIMATION
 * ====================
 */
const skillBars = (() => {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const animatedBars = new Set();
    
    const animateSkillBar = (bar) => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
        animatedBars.add(bar);
    };
    
    const checkScroll = () => {
        skillProgressBars.forEach(bar => {
            if (animatedBars.has(bar)) return;
            
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                animateSkillBar(bar);
            }
        });
    };
    
    const init = () => {
        if (skillProgressBars.length > 0) {
            window.addEventListener('scroll', throttle(checkScroll, 100));
            checkScroll(); // Check on load
        }
    };
    
    return { init };
})();

/**
 * ====================
 * PROJECT FILTERING
 * ====================
 */
const projectFilter = (() => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    const filterProjects = (category) => {
        projectCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategories.includes(category)) {
                card.style.display = 'block';
                // Trigger reflow for animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    };
    
    const init = () => {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                const category = button.getAttribute('data-filter');
                filterProjects(category);
            });
        });
    };
    
    return { init };
})();

/**
 * ====================
 * FORM VALIDATION & SUBMISSION
 * ====================
 */
const contactForm = (() => {
    const form = document.getElementById('contactForm');
    const submitBtn = form ? form.querySelector('.submit-btn') : null;
    const formMessage = form ? form.querySelector('.form-message') : null;
    
    // Validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        subject: /^.{3,100}$/,
        message: /^.{10,500}$/
    };
    
    // Validate single field
    const validateField = (field) => {
        const value = field.value.trim();
        const fieldName = field.name;
        const errorElement = field.nextElementSibling;
        
        let isValid = true;
        let errorMessage = '';
        
        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (patterns[fieldName] && !patterns[fieldName].test(value)) {
            isValid = false;
            
            switch (fieldName) {
                case 'name':
                    errorMessage = 'Please enter a valid name (2-50 characters)';
                    break;
                case 'email':
                    errorMessage = 'Please enter a valid email address';
                    break;
                case 'subject':
                    errorMessage = 'Subject must be 3-100 characters';
                    break;
                case 'message':
                    errorMessage = 'Message must be 10-500 characters';
                    break;
            }
        }
        
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = errorMessage;
        }
        
        field.classList.toggle('error', !isValid);
        return isValid;
    };
    
    // Validate entire form
    const validateForm = () => {
        if (!form) return false;
        
        const fields = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    };
    
    // Show form message
    const showMessage = (message, type) => {
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showMessage('Please fix the errors in the form', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // In a real implementation, you would send the data to a server:
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
            
            console.log('Form data:', data);
            
            // Show success message
            showMessage('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Oops! Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    };
    
    const init = () => {
        if (!form) return;
        
        // Add real-time validation
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field);
                }
            });
        });
        
        // Handle form submission
        form.addEventListener('submit', handleSubmit);
    };
    
    return { init };
})();

/**
 * ====================
 * RESUME DOWNLOAD
 * ====================
 */
const resumeDownload = (() => {
    const downloadBtn = document.getElementById('downloadResume');
    
    const handleDownload = (e) => {
        e.preventDefault();
        
        // In a real implementation, replace with actual resume file path
        const resumePath = 'assets/Grishma_Bhurtyal_Resume.pdf';
        
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = resumePath;
        link.download = 'Grishma_Bhurtyal_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // For demo purposes, show alert
        alert('Resume download started! (Note: In production, add actual resume file path)');
    };
    
    const init = () => {
        if (downloadBtn) {
            downloadBtn.addEventListener('click', handleDownload);
        }
    };
    
    return { init };
})();

/**
 * ====================
 * BACK TO TOP BUTTON
 * ====================
 */
const backToTop = (() => {
    const button = document.getElementById('backToTop');
    
    const handleScroll = () => {
        if (!button) return;
        
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    };
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    const init = () => {
        if (!button) return;
        
        window.addEventListener('scroll', throttle(handleScroll, 100));
        button.addEventListener('click', scrollToTop);
        
        // Initial check
        handleScroll();
    };
    
    return { init };
})();

/**
 * ====================
 * AOS (Animate On Scroll) ALTERNATIVE
 * ====================
 */
const scrollAnimations = (() => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // Optional: Unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const init = () => {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s ease';
            
            observer.observe(element);
        });
        
        // Add CSS class for animated elements
        const style = document.createElement('style');
        style.textContent = `
            .aos-animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    };
    
    return { init };
})();

/**
 * ====================
 * PARALLAX EFFECTS
 * ====================
 */
const parallax = (() => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    const handleScroll = () => {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax-speed') || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    };
    
    const init = () => {
        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', throttle(handleScroll, 10));
        }
    };
    
    return { init };
})();

/**
 * ====================
 * INITIALIZE ALL MODULES
 * ====================
 */
const init = () => {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
};

function initializeApp() {
    console.log('🚀 Initializing portfolio...');
    
    try {
        // Initialize all modules
        themeToggle.init();
        scrollProgress.init();
        navigation.init();
        typingEffect.init();
        neuralNetwork.init();
        animatedCounters.init();
        skillBars.init();
        projectFilter.init();
        contactForm.init();
        resumeDownload.init();
        backToTop.init();
        scrollAnimations.init();
        parallax.init();
        
        console.log('✅ Portfolio initialized successfully!');
    } catch (error) {
        console.error('❌ Error initializing portfolio:', error);
    }
}

// Start the application
init();

/**
 * ====================
 * EXPORT FOR TESTING
 * ====================
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        themeToggle,
        scrollProgress,
        navigation,
        typingEffect,
        neuralNetwork,
        animatedCounters,
        skillBars,
        projectFilter,
        contactForm,
        resumeDownload,
        backToTop,
        scrollAnimations,
        parallax
    };
}