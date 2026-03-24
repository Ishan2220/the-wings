// Custom Cursor Glow
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursorGlow.style.top = `${e.clientY}px`;
            cursorGlow.style.left = `${e.clientX}px`;
        });
    });
}

// Interactive Horizontal Scroll Dragging
const slider = document.getElementById('scrollContainer');
let isDown = false;
let startX;
let scrollLeft;

if(slider) {
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // scroll speed multiplier
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Cinematic Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px" // triggers slightly before entering completely
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-scroll').forEach(el => {
    fadeObserver.observe(el);
});

// Active Link Highlighting with Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150; // offset for sticky nav
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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

// Smooth Scroll for Nav Links (Menu button fix)
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if(targetSection) {
            const yOffset = -80; // offset for sticky navbar
            const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    });
});

// "View Menu" secondary button
document.querySelectorAll('.trigger-menu').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.getElementById('menu');
        if(targetSection) {
            const yOffset = -80;
            const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    });
});

// Immersive Sauce Experience Interaction
const sauceChips = document.querySelectorAll('.sauce-chip');
const sauceSection = document.querySelector('.sauce-experience');

sauceChips.forEach(chip => {
    const color = chip.getAttribute('data-color');
    const shadow = chip.getAttribute('data-shadow');
    
    chip.style.setProperty('--chip-color', color);
    chip.style.setProperty('--chip-shadow', shadow);

    chip.addEventListener('mouseenter', () => {
        sauceChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        if(sauceSection) {
            sauceSection.style.boxShadow = `inset 0 0 250px ${shadow}`;
        }
    });
});

window.addEventListener('load', () => {
    const defaultActive = document.querySelector('.sauce-chip.active');
    if (defaultActive && sauceSection) {
        sauceSection.style.boxShadow = `inset 0 0 250px ${defaultActive.getAttribute('data-shadow')}`;
    }
});

// Glassmorphism Navbar Scroll transition
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// MODAL LOGIC
const modal = document.getElementById('orderModal');
const closeModalBtn = document.getElementById('closeModal');
const orderTriggers = document.querySelectorAll('.trigger-order');

orderTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });
});

const closeModal = () => {
    modal.classList.remove('active');
};

if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if(modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal();
});

// MENU EXPANSION LOGIC
const categoryCards = document.querySelectorAll('.category-trigger');
const menuWrapper = document.getElementById('menuDetailsWrapper');
const allPanels = document.querySelectorAll('.menu-panel');
const panelCloseBtns = document.querySelectorAll('.close-panel');

categoryCards.forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active state from all cards
        categoryCards.forEach(c => c.classList.remove('active'));
        
        // Complete reset context
        menuWrapper.style.display = 'block';
        allPanels.forEach(p => p.classList.remove('active'));
        
        // Add active to current card and reveal associated panel
        this.classList.add('active');
        const targetId = this.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
        
        if(targetPanel) {
            targetPanel.classList.add('active');
            
            // Smoothly scroll to the expanded menu area
            setTimeout(() => {
                const yOffset = -100; // Account for navbar
                const y = menuWrapper.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }, 100); // Give tiny delay for DOM render box model
        }
    });
});

// Close panel functionality
panelCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        allPanels.forEach(p => p.classList.remove('active'));
        categoryCards.forEach(c => c.classList.remove('active'));
        
        setTimeout(() => {
            menuWrapper.style.display = 'none';
        }, 300); // Match transiton time
    });
});

// Mobile Hamburger Menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinksContainer = document.getElementById('navLinks');
const navLinksArrayMobile = document.querySelectorAll('.nav-links a');

if(mobileMenuToggle && navLinksContainer) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if(navLinksContainer.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

// Close mobile menu when clicking a link
navLinksArrayMobile.forEach(link => {
    link.addEventListener('click', () => {
        if(navLinksContainer && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            if(icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    });
});
