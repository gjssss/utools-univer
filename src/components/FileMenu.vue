<script setup lang="ts">
import { nanoid } from 'nanoid'

const { data } = await useCatalogue()
function addFile(idx: number) {
  data.value[idx].isFold = false
  data.value[idx].files.push({
    id: nanoid(),
    name: '未命名文件',
  })
}
const sys = useSystemStore()

function toggleFold(idx: number) {
  data.value[idx].isFold = !data.value[idx].isFold
}
function addCategory() {
  data.value.push({
    id: nanoid(),
    name: '未命名分类',
    isFold: false,
    files: [],
  })
}
</script>

<template>
  <div class="h-full w-full flex flex-col cursor-default bg-#eee dark:bg-#333">
    <div class="w-full flex-1 overflow-x-hidden overflow-y-auto">
      <div v-for="item, index in data" :key="item.id">
        <div class="category-item relative flex items-center gap-2 px-2 py-1" @click="toggleFold(index)">
          <div class="i-carbon-caret-down cursor-pointer transition-all" :class="item.isFold ? 'rotate--90' : ''" />
          <div class="flex-1">
            {{ item.name }}
          </div>
          <div class="text-#888 transition-opacity">
            {{ item.files.length }}
          </div>
          <div class="category-control absolute right-0 flex gap-1 bg-#eee px-2 op-0 transition-opacity dark:bg-#333f">
            <div class="i-carbon-add-alt cursor-pointer hover:text-blue-700" @click.stop="addFile(index)" />
            <div class="i-carbon-overflow-menu-horizontal hover:blue cursor-pointer hover:text-blue-700" />
          </div>
        </div>
        <TransitionGroup v-if="!(item.isFold)" tag="div" name="fade">
          <div v-for="file in item.files" :key="file.id" class="py-0.5 pl-4 text-0.9rem hover:bg-#ddd hover:dark:bg-#555" @click="sys.currentFileID = file.id">
            {{ file.name }}
          </div>
        </TransitionGroup>
      </div>
      <div class="cursor-pointer py-1 text-center transition-all hover:bg-#ddd hover:dark:bg-#555" @click="addCategory()">
        新建分类
      </div>
    </div>
  </div>
</template>

<style>
.category-item:hover .category-control {
  opacity: 1;
}
/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>
