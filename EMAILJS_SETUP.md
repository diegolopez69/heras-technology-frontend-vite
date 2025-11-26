# 📧 Guía de Configuración EmailJS

## Objetivo
Configurar EmailJS para que cuando un lead complete el formulario de contacto, te llegue un email automático con:
- Email del lead
- Servicio de interés seleccionado

---

## 📋 Paso a Paso

### 1. Crear Cuenta en EmailJS

1. Ve a [EmailJS.com](https://www.emailjs.com/)
2. Haz clic en **"Sign Up"**
3. Regístrate con tu email (o usa Google/GitHub)
4. Confirma tu email

---

### 2. Conectar tu Gmail

1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona **"Gmail"**
4. Haz clic en **"Connect Account"**
5. Autoriza con tu cuenta de Gmail (la que quieres que reciba los emails)
6. Copia el **Service ID** (ej: `service_abc123`) - lo necesitarás después

---

### 3. Crear Email Template

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura el template así:

**Subject (Asunto):**
```
🚀 Nuevo Lead - {{service_interest}}
```

**Content (Cuerpo del email):**
```
Hola {{to_name}},

Has recibido una nueva solicitud de demo desde la landing page de Heras Technology.

📧 Email del lead: {{user_email}}
🎯 Servicio de interés: {{service_interest}}

---
Mensaje automático generado por Heras Technology
```

4. En **"To Email"**, pon tu correo (ej: `diego@gmail.com`)
   - Si quieres que le llegue también a tu socio, agrega su email separado por coma: `diego@gmail.com, socio@gmail.com`
5. Guarda el template
6. Copia el **Template ID** (ej: `template_xyz789`)

---

### 4. Obtener Public Key

1. Ve a **"Account"** > **"General"**
2. Busca **"API Keys"**
3. Copia tu **Public Key** (ej: `abc123XYZ`)

---

### 5. Actualizar el Código

Ahora necesitas reemplazar 3 valores en tu código:

#### En `index.html` (línea 22):
```javascript
emailjs.init("TU_PUBLIC_KEY"); 
```
Reemplaza `TU_PUBLIC_KEY` con tu Public Key real.

#### En `main.js` (línea 90):
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```
Reemplaza:
- `YOUR_SERVICE_ID` con tu Service ID
- `YOUR_TEMPLATE_ID` con tu Template ID

**Ejemplo:**
```javascript
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

---

### 6. Probar

1. Guarda los cambios
2. Sube a Vercel:
   ```bash
   git add .
   git commit -m "Configure EmailJS"
   git push
   vercel --prod
   ```
3. Ve a tu página: https://heras-web.vercel.app
4. Llena el formulario con tu email de prueba
5. Revisa tu bandeja de entrada (y spam por si acaso)

---

## ✅ Checklist Final

- [ ] Cuenta EmailJS creada
- [ ] Gmail conectado
- [ ] Template creado con variables `{{user_email}}` y `{{service_interest}}`
- [ ] Public Key copiado
- [ ] Service ID copiado
- [ ] Template ID copiado
- [ ] Código actualizado en `index.html` y `main.js`
- [ ] Cambios subidos a GitHub y Vercel
- [ ] Formulario probado

---

## 🆘 Troubleshooting

**"Error: The public key is invalid"**
- Verifica que copiaste bien el Public Key (sin espacios)

**"Error: Template not found"**
- Verifica que el Template ID sea correcto
- Asegúrate de que el template esté guardado (no en draft)

**"No me llega el email"**
- Revisa la carpeta de spam
- Verifica que pusiste bien tu email en el template
- Revisa el dashboard de EmailJS > "Email Logs" para ver si se envió

---

## 📊 Límites del Plan Gratuito

- **200 emails/mes** - Más que suficiente para empezar
- Si superas el límite, EmailJS te avisa antes de cobrar

---

¿Necesitas ayuda? Avísame y te guío en tiempo real.
