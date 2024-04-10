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
      'b-c': 'b-#555 dark:b-#aaa',
    },
    {
      'flex-center': 'flex items-center justify-center',
    },
    {
      button: 'b-c cursor-pointer b px-3 py-0.25 rounded-lg hover:bg-#888 transition-all',
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
