// Translations
const translations = {
    es: {
        nav: {
            solutions: "Soluciones",
            technology: "Tecnología",
            demo: "Agendar Demo"
        },
        hero: {
            badge: "Tecnología de Vanguardia",
            title: "El Futuro de la",
            titleHighlight: "Atención al Cliente",
            subtitle: "Convierte conversaciones en ventas. Nuestra IA responde, califica y gestiona a tus clientes en WhatsApp y Redes Sociales con la precisión de un experto humano.",
            cta: "Empezar Ahora",
            learnMore: "Ver cómo funciona"
        },
        cards: {
            title: "Potencia tu Negocio",
            subtitle: "Una plataforma integral para escalar tus ventas sin aumentar personal.",
            card1Title: "Integración Total",
            card1Desc: "Centraliza WhatsApp, Instagram y Facebook. Olvida tener múltiples pestañas abiertas; gestiona todo desde un solo cerebro digital.",
            card2Title: "Memoria Corporativa (RAG)",
            card2Desc: "A diferencia de los chatbots básicos, nuestra IA estudia tus manuales y PDFs para responder con la misma precisión que tu mejor empleado.",
            card3Title: "Ventas Automáticas",
            card3Desc: "El sistema detecta quién quiere comprar y quién solo mira. Cierra ventas simples y agenda citas con los clientes de alto valor."
        },
        timeline: {
            title: "¿Por qué Heras Technology?",
            subtitle: "No somos solo un chatbot. Somos tu infraestructura de crecimiento.",
            item1Title: "Inteligencia Contextual",
            item1Desc: "Utilizamos tecnología RAG (Retrieval-Augmented Generation). Esto significa que la IA no \"inventa\" respuestas, sino que consulta tu base de conocimiento en tiempo real para dar información veraz y específica de tu negocio.",
            item2Title: "Ecosistema Meta Nativo",
            item2Desc: "Conexión directa con la API de WhatsApp Business. Sin intermediarios inestables, garantizando que tus mensajes siempre lleguen y tus números estén seguros.",
            item3Title: "Asistentes de Voz Híbridos",
            item3Desc: "Rompemos la barrera del texto. Nuestra tecnología permite que la misma IA que chatea, pueda atender llamadas telefónicas, ofreciendo una experiencia omnicanal verdadera."
        },
        cta: {
            title: "Lleva tu empresa al siguiente nivel",
            subtitle: "Cuéntanos qué necesitas y te contactaremos en menos de 24 horas.",
            emailPlaceholder: "Tu correo corporativo",
            selectPlaceholder: "¿Qué solución te interesa?",
            option1: "🎙️ Asistentes de Voz con IA",
            option2: "💬 Automatización de Soporte y Ventas (WhatsApp, IG, FB)",
            option3: "🎯 Lead Scoring Inteligente",
            option4: "✨ Solución Completa (Todo incluido)",
            button: "Solicitar Demo Gratuita"
        },
        footer: {
            location: "Sede en Guatemala",
            rights: "Todos los derechos reservados."
        }
    },
    en: {
        nav: {
            solutions: "Solutions",
            technology: "Technology",
            demo: "Schedule Demo"
        },
        hero: {
            badge: "Cutting-Edge Technology",
            title: "The Future of",
            titleHighlight: "Customer Service",
            subtitle: "Turn conversations into sales. Our AI responds, qualifies, and manages your customers on WhatsApp and Social Media with the precision of a human expert.",
            cta: "Get Started",
            learnMore: "See how it works"
        },
        cards: {
            title: "Power Your Business",
            subtitle: "An all-in-one platform to scale your sales without increasing headcount.",
            card1Title: "Total Integration",
            card1Desc: "Centralize WhatsApp, Instagram, and Facebook. Forget about multiple open tabs; manage everything from a single digital brain.",
            card2Title: "Corporate Memory (RAG)",
            card2Desc: "Unlike basic chatbots, our AI studies your manuals and PDFs to respond with the same precision as your best employee.",
            card3Title: "Automated Sales",
            card3Desc: "The system detects who wants to buy and who's just browsing. Close simple sales and schedule appointments with high-value customers."
        },
        timeline: {
            title: "Why Heras Technology?",
            subtitle: "We're not just a chatbot. We're your growth infrastructure.",
            item1Title: "Contextual Intelligence",
            item1Desc: "We use RAG (Retrieval-Augmented Generation) technology. This means the AI doesn't \"make up\" answers, but consults your knowledge base in real-time to provide truthful, business-specific information.",
            item2Title: "Native Meta Ecosystem",
            item2Desc: "Direct connection to WhatsApp Business API. No unstable intermediaries, ensuring your messages always arrive and your numbers stay secure.",
            item3Title: "Hybrid Voice Assistants",
            item3Desc: "We break the text barrier. Our technology allows the same AI that chats to handle phone calls, offering a true omnichannel experience."
        },
        cta: {
            title: "Take your company to the next level",
            subtitle: "Tell us what you need and we'll contact you within 24 hours.",
            emailPlaceholder: "Your corporate email",
            selectPlaceholder: "Which solution interests you?",
            option1: "🎙️ AI Voice Assistants",
            option2: "💬 Support & Sales Automation (WhatsApp, IG, FB)",
            option3: "🎯 Intelligent Lead Scoring",
            option4: "✨ Complete Solution (All-inclusive)",
            button: "Request Free Demo"
        },
        footer: {
            location: "Headquarters in Guatemala",
            rights: "All rights reserved."
        }
    }
};

// Current language
let currentLang = 'es';

// Function to update text content
function updateContent(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let value = t;
        keys.forEach(key => {
            value = value[key];
        });
        element.textContent = value;
    });

    // Update specific elements by ID or class
    document.querySelector('.badge-pill').innerHTML = `<span class="dot"></span> ${t.hero.badge}`;
    document.querySelector('.hero h1').innerHTML = `${t.hero.title} <br><span class="gradient-text">${t.hero.titleHighlight}</span>`;
    document.querySelector('.hero p').textContent = t.hero.subtitle;
    document.querySelector('.cta-group .btn-primary').textContent = t.hero.cta;
    document.querySelector('.btn-text').innerHTML = `${t.hero.learnMore} <i class="ph ph-arrow-right"></i>`;

    // Cards section
    document.querySelector('#how-it-works .section-header h2').textContent = t.cards.title;
    document.querySelector('#how-it-works .section-header p').textContent = t.cards.subtitle;
    
    const cards = document.querySelectorAll('.glow-card');
    if (cards[0]) {
        cards[0].querySelector('h3').textContent = t.cards.card1Title;
        cards[0].querySelector('p').textContent = t.cards.card1Desc;
    }
    if (cards[1]) {
        cards[1].querySelector('h3').textContent = t.cards.card2Title;
        cards[1].querySelector('p').textContent = t.cards.card2Desc;
    }
    if (cards[2]) {
        cards[2].querySelector('h3').textContent = t.cards.card3Title;
        cards[2].querySelector('p').textContent = t.cards.card3Desc;
    }

    // Timeline section
    document.querySelector('#why-us .section-header h2').textContent = t.timeline.title;
    document.querySelector('#why-us .section-header p').textContent = t.timeline.subtitle;
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems[0]) {
        timelineItems[0].querySelector('h3').textContent = t.timeline.item1Title;
        timelineItems[0].querySelector('p').textContent = t.timeline.item1Desc;
    }
    if (timelineItems[1]) {
        timelineItems[1].querySelector('h3').textContent = t.timeline.item2Title;
        timelineItems[1].querySelector('p').textContent = t.timeline.item2Desc;
    }
    if (timelineItems[2]) {
        timelineItems[2].querySelector('h3').textContent = t.timeline.item3Title;
        timelineItems[2].querySelector('p').textContent = t.timeline.item3Desc;
    }

    // CTA section
    document.querySelector('.cta h2').textContent = t.cta.title;
    document.querySelector('.cta p').textContent = t.cta.subtitle;
    document.querySelector('.contact-form input[name="user_email"]').placeholder = t.cta.emailPlaceholder;
    
    const select = document.querySelector('.contact-form select');
    select.options[0].textContent = t.cta.selectPlaceholder;
    select.options[1].textContent = t.cta.option1;
    select.options[2].textContent = t.cta.option2;
    select.options[3].textContent = t.cta.option3;
    select.options[4].textContent = t.cta.option4;
    
    document.querySelector('.contact-form button').textContent = t.cta.button;

    // Footer
    document.querySelector('.footer-info').innerHTML = `<span class="flag">🇬🇹</span> ${t.footer.location}`;
    document.querySelector('.copyright').textContent = `© 2025 Heras Technology. ${t.footer.rights}`;

    // Update lang switcher
    document.getElementById('currentLang').textContent = lang.toUpperCase();
    
    // Save preference
    localStorage.setItem('preferredLang', lang);
}

export { updateContent, currentLang, translations };
