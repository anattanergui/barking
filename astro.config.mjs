import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://anattanergui.github.io',
  base: '/barking',
  vite: {
    server: {
      watch: {
        paths: ['/Users/anattanergui/Desktop/VellumFull']
      }
    }
  },
});
