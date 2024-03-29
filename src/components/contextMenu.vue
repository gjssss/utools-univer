<script setup lang="ts">
import type { ContextMenuListOption } from '~/types'

const props = defineProps<{
  x: number
  y: number
  value?: boolean
  options: ContextMenuListOption
}>()

const emits = defineEmits<{
  (e: 'update:value', value: boolean): void
}>()

const val = useVModel(props, 'value', emits, {
  defaultValue: false,
})

const element = ref<HTMLDivElement>()

onClickOutside(element, () => {
  val.value = false
})

const styleObj = computed(() => {
  const { x, y } = props
  return {
    left: `${x}px`,
    top: `${y}px`,
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade-down">
      <div
        v-show="val"
        ref="element"
        class="fixed z-1001 origin-top-left cursor-default overflow-hidden rounded-md bg-white text-0.9rem shadow-lg transition-all dark:bg-#333"
        :style="styleObj"
      >
        <div
          v-for="item in options"
          :key="item.text"
          class="flex cursor-pointer items-center gap-2 px-4 py-1 hover:bg-#eee hover:dark:bg-#444"
        >
          <div :class="item.icon" />
          {{ item.text }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-20px) scaleX(0.01);
}
</style>
