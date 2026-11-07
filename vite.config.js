import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps the site working from any GitHub Pages path (user.github.io/repo/).
export default defineConfig({
  base: './',
  plugins: [react()],
  // changes on every build, so data files and caches never go stale
  define: { __BUILD_ID__: JSON.stringify(Date.now().toString(36)) },
  build: { target: 'es2020', chunkSizeWarningLimit: 2000 },
});
