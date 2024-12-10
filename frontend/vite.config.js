import { defineConfig } from 'vite';

export default defineConfig({
    root: './',
    build: {
        outDir: '../ManufacturingCompany/dist',
    },
    server: {
        port: 7000, // Replace 3000 with your desired port number
    }
});