<script setup lang="ts">
import type { IWorkbookData, Univer, Workbook } from '@univerjs/core'

const props = defineProps<{
  id: string
}>()

const container = ref<HTMLDivElement>()

let univer: Univer | null = null
let workbook: Workbook | null = null

onMounted(() => {
  const closeWatch = watch(() => props.id, async (newVal, oldVal) => {
    if (newVal) {
      if (univer) {
        await setFile(oldVal, workbook?.save() ?? {})
        univer.dispose()
        univer = null
        workbook = null
      }
      univer = init({
        container: container.value,
        header: true,
        toolbar: true,
        footer: true,
      })
      workbook = univer.createUniverSheet(await getFile<Partial<IWorkbookData>>(newVal, {}))
    }
  })

  onUnmounted(() => {
    closeWatch()
    if (univer)
      univer.dispose()
  })
})
</script>

<template>
  <div ref="container" class="univer-container">
    <div v-if="!id">
      Please Select File
    </div>
  </div>
</template>

<style>
.univer-container {
  height: 100%;
  overflow: hidden;
}
</style>
