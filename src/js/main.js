"use strict";
document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentIndex = index;
    }

    document.querySelector('.carousel-control.prev').addEventListener('click', function() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1;
        }
        showSlide(prevIndex);
    });

    document.querySelector('.carousel-control.next').addEventListener('click', function() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    });

    showSlide(0); 




    document.querySelectorAll('.navbar-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            const href = this.getAttribute('href');
            const targetId = href.substring(1); 
            if (targetId === 'Home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) { 
        navbar.classList.add('navbar-shrink');
    } else {
        navbar.classList.remove('navbar-shrink');
    }
});


const modalTriggers = document.querySelectorAll('.modal-trigger');
const closeButtons = document.querySelectorAll('.close-button');


function openModal(event) {
    const modalId = event.target.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}


function closeModal(modal) {
    modal.style.display = 'none';
}


modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
});


closeButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        const modal = event.target.parentElement.parentElement;
        closeModal(modal);
    });
});


window.addEventListener('click', function(event) {
    const modal = event.target.closest('.modal');
    if (modal) {
        closeModal(modal);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-link');
    
    function calculateOffsets() {
        let sectionOffsets = [];
        navLinks.forEach((link) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                sectionOffsets.push(targetElement.offsetTop - document.getElementById("mainNavbar").offsetHeight);
            }
        });
        return sectionOffsets;
    }

    let sectionOffsets = calculateOffsets();
    let initialWindowWidth = window.innerWidth; 

    function activateNavLink(index) {
        navLinks.forEach((link, idx) => {
            link.classList.remove('active');
        });
        if (index !== -1) {
            navLinks[index].classList.add('active');
        }
    }

    function getActiveSection(scrollY) {
        for (let i = 0; i < sectionOffsets.length; i++) {
            if (scrollY < sectionOffsets[i]) {
                return i - 1;
            }
        }
        return sectionOffsets.length - 1;
    }

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY + document.getElementById("mainNavbar").offsetHeight;
        const newActiveIndex = getActiveSection(scrollY);
        activateNavLink(newActiveIndex);
    });

    window.addEventListener('resize', function() {
        sectionOffsets = calculateOffsets();
        const scrollY = window.scrollY + document.getElementById("mainNavbar").offsetHeight;
        const newActiveIndex = getActiveSection(scrollY);
        activateNavLink(newActiveIndex);
    });

    activateNavLink(0);
});