/* ====== CHECK IF DEVICE IS DESKTOP ====== */
const isDesktop = window.innerWidth >= 768;

/* ====== TYPEWRITER EFFECT WITH BLINKING CURSOR (DESKTOP ONLY) ====== */
if (isDesktop) {
  const typewriterText = document.querySelector('.typewriter');
  let i = 0;
  const originalText = typewriterText.textContent;
  typewriterText.textContent = '';
  const cursor = document.createElement('span');
  cursor.classList.add('cursor');
  cursor.textContent = '|';
  typewriterText.appendChild(cursor);

  function typeWriter() {
    if(i < originalText.length){
      typewriterText.textContent = originalText.substring(0, i+1);
      typewriterText.appendChild(cursor);
      i++;
      setTimeout(typeWriter, 120); // slightly slower for smoother rendering
    } else {
      setInterval(() => {
        cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible';
      }, 500);
    }
  }
  window.addEventListener('load', typeWriter);
}

/* ====== SKILL BARS ANIMATION ====== */
const progressBars = document.querySelectorAll('.progress-bar');
const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const bar = entry.target;
        let width = 0;
        const target = parseInt(bar.getAttribute('data-value'), 10);
        const interval = setInterval(() => {
          if(width >= target){
            clearInterval(interval);
          } else {
            width++;
            bar.style.width = width + '%';
            bar.querySelector('span').textContent = width + '%';
          }
        }, 15); // slower for low-end devices
        observer.unobserve(bar);
      }
    });
  },
  { threshold: 0.5 }
);
progressBars.forEach(bar => skillObserver.observe(bar));

/* ====== PROFILE IMAGE GLOW & PULSATE ====== */
const profileImage = document.querySelector('.profile-image');
profileImage.addEventListener('mouseover', () => profileImage.classList.add('glow'));
profileImage.addEventListener('mouseout', () => profileImage.classList.remove('glow'));
profileImage.addEventListener('click', () => {
  profileImage.classList.add('glow');
  setTimeout(() => profileImage.classList.remove('glow'), 1500);
});

/* ====== SMOOTH SCROLL FOR NAV LINKS ====== */
const navLinks = document.querySelectorAll('.nav-links a, .sidebar a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    target.scrollIntoView({behavior:'smooth'});
    closeSidebar(); // Close sidebar if open
  });
});

/* ====== SIDEBAR FOR MOBILE ====== */
const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('open-sidebar');
const closeSidebarBtn = document.getElementById('close-sidebar');

function openSidebar(){ 
  sidebar.style.width = '250px'; 
  openSidebarBtn.classList.add('active');
}
function closeSidebar(){ 
  sidebar.style.width = '0'; 
  openSidebarBtn.classList.remove('active');
}

openSidebarBtn.addEventListener('click', () => {
  if(sidebar.style.width === '250px'){
    closeSidebar();
  } else {
    openSidebar();
  }
});
closeSidebarBtn.addEventListener('click', closeSidebar);

/* ====== SNOWING EFFECT (DESKTOP ONLY) ====== */
if (isDesktop) {
  const snowContainer = document.getElementById('snow-container');

  function createSnowflake(){
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '•'; // simple dot instead of ❄ for performance
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.fontSize = (6 + Math.random() * 12) + 'px'; // smaller for performance
    snowflake.style.opacity = (0.2 + Math.random() * 0.5).toFixed(2);
    snowflake.style.animationDuration = (8 + Math.random() * 5) + 's';
    snowflake.style.animationDelay = Math.random() * 3 + 's';
    snowflake.style.transform = `rotate(${Math.random()*360}deg)`;
    snowContainer.appendChild(snowflake);

    setTimeout(() => snowflake.remove(), 10000);
  }
  setInterval(createSnowflake, 250); // slightly slower for low-end devices
}

/* ====== DYNAMIC NEON COLORS WITH SMOOTH TRANSITION ====== */
let hue = 180;
function animateNeonColor(){
  hue = (hue + 1) % 360;
  document.body.style.color = `hsl(${hue}, 100%, 50%)`;
  document.querySelectorAll('.btn').forEach(btn => {
    btn.style.borderColor = `hsl(${(hue+60)%360},100%,50%)`;
    btn.style.color = `hsl(${(hue+60)%360},100%,50%)`;
  });
  requestAnimationFrame(animateNeonColor);
}
requestAnimationFrame(animateNeonColor);

/* ====== BACKGROUND GRADIENT ANIMATION ====== */
const mainSection = document.querySelector('.main-section');
let bgHue = 180;
function animateBackground(){
  bgHue = (bgHue + 0.2) % 360; // slower for low-end
  mainSection.style.background = `linear-gradient(120deg, hsl(${bgHue},100%,25%), hsl(${(bgHue+60)%360},100%,25%))`;
  requestAnimationFrame(animateBackground);
}
requestAnimationFrame(animateBackground);

/* ====== CARD HOVER NEON EFFECT ====== */
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = `0 0 40px #0ff, 0 0 60px #f0f, 0 0 80px #0ff inset`;
    card.style.transform = 'translateY(-8px)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = `0 0 30px #0ff, 0 0 50px #f0f`;
    card.style.transform = 'translateY(0)';
  });
});