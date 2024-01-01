/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

console.log(process.env)

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return {
    server: {
      port: parseInt(process.env.VITE_APP_PORT),
      host: process.env.VITE_APP_HOST
    },
    plugins: [react()],
  }
});
