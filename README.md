# 🚀 Heras Technology - Landing Page

Landing page corporativa para **Heras Technology**, empresa especializada en soluciones de IA para atención al cliente, automatización de ventas y lead scoring.

## 🌐 Demo en Vivo

**URL:** [https://heras-web.vercel.app](https://heras-web.vercel.app)

## 📋 Descripción

Plataforma web diseñada para captar leads interesados en:
- 🎙️ **Asistentes de Voz con IA**
- 💬 **Automatización de Soporte y Ventas** (WhatsApp, Instagram, Facebook)
- 🎯 **Lead Scoring Inteligente**

## 🛠️ Stack Tecnológico

### Core
- **[Vite](https://vitejs.dev/)** `^6.0.7` - Build tool y dev server
- **Vanilla JavaScript** (ES6+)
- **HTML5** & **CSS3**

### Librerías y Servicios
- **[EmailJS](https://www.emailjs.com/)** `@emailjs/browser@3` - Envío de emails sin backend
- **[Phosphor Icons](https://phosphoricons.com/)** - Iconografía moderna
- **[Google Fonts](https://fonts.google.com/)** - Tipografía (Plus Jakarta Sans, Inter)

### Deployment & DevOps
- **[Vercel](https://vercel.com/)** - Hosting y CI/CD
- **Docker** - Containerización (Nginx Alpine)
- **GitHub** - Control de versiones

## 📦 Instalación

### Prerrequisitos
- Node.js >= 18.x
- npm >= 9.x

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/diegolopez69/heras-technology-frontend-vite.git
cd heras-technology-frontend-vite

# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

## 🔧 Configuración de EmailJS

Para que el formulario de contacto funcione, necesitas configurar EmailJS:

1. Crea una cuenta en [EmailJS.com](https://www.emailjs.com/)
2. Crea un **Email Service** (conecta tu Gmail)
3. Crea un **Email Template** con las siguientes variables:
   - `{{user_email}}` - Email del lead
   - `{{service_interest}}` - Servicio de interés
   - `{{to_name}}` - Destinatario
4. Obtén tus credenciales:
   - **Public Key** (en Account > API Keys)
   - **Service ID** (en Email Services)
   - **Template ID** (en Email Templates)
5. Reemplaza en el código:
   - `index.html` línea 22: `TU_PUBLIC_KEY`
   - `main.js` línea 90: `YOUR_SERVICE_ID` y `YOUR_TEMPLATE_ID`

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
# Build
docker build -t heras-technology .

# Run
docker run -p 80:80 heras-technology
```

## 📁 Estructura del Proyecto

```
heras-web/
├── index.html          # Página principal
├── style.css           # Estilos globales
├── main.js             # Lógica de interacción
├── Dockerfile          # Configuración Docker
├── .dockerignore       # Archivos excluidos del build
├── package.json        # Dependencias
└── README.md           # Este archivo
```

## 🎨 Diseño

- **Estética:** Cosmic Blue / Neon Tech
- **Tipografía:** Plus Jakarta Sans (headings), Inter (body)
- **Paleta de colores:**
  - Primary: `#3b82f6` (Blue)
  - Background: `#030712` (Deep Space)
  - Accent: `#60a5fa` (Glow Blue)

## 📞 Contacto

**Heras Technology**
- 📍 Sede: Guatemala
- 📱 WhatsApp: [+502 5517 4529](tel:+50255174529)
- 🌐 Web: [heras-web.vercel.app](https://heras-web.vercel.app)

## 📄 Licencia

© 2025 Heras Technology. Todos los derechos reservados.
