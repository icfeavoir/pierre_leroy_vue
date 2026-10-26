import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Prefer relative asset paths so the site can be hosted in a subdirectory.
  const base = env.VITE_BASE_URL || './'

  return {
    base,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Legacy @import still used in component styles; silence until migrated to @use.
          silenceDeprecations: ['import', 'legacy-js-api'],
        },
      },
    },
    server: {
      proxy: {
        '/mail': {
          target: 'https://pierre-leroy.fr',
          changeOrigin: true,
        },
      },
    },
  }
})
