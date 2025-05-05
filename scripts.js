document.addEventListener("DOMContentLoaded", function () {
  // ============================
  // VARIABLES
  // ============================
  const header = document.getElementById("header");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navList = document.querySelector(".nav-list");
  const backToTopBtn = document.getElementById("back-to-top");
  const projectFilterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const yearElement = document.getElementById("year");
  const cvLink = document.getElementById("cv-link");
  const htmlTag = document.documentElement;

  // ============================
  // MENÚ MÓVIL
  // ============================
  function toggleMobileMenu() {
    navList.classList.toggle("active");
    mobileMenuBtn.setAttribute(
      "aria-expanded",
      navList.classList.contains("active")
    );

    const icon = mobileMenuBtn.querySelector("i");
    if (navList.classList.contains("active")) {
      icon.classList.replace("fa-bars", "fa-times");
    } else {
      icon.classList.replace("fa-times", "fa-bars");
    }
  }

  mobileMenuBtn.addEventListener("click", toggleMobileMenu);

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navList.classList.contains("active")) {
        toggleMobileMenu();
      }
    });
  });

  // ============================
  // SCROLL HEADER Y BACK TO TOP
  // ============================
  function handleScroll() {
    header.classList.toggle("scrolled", window.scrollY > 100);
    backToTopBtn.classList.toggle("show", window.scrollY > 300);
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Inicial

  // ============================
  // SCROLL SUAVE
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }
    });
  });

  // ============================
  // BOTÓN VOLVER ARRIBA
  // ============================
  document
    .querySelectorAll(".back-to-top, #back-to-top, .scroll-to-top")
    .forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

  // ============================
  // ANIMACIONES CON INTERSECTION OBSERVER
  // ============================
  const animateElements = document.querySelectorAll(".animate");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  animateElements.forEach((el) => observer.observe(el));

  // ============================
  // FILTRADO DE PROYECTOS
  // ============================
  projectFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");
      projectCards.forEach((card) => {
        const show =
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue;
        card.style.display = show ? "block" : "none";
      });
    });
  });

  // ============================
  // AÑO FOOTER
  // ============================
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ============================
  // MUSIC PLAYER (solo si hay proyecto fullstack)
  // ============================
  const musicProjectCard = document.querySelector(
    '.project-card[data-category="fullstack"]'
  );

  if (musicProjectCard) {
    const previewContainer = document.createElement("div");
    previewContainer.className = "music-preview";
    previewContainer.innerHTML = `
      <audio controls class="sample-audio">
        <source src="assets/audio/sample-track.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <p class="sample-track-info">Sample track: "Cyber Dreams" - Poisoned Dog</p>
    `;
    musicProjectCard
      .querySelector(".project-info")
      .prepend(previewContainer);
  }

  // ============================
  // CAMBIO DE IDIOMA
  // ============================
  let idiomaIngles = true;

  const textos = {
    en: {
      h1: `Hi, I'm <span class='highlight'>Alexis Palacio</span>`,
      pHero: "Frontend Developer | Shopify Expert",
      btn1: "Hire Me",
      btn2: "View Work",
      aboutTitle: "About Me",
      aboutSubtitle: "Get to know me better",
      skillsTitle: "My Skills",
      skillsSubtitle: "Technologies I work with",
      projectsTitle: "My Projects",
      projectsSubtitle: "E-commerce & Frontend Work",
      contactTitle: "Get In Touch",
      contactSubtitle: "I'm ready to contribute to your next project",
      footerText:
        "Frontend Developer | HTML, CSS, JavaScript & Shopify",
      cv: "assets/cv/CV-AlexisPalacio-EN.pdf"
    },
    es: {
      h1: `Hola, soy <span class='highlight'>Alexis Palacio</span>`,
      pHero: "Desarrollador Frontend | HTML, CSS, JavaScript y Shopify",
      btn1: "Contrátame",
      btn2: "Ver Trabajo",
      aboutTitle: "Sobre mí",
      aboutSubtitle: "Conóceme mejor",
      skillsTitle: "Mis habilidades",
      skillsSubtitle: "Tecnologías con las que trabajo",
      projectsTitle: "Mis proyectos",
      projectsSubtitle: "E-commerce y trabajos Frontend",
      contactTitle: "Contáctame",
      contactSubtitle:
        "Estoy listo para colaborar en tu próximo proyecto.",
      footerText:
        "Desarrollador Frontend | HTML, CSS, JavaScript & Shopify",
      cv: "assets/cv/CV-AlexisPalacio-ES.pdf"
    }
  };

  function traducirSitio() {
  const lang = idiomaIngles ? "es" : "en";
  const t = textos[lang];

  document.querySelector("h1").innerHTML = t.h1;
  document.querySelector(".hero-content p").innerText = t.pHero;
  document.querySelector(".btn-primary").innerText = t.btn1;
  document.querySelector(".btn-secondary").innerText = t.btn2;
  document.querySelector("#about .section-title").innerText = t.aboutTitle;
  document.querySelector("#about .section-subtitle").innerText = t.aboutSubtitle;
  document.querySelector("#skills .section-title").innerText = t.skillsTitle;
  document.querySelector("#skills .section-subtitle").innerText = t.skillsSubtitle;
  document.querySelector("#projects .section-title").innerText = t.projectsTitle;
  document.querySelector("#projects .section-subtitle").innerText = t.projectsSubtitle;
  document.querySelector("#contact .section-title").innerText = t.contactTitle;
  document.querySelector("#contact .section-subtitle").innerText = t.contactSubtitle;
  document.querySelector(".footer-about p").innerText = t.footerText;
  cvLink.href = t.cv;

  // Traducción dinámica de los elementos con data-key
  const keys = {
    en: {
      frontend_specialist: "Frontend Specialist",
      about_description: "I'm a passionate Frontend Developer with expertise in Shopify. I also have experience with BuilderAll for marketing funnels. I create high-converting, responsive websites with pixel-perfect UI/UX.",
      specialties_title: "Specialties:",
      specialties_list: "Shopify Themes, JavaScript, Responsive Design",
      email_title: "Email:",
      download_cv: "Download CV"
    },
    es: {
      frontend_specialist: "Especialista Frontend",
      about_description: "Soy un desarrollador frontend apasionado con experiencia en Shopify. También tengo experiencia con BuilderAll para embudos de marketing. Creo sitios web receptivos y de alta conversión con UI/UX de píxeles perfectos.",
      specialties_title: "Especialidades:",
      specialties_list: "Temas de Shopify, JavaScript, Diseño Responsive",
      email_title: "Correo:",
      download_cv: "Descargar CV"
    }
  };

  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (keys[lang][key]) {
      el.innerText = keys[lang][key];
    }
  });

  idiomaIngles = !idiomaIngles;
  htmlTag.lang = idiomaIngles ? "en" : "es";
}

  // ============================
  // BOTÓN CAMBIO DE IDIOMA
  // ============================
  const btnTraducir = document.createElement("button");
  btnTraducir.id = "btn-idioma";
  btnTraducir.innerText = "ES";
  btnTraducir.style.position = "fixed";
  btnTraducir.style.bottom = "15px";
  btnTraducir.style.left = "15px";
  btnTraducir.style.backgroundColor = "#1a1a1a";
  btnTraducir.style.color = "#fff";
  btnTraducir.style.border = "1px solid #00aaff";
  btnTraducir.style.borderRadius = "20px";
  btnTraducir.style.padding = "5px 10px";
  btnTraducir.style.fontSize = "0.8rem";
  btnTraducir.style.zIndex = "9999";
  btnTraducir.style.cursor = "pointer";

  btnTraducir.addEventListener("click", () => {
    traducirSitio();
    btnTraducir.innerText = idiomaIngles ? "ES" : "EN";
  });

  document.body.appendChild(btnTraducir);
});
