import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    server: {
      watch: {
        paths: ['/Users/anattanergui/Desktop/VellumFull']
      }
    }
  },
  // Your poems live here — change this path if you move the vault
  // During development this reads directly from your Obsidian vault
  site: 'https://your-site.netlify.app', // update this after deploy
});
