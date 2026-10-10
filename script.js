document.addEventListener('DOMContentLoaded', function () {
  var icons = [
    { el: document.getElementById('orbitIcon1'), angle: 0 },
    { el: document.getElementById('orbitIcon2'), angle: 120 },
    { el: document.getElementById('orbitIcon3'), angle: 240 }
  ];

  var ring = document.querySelector('.orbit-ring');
  var radius = 150;

  function updateRadius() {
    if (ring && ring.offsetWidth) radius = ring.offsetWidth / 2;
  }
  updateRadius();
  window.addEventListener('resize', updateRadius);
  var speedDegPerSec = 18;
  var lastTime = null;

  function frame(time) {
    if (lastTime === null) {
      lastTime = time;
    }
    var deltaSec = (time - lastTime) / 1000;
    lastTime = time;

    icons.forEach(function (item) {
      if (!item.el) return;

      item.angle += speedDegPerSec * deltaSec;
      if (item.angle >= 360) item.angle -= 360;

      var rad = (item.angle * Math.PI) / 180;
      var x = Math.cos(rad) * radius;
      var y = Math.sin(rad) * radius;

      item.el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);

  var themeToggle = document.getElementById('themeToggle');
  var savedTheme = localStorage.getItem('hg-theme');

  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', function () {
    var isLight = document.body.classList.toggle('light-mode');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('hg-theme', isLight ? 'light' : 'dark');
  });

  var skillFills = document.querySelectorAll('.skill-bar-fill');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var targetWidth = el.getAttribute('data-width') || 0;

        setTimeout(function () {
          el.style.width = targetWidth + '%';
        }, index * 120);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach(function (el) {
    observer.observe(el);
  });

  var contactSubmit = document.getElementById('contactSubmit');
  var contactName = document.getElementById('contactName');
  var contactEmail = document.getElementById('contactEmail');
  var contactMessage = document.getElementById('contactMessage');

  if (contactSubmit) {
    contactSubmit.addEventListener('click', function () {
      var name = contactName.value.trim();
      var email = contactEmail.value.trim();
      var message = contactMessage.value.trim();

      if (!name || !email || !message) {
        alert('Preenche nome, e-mail e mensagem antes de enviar.');
        return;
      }

      var subject = encodeURIComponent('Contato pelo portfolio - ' + name);
      var body = encodeURIComponent(message + '\n\n' + name + '\n' + email);

      window.location.href = 'mailto:hugo.gomes@email.com?subject=' + subject + '&body=' + body;
    });
  }

  var navbar = document.querySelector('.navbar');
  var menuToggle = document.getElementById('menuToggle');

  function setMenu(open) {
    navbar.classList.toggle('menu-open', open);
    menuToggle.textContent = open ? '✕' : '☰';
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      setMenu(!navbar.classList.contains('menu-open'));
    });

    document.querySelectorAll('.nav-links .nav-link').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) setMenu(false);
    });
  }

  var typedText = document.getElementById('typedText');

  if (typedText) {
    var fullText = 'hugo@dev ~ whoami';
    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
      var charIndex = 0;
      var deleting = false;
      typedText.textContent = '';

      function typeLoop() {
        if (!deleting) {
          charIndex++;
          typedText.textContent = fullText.slice(0, charIndex);
          if (charIndex === fullText.length) {
            deleting = true;
            setTimeout(typeLoop, 2500);
            return;
          }
          setTimeout(typeLoop, 110);
        } else {
          charIndex--;
          typedText.textContent = fullText.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            setTimeout(typeLoop, 600);
            return;
          }
          setTimeout(typeLoop, 55);
        }
      }

      setTimeout(typeLoop, 400);
    }
  }
});