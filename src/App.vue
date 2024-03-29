<script setup lang="ts">
const sys = useSystemStore()
const toggleMenu = ref(true)
</script>

<template>
  <Suspense>
    <main class="h-full w-full flex overflow-hidden" @contextmenu.prevent="() => {}">
      <div v-show="toggleMenu" class="h-full min-w-12rem w-12% flex-shrink-0">
        <FileMenu />
      </div>
      <div class="h-full w-full flex flex-1 flex-col">
        <div class="h-2rem w-full flex flex-shrink-0 items-center px-2">
          <div class="i-carbon-menu" @click="toggleMenu = !toggleMenu" />
        </div>
        <div class="flex-1">
          <UniverSheet :id="sys.currentFileID" />
        </div>
      </div>
    </main>
  </Suspense>
</template>
