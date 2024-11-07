<script setup lang="ts">
import UniverDoc from '~/components/UniverDoc.vue'
import UniverSheet from '~/components/UniverSheet.vue'
import { FileType } from '~/composables/store'

const sys = useSystemStore()
const toggleMenu = ref(true)

// 映射不同情况下组件
const componentMap = {
  univerSheet: UniverSheet,
  univerDoc: UniverDoc,
}

// 监听创建情况
const currentComponentName = computed(() => {
  switch (sys.fileType) {
    case FileType.Sheet:
      return 'univerSheet'
    case FileType.Doc:
      return 'univerDoc'
    default:
      return 'univerSheet'
  }
})

const currentComponent = computed(() => componentMap[currentComponentName.value])
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
          <!-- TODO:添加i18n选项 -->
        </div>
        <div class="flex-1">
          <component :is="currentComponent" :id="sys.currentFileID" :key="sys.currentFileID" />
        </div>
      </div>
    </main>
  </Suspense>
</template>
