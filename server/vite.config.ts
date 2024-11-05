import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

function addFooter(footerText: string) {
  return {
    name: 'add-footer',
    generateBundle(_: any, bundle: any) {
      for (const file of Object.values<any>(bundle)) {
        if (file.type === 'chunk' && file.preliminaryFileName === 'main.js') {
          file.code += `\n${footerText}`
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [
    addFooter('window.server = server\n'),
    dts({
      outDir: 'dist/types', // 类型文件输出路径
      include: 'src/**/*.ts',
      insertTypesEntry: true, // 生成类型入口文件
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'server',
      formats: ['iife'],
      fileName: format => (format === 'iife' ? 'main.js' : `server/[name].js`),
    },
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'index' ? 'main.js' : `server/[name].js`
        },
      },
    },
    target: 'es6',
  },
})
