export function renderNavbar() {
  const headerHTML = `
    <header class="fixed top-0 z-[100] w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <!-- Logo / Nombres -->
        <a href="index.html" class="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
          <span class="material-symbols-outlined text-3xl">favorite</span>
          <h2 class="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight">Daniel & Katia</h2>
        </a>

        <!-- Menú de enlaces -->
        <nav class="hidden md:flex flex-1 justify-center gap-10">
          <a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" href="index.html">Inicio</a>
          <a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" href="historia.html">Nuestra Historia</a>
          <a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-semibold transition-colors" href="evento-regalos.html">Evento y Regalos</a>
        </nav>

        <!-- Botón RSVP -->
        <div class="flex justify-end">
          <a href="confirmar.html" class="inline-flex">
            <button class="bg-primary hover:bg-primary/90 text-white flex min-w-[100px] cursor-pointer items-center justify-center rounded-full h-10 px-6 text-sm font-bold transition-all shadow-lg shadow-primary/20">
              RSVP
            </button>
          </a>
        </div>
      </div>
    </header>
    <!-- Spacer for content -->
    <div class="h-[72px]"></div>
  `;

  const container = document.getElementById('navbar-root');
  if (container) {
    container.innerHTML = headerHTML;
  }
}
