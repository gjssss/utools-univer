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

function clickHandle(cb: Function) {
  cb()
  val.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade-down">
      <div
        v-show="val"
        ref="element"
        class="fixed z-1001 origin-top-left cursor-default overflow-hidden rounded-md text-0.9rem shadow-lg transition-all bg-base"
        :style="styleObj"
      >
        <div
          v-for="item in options"
          :key="item.text"
          class="flex cursor-pointer items-center gap-2 px-4 py-1 hover:bg-select"
          @click="clickHandle(item.cb)"
        >
          <div :class="item.icon" />
          {{ item.text }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>

</style>
