/**
 * scripts.js - Funcionalidades principales del portfolio
 * 
 * Este script maneja:
 * - Navegación móvil
 * - Scroll suave
 * - Animaciones al hacer scroll
 * - Botón "volver arriba"
 * - Filtrado de proyectos
 * - Actualización del año en el footer
 */

document.addEventListener('DOMContentLoaded', function() {
  // =============================================
  // VARIABLES GLOBALES
  // =============================================
  const header = document.getElementById('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-list');
  const backToTopBtn = document.getElementById('back-to-top');
  const projectFilterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const currentYear = new Date().getFullYear();
  
  // =============================================
  // FUNCIONALIDAD DEL MENÚ MÓVIL
  // =============================================
  function toggleMobileMenu() {
    navList.classList.toggle('active');
    mobileMenuBtn.setAttribute(
      'aria-expanded', 
      navList.classList.contains('active')
    );
    
    // Cambiar icono del botón
    const icon = mobileMenuBtn.querySelector('i');
    if (navList.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      icon.classList.replace('fa-times', 'fa-bars');
    }
  }
  
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });
  
  // =============================================
  // CAMBIO DE ESTILO DEL HEADER AL HACER SCROLL
  // =============================================
  function handleScroll() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Mostrar/ocultar botón "volver arriba"
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // =============================================
  // SCROLL SUAVE PARA ENLACES INTERNOS
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  // Versión optimizada (para botones con clase .back-to-top)
document.querySelectorAll('.back-to-top, #back-to-top, .scroll-to-top').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
  // =============================================
  // ANIMACIONES AL HACER SCROLL (Intersection Observer)
  // =============================================
  const animateElements = document.querySelectorAll('.animate');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
  
  // =============================================
  // FILTRADO DE PROYECTOS
  // =============================================
  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover clase active de todos los botones
      projectFilterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Añadir clase active al botón clickeado
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      // Filtrar proyectos
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // =============================================
  // ACTUALIZAR AÑO EN EL FOOTER
  // =============================================
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = currentYear;
  }
  
  // =============================================
  // INICIALIZACIONES
  // =============================================
  // Ejecutar handleScroll al cargar para ver estado inicial
  handleScroll();
  // En scripts.js
function initMusicPlayerPreview() {
  const musicProjectCard = document.querySelector('.project-card[data-category="fullstack"]');
  
  if (musicProjectCard) {
    const previewContainer = document.createElement('div');
    previewContainer.className = 'music-preview';
    previewContainer.innerHTML = `
      <audio controls class="sample-audio">
        <source src="assets/audio/sample-track.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <p class="sample-track-info">Sample track: "Cyber Dreams" - Poisoned Dog</p>
    `;
    
    musicProjectCard.querySelector('.project-info').prepend(previewContainer);
    
    // Estilos dinámicos
    const style = document.createElement('style');
    style.textContent = `
      .music-preview {
        margin: 1rem 0;
      }
      .sample-audio {
        width: 100%;
        margin-bottom: 0.5rem;
      }
      .sample-track-info {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.7);
        text-align: center;
      }
    `;
    document.head.appendChild(style);
  }
}

// Llamar la función al cargar
document.addEventListener('DOMContentLoaded', initMusicPlayerPreview);
});