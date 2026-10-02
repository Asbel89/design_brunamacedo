// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Header: borda mais marcada ao rolar
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 8 ? '0 6px 24px rgba(61,18,32,.10)' : 'none';
}, { passive: true });

// Envio para WhatsApp — TROCAR PELO NUMERO REAL
const WHATS_NUMBER = '5513999999999';

const form = document.getElementById('bookingForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fName').value.trim();
    const service = document.getElementById('fService').value;
    const date = document.getElementById('fDate').value;
    const period = document.getElementById('fPeriod').value;
    const extras = [...document.querySelectorAll('#chips input:checked')].map(i => i.value);
    if (!name || !service) { alert('Informe seu nome e escolha um serviço.'); return; }
    const parts = [
      `Olá, Bruna! Sou ${name}.`,
      `Quero agendar: ${service}.`,
      `Data preferida: ${date || 'a combinar'} — ${period}.`,
      extras.length ? `Acabamentos: ${extras.join(', ')}.` : null,
      'Vim pelo site.'
    ].filter(Boolean);
    window.open(`https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(parts.join('\n'))}`, '_blank');
  });
}

// Reveal discreto
const observer = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('visible'); observer.unobserve(en.target); }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-row, .price-col, .gallery figure, .quotes blockquote, .about-media, .hero-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
