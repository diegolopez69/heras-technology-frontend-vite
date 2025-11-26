import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(2, 12, 27, 0.95)';
                navLinks.style.padding = '24px';
                navLinks.style.borderBottom = '1px solid var(--border)';
                navLinks.style.backdropFilter = 'blur(10px)';
            }
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
            // Asegúrate de que tu template en EmailJS espere 'user_email'
            const templateParams = {
                user_email: contactForm.querySelector('input[type="email"]').value,
                to_name: 'Diego & Socio', // Opcional, depende de tu template
                message: 'Nuevo lead interesado en demo.' // Mensaje por defecto
            };

            // REEMPLAZA 'YOUR_SERVICE_ID' y 'YOUR_TEMPLATE_ID'
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function() {
                    alert('¡Gracias! Hemos recibido tu solicitud. Te contactaremos pronto.');
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
