import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';
import sitemap from '@astrojs/sitemap';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://anattanergui.github.io/barking',
  base: '/barking',

  integrations: [sitemap()],

  build: {
    outDir: 'dist',
  },

  vite: {
    server: {
      watch: {
        ignored: (f) => f.includes('node_modules') || f.includes('.git'),
      },
    },
    optimizeDeps: {
      exclude: ['gray-matter'],
    },
    resolve: {
      alias: {
        '@content': path.resolve(__dirname, 'src/content'),
      },
    },
  },
});
