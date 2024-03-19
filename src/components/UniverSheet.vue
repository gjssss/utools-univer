<script setup lang="ts">
const container = ref<HTMLDivElement>()
onMounted(() => {
  const univer = init({
    container: container.value,
    header: true,
    toolbar: true,
    footer: true,
  })
  univer.createUniverSheet({})
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
