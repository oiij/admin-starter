import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { name } from './package.json'

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    minify: false,
    lib: {
      entry: [resolve(__dirname, 'components/index.ts')],
      name,
      fileName: 'index',
      cssFileName: 'index',
      formats: [
        'es',
        'umd',
      ],
    },
    rollupOptions: {
      external: [
        'vue',
        'naive-ui',
        '@eiog/use',
      ],
      output: {
        globals: {
          'vue': 'Vue',
          '@vueuse/core': 'VueUseCore',
          'naive-ui': 'NaiveUI',
          '@eiog/use': 'EiogUse',
        },
      },
    },
  },
  plugins: [
    vue(),
    Unocss(), // https://github.com/antfu/unocss
    dts(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './components'),
    },
  },
})
