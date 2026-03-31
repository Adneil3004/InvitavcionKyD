export function renderNavbar() {
  const headerHTML = `
    <header class="fixed top-0 z-[100] w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <!-- Logo / Nombres -->
        <a href="index.html" class="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <span class="material-symbols-outlined text-3xl font-light">favorite</span>
          <h2 class="text-slate-900 dark:text-slate-100 text-xl font-extrabold leading-tight tracking-tight">Daniel & Katia</h2>
        </a>

        <!-- Menú Desktop -->
        <nav class="hidden md:flex flex-1 justify-center gap-10">
          <a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" href="index.html">Inicio</a>
          <a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" href="historia.html">Nuestra Historia</a>
          <a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" href="evento-regalos.html">Evento y Regalos</a>
        </nav>

        <!-- Botón RSVP Desktop & Hamburguesa Mobile -->
        <div class="flex items-center gap-4">
          <a href="confirmar.html" class="hidden sm:inline-flex">
            <button class="bg-primary hover:bg-primary/90 text-white flex min-w-[100px] cursor-pointer items-center justify-center rounded-full h-10 px-6 text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
              RSVP
            </button>
          </a>
          
          <!-- Hamburger Button -->
          <button id="mobile-menu-open" class="md:hidden text-slate-800 dark:text-white p-1">
            <span class="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    <div id="mobile-drawer-overlay" class="fixed inset-0 z-[200] bg-slate-900/50 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300 md:hidden"></div>
    
    <!-- Mobile Drawer Menu -->
    <div id="mobile-drawer" class="fixed top-0 right-0 z-[201] h-full w-[280px] bg-white dark:bg-slate-900 shadow-2xl translate-x-full transition-transform duration-300 ease-in-out md:hidden flex flex-col p-8">
      <div class="flex justify-between items-center mb-12">
        <span class="text-primary font-bold">Menú</span>
        <button id="mobile-menu-close" class="text-slate-500 hover:text-primary">
          <span class="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>
      
      <nav class="flex flex-col gap-6">
        <a class="mobile-link text-xl font-bold text-slate-800 dark:text-white" href="index.html">Inicio</a>
        <a class="mobile-link text-xl font-bold text-slate-800 dark:text-white" href="historia.html">Nuestra Historia</a>
        <a class="mobile-link text-xl font-bold text-slate-800 dark:text-white" href="evento-regalos.html">Evento y Regalos</a>
        <div class="h-px bg-slate-100 dark:bg-slate-800 my-4"></div>
        <a class="mobile-link" href="confirmar.html">
          <button class="w-full bg-primary text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-primary/20">
            Confirmar RSVP
          </button>
        </a>
      </nav>
      
      <div class="mt-auto text-center grayscale opacity-50">
        <div class="flex justify-center gap-2 text-primary mb-2">
          <span class="material-symbols-outlined text-xs">favorite</span>
          <span class="material-symbols-outlined text-xs">favorite</span>
          <span class="material-symbols-outlined text-xs">favorite</span>
        </div>
        <p class="text-[10px] text-slate-400 uppercase tracking-widest">Daniel & Katia • 2024</p>
      </div>
    </div>

    <div class="h-[72px]"></div>
  `;

  const container = document.getElementById('navbar-root');
  if (container) {
    container.innerHTML = headerHTML;
    setupMobileMenu();
  }
}

function setupMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-open');
  const closeBtn = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('mobile-drawer-overlay');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.mobile-link');

  const openMenu = () => {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  };

  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  
  // Close menu when clicking any link
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}
