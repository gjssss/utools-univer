<script setup lang="ts">
toggleDark(false)
</script>

<template>
  <Suspense>
    <main class="h-full w-full flex">
      <div class="h-full w-10rem flex-shrink-0">
        <FileMenu />
      </div>
      <div class="h-full flex flex-1 flex-col">
        <div class="h-4rem w-full flex-shrink-0">
          header
        </div>
        <div class="flex-1">
        <!-- <UniverSheet /> -->
        </div>
      </div>
    </main>
  </Suspense>
</template>
