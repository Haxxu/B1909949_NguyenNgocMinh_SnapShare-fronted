import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sass from 'sass';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                transformAssetUrls,
            },
        }),
        quasar({
            autoImportComponentCase: 'combined',
            sassVariables: 'src/assets/styles/quasar-variables.sass',
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            // '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            sass: {
                implementation: sass,
            },
            scss: {
                additionalData: `@import "./src/assets/styles/global.scss";`,
            },
        },
        // postcss: {
        //     plugins: [require('autoprefixer')],
        // },
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
        // include: [/node_modules/],
    },
});
