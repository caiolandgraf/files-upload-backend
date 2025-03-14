import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: ['./src/**/*.ts'],
  format: 'esm',
  outDir: 'dist',
  clean: true,
})
