document.addEventListener("DOMContentLoaded", function() {
  const backToTopButton = document.querySelector('#back-to-top');

  window.addEventListener("scroll", function() {
    if (window.scrollY > 100) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll suave al hacer clic
  document.querySelector('.scroll-to-top').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.querySelector('#back-to-top').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Animaciones al hacer scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.animate').forEach(el => {
    observer.observe(el);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.animate').forEach(el => {
      observer.observe(el);
    });
  });
  
});
