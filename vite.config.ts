import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ['src'],
            exclude: ['dev', 'src/**/*.test.*', 'src/**/*.spec.*'],
            outDir: 'dist',
            rollupTypes: true,
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    // Dev server serves the playground
    root: '.',
    base: process.env.BUILD_DEMO === 'true' ? '/nc-ui/' : '/',
    build: process.env.BUILD_DEMO === 'true' ? {
        // Demo app build for GitHub Pages
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: resolve(__dirname, 'index.html'),
        },
    } : {
        // Library build
        lib: {
            entry: {
                main: resolve(__dirname, 'src/index.ts'),
                icons: resolve(__dirname, 'src/components/icons/index.ts'),
            },
            name: 'NcUI',
            formats: ['es', 'cjs'],
            fileName: (format, entryName) => {
                const ext = format === 'es' ? 'js' : 'cjs'
                return entryName === 'main' ? `index.${ext}` : `${entryName}.${ext}`
            },
        },
        rollupOptions: {
            // Exclude dev folder and test files from library build
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                },
            },
        },
        sourcemap: true,
        emptyOutDir: true,
    },
})
