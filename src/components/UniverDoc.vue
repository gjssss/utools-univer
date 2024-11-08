<script setup lang="ts">
import type { IDocumentData } from '@univerjs/core'
import type { FDocument } from '@univerjs/facade/lib/types/apis/docs/f-document.js'
import { FUniver } from '@univerjs/facade'
import { docInit } from '~/services/docs/uDoc'

const props = defineProps<{
  id: string
}>()

const docContainer = ref<HTMLDivElement>()

let univerAPI: FUniver | null = null
let workbook: FDocument | null = null

onMounted(() => {
  const closeWatch = watch(() => props.id, async (newVal, oldVal) => {
    if (newVal) {
      if (univerAPI && workbook) {
        await setFile(oldVal!, workbook.getSnapshot() ?? {})
        const unitId = workbook.getId()
        if (unitId)
          univerAPI.disposeUnit(unitId)
        univerAPI = null
        workbook = null
      }
      const univer = docInit({
        container: docContainer.value,
      })
      univerAPI = FUniver.newAPI(univer)
      workbook = univerAPI.createUniverDoc(await getFile<Partial<IDocumentData>>(newVal, {}))
    }
  }, {
    immediate: true,
  })

  onUnmounted(() => {
    closeWatch()
    if (univerAPI && workbook) {
      const unitId = workbook.getId()
      if (unitId)
        univerAPI.disposeUnit(unitId)
    }
  })
})
</script>

<template>
  <div ref="docContainer" class="univer-doc-container">
    <div v-if="!id" class="h-full flex-center text-1.2rem">
      请选择文件
    </div>
  </div>
</template>

<style>
.univer-doc-container {
  height: 100%;
  overflow: hidden;
}
</style>
