import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['dev', 'src/**/*.test.*', 'src/**/*.spec.*'],
      outDir: 'dist',
      rollupTypes: true,
    }),
    ...(process.env.BUILD_DEMO !== 'true'
      ? [
          viteStaticCopy({
            targets: [
              {
                src: 'src/styles/theme.css',
                dest: '.',
                rename: 'styles.css',
              },
            ],
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  // Dev server serves the playground
  root: '.',
  base: process.env.BUILD_DEMO === 'true' ? '/nc-ui/' : '/',
  build:
    process.env.BUILD_DEMO === 'true'
      ? {
          // Demo app build for GitHub Pages
          outDir: 'dist',
          emptyOutDir: true,
          chunkSizeWarningLimit: 600,
          rollupOptions: {
            input: resolve(__dirname, 'index.html'),
            output: {
              manualChunks(id: string) {
                const p = id.replace(/\\+/g, '/'); // normalize Windows paths
                if (!p.includes('/node_modules/')) return;

                // YAML editor dependencies - lazy loaded separately
                if (
                  /\/node_modules\/(prism-react-renderer|react-simple-code-editor|js-yaml)\//.test(
                    p
                  )
                ) {
                  return 'vendor_yaml_editor';
                }

                // Everything else goes to a single vendor chunk
                return 'vendor';
              },
            },
          },
        }
      : {
          // Library build
          lib: {
            entry: {
              index: resolve(__dirname, 'src/index.ts'),
              icons: resolve(__dirname, 'src/components/icons/index.ts'),
              yaml: resolve(__dirname, 'src/components/YamlTextArea.tsx'),
            },
            name: 'NcUI',
            formats: ['es', 'cjs'],
            fileName: (format, entryName) => {
              const ext = format === 'es' ? 'js' : 'cjs';
              return `${entryName}.${ext}`;
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
});
