import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    base: '/HB2/',               // Название репозитория
    plugins: [react()],
    build: {
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html')   // Абсолютный путь к index.html
        }
    }
})
