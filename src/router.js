/**
 * Simple Client-side Router for Seamless Page Transitions
 */

export const initRouter = (onPageChange) => {
  const navigate = async (url) => {
    // Si la URL es la misma, no hacer nada
    if (url === window.location.href) return;

    // Iniciar transición suave (View Transitions API si está disponible)
    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        await swapContent(url, onPageChange);
      });
    } else {
      await swapContent(url, onPageChange);
    }
  };

  const swapContent = async (url, callback) => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Reemplazar solo el contenido de <main>
      const newMain = doc.querySelector('main');
      const currentMain = document.querySelector('main');
      
      if (newMain && currentMain) {
        currentMain.replaceWith(newMain);
        // Actualizar el título de la página
        document.title = doc.title;
        // Navegar en el historial
        window.history.pushState({}, '', url);
        // Notificar cambio de página para re-inicializar scripts (OS, observers, etc)
        if (callback) callback();
        // Volver al inicio de la página
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Error cargando la página:', error);
      window.location.href = url; // Fallback a navegación normal
    }
  };

  // Interceptar clics en enlaces
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && link.origin === window.location.origin) {
      // Ignorar anclas internas (#)
      if (link.hash && link.pathname === window.location.pathname) return;
      
      e.preventDefault();
      navigate(link.href);
    }
  });

  // Manejar botón Atrás/Adelante
  window.addEventListener('popstate', () => {
    swapContent(window.location.href, onPageChange);
  });
};
