// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://adityasoni2003.github.io',
  output: 'static',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});