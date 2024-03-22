<script setup lang="ts">
import { nanoid } from 'nanoid'

const { data } = await useCatalogue()
function addFile(idx: number) {
  data.value[idx].files.push({
    id: nanoid(),
    name: '文件a',
  })
}
const sys = useSystemStore()
</script>

<template>
  <div class="h-full w-full">
    <div v-for="item, index in data" :key="item.id">
      <div>{{ item.name }}<span @click="addFile(index)">+</span></div>
      <div v-for="file in item.files" :key="file.id" @click="sys.currentFileID = file.id">
        {{ file.name }}
      </div>
    </div>
  </div>
</template>

<style>

</style>
