import { fileURLToPath, URL } from 'node:url'; // 👈 ADD THIS LINE
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/mos-blog/', 
  resolve: {
    alias: {
      
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});