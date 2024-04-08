import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'bg-modal': 'bg-# dark:bg-#333',
      'bg-base': 'bg-#fff dark:bg-#333',
      'bg-select': 'bg-#ddd dark:bg-#555',
      'bg-0': 'bg-#fff dark:bg-#111',
      'bg-1': 'bg-#eee dark:bg-#222',
      'bg-2': 'bg-#ddd dark:bg-#333',
      'bg-3': 'bg-#ccc dark:bg-#444',
      'bg-4': 'bg-#bbb dark:bg-#555',
    },
    {
      'flex-center': 'flex items-center justify-center',
    },
  ],
  rules: [
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
})
