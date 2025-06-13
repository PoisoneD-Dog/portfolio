$(function () {
  const $header = $("#header");
  const $backToTopBtn = $("#back-to-top");
  const $projectFilterBtns = $(".filter-btn");
  const $projectCards = $(".project-card");
  const $yearElement = $("#year");
  const $cvLink = $("#cv-link");
  const $htmlTag = $("html");

  const $themeToggle = $("#theme-toggle");
  const $cbToggle = $("#cb-toggle");

  const savedTheme = localStorage.getItem("theme") || "dark";
  $htmlTag.attr("data-theme", savedTheme);
  const savedCB = localStorage.getItem("colorblind") === "true";
  if (savedCB) {
    $htmlTag.attr("data-colorblind", "true");
  }

  function handleScroll() {
    $header.toggleClass("scrolled", $(window).scrollTop() > 100);
    $backToTopBtn.toggleClass("show", $(window).scrollTop() > 300);
  }

  $(window).on("scroll", handleScroll);
  handleScroll();

  $('a[href^="#"]').on("click", function (e) {
    const targetId = $(this).attr("href");
    if (targetId !== "#") {
      e.preventDefault();
      const $target = $(targetId);
      if ($target.length) {
        const headerHeight = $header.outerHeight();
        $("html, body").animate(
          { scrollTop: $target.offset().top - headerHeight },
          500
        );
      }
    }
  });

  $(".back-to-top, #back-to-top, .scroll-to-top").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $(entry.target).addClass("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  $(".animate").each(function () {
    observer.observe(this);
  });

  $projectFilterBtns.on("click", function () {
    $projectFilterBtns.removeClass("active");
    const $btn = $(this).addClass("active");
    const filterValue = $btn.data("filter");
    $projectCards.each(function () {
      const show =
        filterValue === "all" || $(this).data("category") === filterValue;
      $(this).toggle(show);
    });
  });

  if ($yearElement.length) {
    $yearElement.text(new Date().getFullYear());
  }

  const $musicProjectCard = $('.project-card[data-category="fullstack"]');
  if ($musicProjectCard.length) {
    const preview = $(
      '<div class="music-preview">\n' +
        '  <audio controls class="sample-audio">\n' +
        '    <source src="assets/audio/sample-track.mp3" type="audio/mpeg">\n' +
        "    Your browser does not support the audio element.\n" +
        "  </audio>\n" +
        '  <p class="sample-track-info">Sample track: "Cyber Dreams" - Poisoned Dog</p>\n' +
        "</div>"
    );
    $musicProjectCard.find(".project-info").prepend(preview);
  }

  let idiomaIngles = true;
  const textos = {
    en: {
      h1: "Hi, I'm <span class='highlight'>Alexis Palacio</span>",
      pHero: "Frontend Developer | HTML, CSS, JavaScript & Shopify",
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
      footerText: "Frontend Developer | HTML, CSS, JavaScript & Shopify",
      cv: "assets/cv/CV-AlexisPalacio-EN.pdf",
    },
    es: {
      h1: "Hola, soy <span class='highlight'>Alexis Palacio</span>",
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
      contactSubtitle: "Estoy listo para colaborar en tu próximo proyecto.",
      footerText: "Desarrollador Frontend | HTML, CSS, JavaScript & Shopify",
      cv: "assets/cv/CV-AlexisPalacio-ES.pdf",
    },
  };

  function traducirSitio() {
    const lang = idiomaIngles ? "es" : "en";
    const t = textos[lang];
    $("h1").html(t.h1);
    $(".hero-content p").text(t.pHero);
    $(".btn-primary").text(t.btn1);
    $(".btn-secondary").text(t.btn2);
    $("#about .section-title").text(t.aboutTitle);
    $("#about .section-subtitle").text(t.aboutSubtitle);
    $("#skills .section-title").text(t.skillsTitle);
    $("#skills .section-subtitle").text(t.skillsSubtitle);
    $("#projects .section-title").text(t.projectsTitle);
    $("#projects .section-subtitle").text(t.projectsSubtitle);
    $("#contact .section-title").text(t.contactTitle);
    $("#contact .section-subtitle").text(t.contactSubtitle);
    $(".footer-about p").text(t.footerText);
    $cvLink.attr("href", t.cv);

    const keys = {
      en: {
        frontend_specialist: "Frontend Specialist",
        about_description:
          "I’m a frontend developer with skills in HTML, CSS, JavaScript, and responsive web design. I’m currently broadening my expertise by exploring Shopify and other tools to create modern and functional web experiences.",
        specialties_title: "Specialties:",
        specialties_list: "Shopify Themes, JavaScript, Responsive Design",
        email_title: "Email:",
        download_cv: "Download CV",
      },
      es: {
        frontend_specialist: "Especialista Frontend",
        about_description:
          "Soy un desarrollador frontend con conocimientos en HTML, CSS, JavaScript y diseño web responsivo. Actualmente amplío mis habilidades explorando Shopify y otras herramientas para crear experiencias web modernas y funcionales.",
        specialties_title: "Especialidades:",
        specialties_list: "Temas de Shopify, JavaScript, Diseño Responsive",
        email_title: "Correo:",
        download_cv: "Descargar CV",
      },
    };

    $("[data-key]").each(function () {
      const key = $(this).data("key");
      if (keys[lang][key]) {
        $(this).text(keys[lang][key]);
      }
    });

    idiomaIngles = !idiomaIngles;
    $htmlTag.attr("lang", idiomaIngles ? "en" : "es");
  }

  const $btnTraducir = $("<button>", { id: "btn-idioma", text: "ES" })
    .css({
      position: "fixed",
      bottom: "15px",
      left: "15px",
      backgroundColor: "#1a1a1a",
      color: "#fff",
      border: "1px solid #00aaff",
      borderRadius: "20px",
      padding: "5px 10px",
      fontSize: "0.8rem",
      zIndex: 9999,
      cursor: "pointer",
    })
    .on("click", function () {
      traducirSitio();
      $(this).text(idiomaIngles ? "ES" : "EN");
    });

  $("body").append($btnTraducir);

  $themeToggle.on("click", () => {
    const newTheme = $htmlTag.attr("data-theme") === "light" ? "dark" : "light";
    $htmlTag.attr("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });

  $cbToggle.on("click", () => {
    const isCB = $htmlTag.attr("data-colorblind") === "true";
    if (isCB) {
      $htmlTag.removeAttr("data-colorblind");
    } else {
      $htmlTag.attr("data-colorblind", "true");
    }
    localStorage.setItem("colorblind", !isCB);
  });

  function updateCVLink() {
    const isSpanish = $htmlTag.attr("lang") === "es";
    $cvLink.attr(
      "href",
      isSpanish
        ? "/portfolio/assets/cv/CV-AlexisPalacio-ES.pdf"
        : "/portfolio/assets/cv/CV-AlexisPalacio-EN.pdf"
    );
  }

  updateCVLink();
});
