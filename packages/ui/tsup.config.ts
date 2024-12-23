import { defineConfig } from 'tsup'
import { peerDependencies } from './package.json'

export default defineConfig({
  entry: ['./components/resolvers.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  external: Object.keys(peerDependencies),
  dts: true,
  minify: false,
})
