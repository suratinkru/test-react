import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import viteJest from 'vite-plugin-jest';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
