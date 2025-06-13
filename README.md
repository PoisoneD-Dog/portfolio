
# Portafolio Profesional - Alexis Palacio

## 🚀 Descripción
Este es un portafolio web diseñado para presentar mis habilidades como desarrollador Frontend especializado en Shopify, optimización de rendimiento y soluciones e-commerce.

El sitio presenta una navegación clara, animaciones ligeras y un formulario de contacto funcional que permite a los potenciales clientes contactarme directamente.

## 🛠 Tecnologías usadas
- HTML5 semántico
- CSS3 con variables personalizadas y diseño responsive
- JavaScript ES6 (con IntersectionObserver y mejoras de accesibilidad)
- Font Awesome (íconos)
- Google Fonts
- FormSubmit (para funcionalidad de formulario sin servidor)
- Git (control de versiones)

## ✅ Buenas prácticas aplicadas
- Uso de `DOMContentLoaded` para garantizar que el DOM esté completamente cargado antes de ejecutar scripts.
- Variables CSS centralizadas para una gestión eficiente de colores, sombras y tamaños.
- Diseño responsive con `clamp()` y media queries.
- Accesibilidad: atributos `aria-label`, outline en elementos enfocados y contraste ajustado.
- Optimización de rendimiento:
  - `preconnect` a fuentes e íconos.
  - `loading="lazy"` en todas las imágenes.
  - Código CSS y JS limpio y organizado.

## 🔎 Decisiones técnicas clave
- Se utilizó FormSubmit para gestionar el envío de correos desde el formulario sin necesidad de backend propio.
- Se implementaron animaciones solo cuando el elemento entra en viewport usando Intersection Observer, evitando impacto en el rendimiento por scroll listeners pesados.
- Mobile-first design para garantizar compatibilidad con pantallas pequeñas.

