<script setup lang="ts">
const props = defineProps<{
  value?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:value', value: boolean): void
}>()

const val = useVModel(props, 'value', emits, {
  defaultValue: false,
})

const element = ref()

onClickOutside(element, () => {
  val.value = false
})
</script>

<template>
  <Teleport to="body">
    <div v-show="val" class="fixed left-0 top-0 h-screen w-screen" />
    <Transition name="fade-down">
      <div v-show="val" ref="element" class="fixed left-50% top-50% z-1001 transform-translate--50% transition-all">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style>

</style>
