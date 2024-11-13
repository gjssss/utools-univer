<script setup lang="ts">
import type { IWorkbookData } from '@univerjs/core'
import type { FWorkbook } from '@univerjs/facade'
import { FUniver } from '@univerjs/facade'
import { sheetInit } from '~/services/sheets/uSheet'

const props = defineProps<{
  id: string
}>()

const container = ref<HTMLDivElement>()

let univerAPI: FUniver | null = null
let workbook: FWorkbook | null = null

onMounted(() => {
  const closeWatch = watch(() => props.id, async (newVal, oldVal) => {
    if (newVal) {
      if (univerAPI && workbook) {
        await setFile(oldVal!, workbook.save() ?? {})
        const unitId = workbook.getId()
        if (unitId)
          univerAPI.disposeUnit(unitId)
        univerAPI = null
        workbook = null
      }
      const univer = sheetInit({
        container: container.value,
      })
      univerAPI = FUniver.newAPI(univer)
      workbook = univerAPI.createUniverSheet(await getFile<Partial<IWorkbookData>>(newVal, {}))
    }
  }, {
    immediate: true,
  })

  onUnmounted(async () => {
    closeWatch()
    if (univerAPI && workbook) {
      await setFile(props.id, workbook.save())
      const unitId = workbook.getId()
      if (unitId)
        univerAPI.disposeUnit(unitId)
    }
  })
})
</script>

<template>
  <div ref="container" class="univer-container">
    <div v-if="!id" class="h-full flex-center text-1.2rem">
      请选择文件
    </div>
  </div>
</template>

<style>
.univer-container {
  height: 100%;
  overflow: hidden;
}
</style>
