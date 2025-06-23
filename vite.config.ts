import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import dotenv from "dotenv";
// import tailwindcss from "@tailwindcss/vite";
dotenv.config();
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // tailwindcss(),
    react()
  ],
  define:{
    "process.env.REACT_APP_API_URL": JSON.stringify(process.env.REACT_APP_API_URL),
  }
})
