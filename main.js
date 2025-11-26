import './style.css'
import { updateContent } from './translations.js'

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language from localStorage or default to Spanish
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    updateContent(savedLang);

    // Language Switcher
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', () => {
            const currentLang = localStorage.getItem('preferredLang') || 'es';
            const newLang = currentLang === 'es' ? 'en' : 'es';
            updateContent(newLang);
        });
    }

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'ph ph-x';
            } else {
                icon.className = 'ph ph-list';
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.querySelector('i').className = 'ph ph-list';
            });
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature-card, .step, .value-content, .hero-content, .cta-box');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)';
        observer.observe(el);
    });

    // Contact Form Handling with EmailJS
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            // Parámetros para el template de EmailJS
            const templateParams = {
                user_email: contactForm.querySelector('input[name="user_email"]').value,
                service_interest: contactForm.querySelector('select[name="service_interest"]').value,
                to_name: 'Equipo Heras Technology',
                message: `Nuevo lead interesado en: ${contactForm.querySelector('select[name="service_interest"]').value}`
            };

            // EmailJS configuration
            emailjs.send('service_xqnl3nu', 'template_h40acnb', templateParams)
                .then(function() {
                    alert('¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto contigo en menos de 24 horas.');
                    contactForm.reset();
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, function(error) {
                    console.error('Error:', error);
                    alert('Hubo un error al enviar. Por favor intenta de nuevo o escríbenos por WhatsApp.');
                    btn.innerText = originalText;
                    btn.disabled = false;
                });
        });
    }
});
