import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const cleanUrlsPlugin = () => ({
  name: 'clean-urls',
  configureServer(server: any) {
    server.middlewares.use((req: any, _res: any, next: any) => {
      const url = req.url ? req.url.split('?')[0] : '';
      if (url === '/apps' || url === '/apps/') {
        req.url = '/apps/index.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
      } else if (url === '/about' || url === '/about/') {
        req.url = '/about/index.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
      } else if (url === '/otisplay' || url === '/otisplay/') {
        req.url = '/otisplay/index.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
      }
      next();
    });
  },
  configurePreviewServer(server: any) {
    server.middlewares.use((req: any, _res: any, next: any) => {
      const url = req.url ? req.url.split('?')[0] : '';
      if (url === '/apps' || url === '/apps/') {
        req.url = '/apps/index.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
      } else if (url === '/about' || url === '/about/') {
        req.url = '/about/index.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
      } else if (url === '/otisplay' || url === '/otisplay/') {
        req.url = '/otisplay/index.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
      }
      next();
    });
  },
});

export default defineConfig(() => {
  return {
    // Relative base ensures assets load correctly on GitHub Pages subpaths (e.g. /repo-name/)
    // as well as custom domains and local previews.
    base: './',
    plugins: [react(), tailwindcss(), cleanUrlsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
