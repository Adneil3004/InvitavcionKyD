import { defineConfig } from 'vite';

export default defineConfig({
  base: '/InvitavcionKyD/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        historia: 'historia.html',
        confirmar: 'confirmar.html',
        evento: 'evento-regalos.html',
      },
    },
  },
});
