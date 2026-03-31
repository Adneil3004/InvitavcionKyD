import './style.css';
import { renderNavbar } from './components/navbar.js';
import { initRouter } from './router.js';

// --- MÚSICA (PERSISTENTE) ---
let audioInstance = null;
const musicPath = 'sound/Sunlight_on_the_Aisle.mp3';

const setupMusic = () => {
  if (audioInstance) return; // Ya inicializado
  
  audioInstance = new Audio(musicPath);
  audioInstance.loop = true;
  
  // Crear botón flotante (TOP-RIGHT para más visibilidad)
  const musicBtn = document.createElement('button');
  musicBtn.id = 'music-control';
  musicBtn.className = 'fixed top-4 right-20 md:right-32 z-[100] bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-primary/20 text-primary hover:scale-110 transition-all duration-300 group ring-4 ring-primary/5';
  musicBtn.innerHTML = `
    <div class="relative flex items-center justify-center">
      <!-- Icono de play con pulso si está pausado -->
      <span class="material-symbols-outlined text-xl transition-all duration-300" id="music-icon">music_note</span>
      
      <!-- Ondas animadas si está sonando -->
      <div id="music-waves" class="absolute inset-0 flex items-center justify-center gap-0.5 opacity-0 transition-opacity">
        <span class="w-1 h-3 bg-primary animate-bounce"></span>
        <span class="w-1 h-5 bg-primary animate-bounce" style="animation-delay: 0.2s"></span>
        <span class="w-1 h-2 bg-primary animate-bounce" style="animation-delay: 0.4s"></span>
      </div>
    </div>
  `;
  
  document.body.appendChild(musicBtn);
  
  let isPlaying = false;
  
  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      audioInstance.pause();
      document.getElementById('music-icon').classList.remove('opacity-0', 'scale-0');
      document.getElementById('music-waves').classList.add('opacity-0');
      musicBtn.classList.add('animate-pulse');
    } else {
      audioInstance.play().catch(err => console.log("Interacción requerida"));
      document.getElementById('music-icon').classList.add('opacity-0', 'scale-0');
      document.getElementById('music-waves').classList.remove('opacity-0');
      musicBtn.classList.remove('animate-pulse');
    }
    isPlaying = !isPlaying;
  });

  // Animación inicial para llamar la atención
  musicBtn.classList.add('animate-pulse');
};

// --- LÓGICA DE PÁGINA (SE EJECUTA EN CADA NAVEGACIÓN) ---
const initPageLogic = () => {
  renderNavbar();
  setupIntersectionObserver();
  setupRSVP();
  setupCountdown();
};

// Animación de aparición de elementos con scroll
const setupIntersectionObserver = () => {
  const elements = document.querySelectorAll('section, h2, h3, p, .group');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
    observer.observe(el);
  });
};

// Contador Regresivo - Fecha: 30 de Abril, 2026
const setupCountdown = () => {
  const targetDate = new Date('April 30, 2026 00:00:00').getTime();
  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) return;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const dEl = document.getElementById('countdown-days');
    const hEl = document.getElementById('countdown-hours');
    const mEl = document.getElementById('countdown-minutes');
    const sEl = document.getElementById('countdown-seconds');
    
    if (dEl) dEl.innerText = days.toString().padStart(2, '0');
    if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
    if (mEl) mEl.innerText = minutes.toString().padStart(2, '0');
    if (sEl) sEl.innerText = seconds.toString().padStart(2, '0');
  };
  setInterval(updateTimer, 1000);
  updateTimer();
};

const setupRSVP = () => {
  const allBtns = document.querySelectorAll('button:not([type="submit"]):not(.bg-primary.h-10):not(#music-control)');
  allBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.closest('a')) return;
      e.preventDefault();
      // Usar la navegación del router si es posible
      const link = document.createElement('a');
      link.href = 'confirmar.html';
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  });
};

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar música solo una vez al cargar el sitio por primera vez
  setupMusic();
  // Inicializar el router para que empiece a interceptar navegaciones
  initRouter(() => {
    // Al cambiar la página, re-ejecutamos solo la lógica de la vista
    initPageLogic();
  });
  // Ejecutar lógica inicial
  initPageLogic();
});
