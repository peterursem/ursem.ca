require('./index.css');

function load(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', resolve);
    image.addEventListener('error', reject);
    image.src = src;
  });
}

document.addEventListener("DOMContentLoaded", () => {

  const work = document.getElementById('work');
  const steps = document.querySelectorAll('.work-step');
  const bg = document.getElementById('work-bg');
  const title = document.getElementById('work-title');
  const date = document.getElementById('work-date');
  const text = document.getElementById('work-text');
  const ctaButton = document.getElementById('work-cta');

  const options = {
    root: document.getElementById('scrollbar'),
    rootMargin: '-45%'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        const dTitle = entry.target.getAttribute('data-title');
        const dDate = entry.target.getAttribute('data-date');
        const dText = entry.target.getAttribute('data-text');
        const dBg = entry.target.getAttribute('data-bg');
        const dCTA = entry.target.getAttribute('data-cta');

        if (dBg) {
          load(dBg).then(() => {
            if (entry.isIntersecting) {
              bg.style.backgroundImage = `url('${dBg}')`;
            }
          });
        }
        if (dTitle) title.textContent = dTitle;
        if (dDate) date.textContent = dDate;
        if (dText) text.textContent = dText;
        if (dCTA) {
          ctaButton.href = dCTA;
        } else {
          ctaButton.style = "display: hidden;";
        }

        steps.forEach(s => s.classList.remove('active'));
        entry.target.classList.add('active');
      }
    });
  }, options);

  steps.forEach(step => observer.observe(step));
});