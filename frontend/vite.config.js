import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    build: {
        outDir: '../frontend/dist',
    },
    server: {
        port: 7001, // Replace 3000 with your desired port number
    }
});