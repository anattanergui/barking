import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://anattanergui.github.io',
  base: '/barking',

  build: {
    outDir: 'dist',
  },

  vite: {
    server: {
      watch: {
        // Watch the poems content dir so the dev server reloads when
        // markdown files are added or edited.
        // Add usePolling: true here if native fs events don't fire
        // across a symlinked vault directory on macOS.
        ignored: (f) => f.includes('node_modules') || f.includes('.git'),
      },
    },
    optimizeDeps: {
      // Prevents Vite from warning about gray-matter being a CJS
      // package used in an SSR (Node) context.
      exclude: ['gray-matter'],
    },
    resolve: {
      alias: {
        '@content': path.resolve(__dirname, 'src/content'),
      },
    },
  },
});
