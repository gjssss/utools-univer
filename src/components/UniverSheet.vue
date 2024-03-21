<script setup lang="ts">
import type { Univer } from '@univerjs/core'

const props = defineProps<{
  id: string
}>()

const container = ref<HTMLDivElement>()

let univer: Univer | null = null

onMounted(() => {
  const closeWatch = watch(() => props.id, () => {
    if (props.id) {
      if (univer) {
        univer.dispose()
        univer = null
      }
      univer = init({
        container: container.value,
        header: true,
        toolbar: true,
        footer: true,
      })
      univer.createUniverSheet({})
    }
  }, { immediate: true })

  onUnmounted(() => {
    closeWatch()
    if (univer)
      univer.dispose()
  })
})
</script>

<template>
  <div ref="container" class="univer-container" />
</template>

<style>
.univer-container {
  height: 100%;
  overflow: hidden;
}
</style>
