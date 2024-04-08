<script setup lang="ts">
import { nanoid } from 'nanoid'
import type { ContextMenuListOption } from '~/types'

type ContextType = 'category' | 'file'

const { data, addCategory, delCategory } = await useCatalogue()
const sys = useSystemStore()
const posX = ref(0)
const posY = ref(0)
const contextOpen = ref(false)
const modalOpen = ref(false)
const contextType = ref<ContextType>('category')
const categoryIndex = ref(0)
const fileIndex = ref(0)
const contextMenuOption = computed<ContextMenuListOption>(() => {
  if (contextType.value === 'category') {
    return [
      {
        text: '删除分类',
        icon: 'i-carbon-trash-can',
        cb: () => {
          delCategory(categoryIndex.value)
        },
      },
    ]
  }
  else {
    return [
      {
        text: '重命名文件',
        icon: 'i-carbon-edit',
        cb: () => {
          // data.value[categoryIndex.value].files[fileIndex.value].name = 'rename'
          modalOpen.value = true
        },
      },
      {
        text: '删除文件',
        icon: 'i-carbon-trash-can',
        cb: () => {
          const idx = data.value[categoryIndex.value].files[fileIndex.value].id
          deleteFile(idx).then(() => data.value[categoryIndex.value].files.splice(fileIndex.value, 1))
        },
      },
    ]
  }
})

function addFile(idx: number) {
  data.value[idx].isFold = false
  data.value[idx].files.push({
    id: nanoid(),
    name: '未命名文件',
  })
}

function toggleFold(idx: number) {
  data.value[idx].isFold = !data.value[idx].isFold
}

async function openContextMenu(event: MouseEvent, type: ContextType, cateIdx: number, fileIdx?: number) {
  const { clientX, clientY } = event
  posX.value = clientX
  posY.value = clientY
  contextType.value = type
  categoryIndex.value = cateIdx
  if (fileIdx)
    fileIndex.value = fileIdx
  await nextTick()
  contextOpen.value = true
}
</script>

<template>
  <div class="h-full w-full flex flex-col cursor-default bg-1">
    <div class="none-scroller w-full flex-1 overflow-x-hidden" :class="contextOpen ? 'of-hidden' : 'overflow-y-auto'">
      <div v-for="item, index in data" :key="item.id">
        <div
          class="category-item relative flex items-center gap-2 px-2 py-1"
          @click="toggleFold(index)"
          @contextmenu="e => openContextMenu(e, 'category', index)"
        >
          <div class="i-carbon-caret-down cursor-pointer transition-all" :class="item.isFold ? 'rotate--90' : ''" />
          <div class="flex-1">
            {{ item.name }}
          </div>
          <div class="text-#888 transition-opacity">
            {{ item.files.length }}
          </div>
          <div class="category-control absolute right-0 flex gap-1 px-2 op-0 transition-opacity bg-1">
            <div
              class="i-carbon-add-alt cursor-pointer hover:text-blue-700"
              @click.stop="addFile(index)"
            />
            <div
              class="i-carbon-overflow-menu-horizontal hover:blue cursor-pointer hover:text-blue-700"
              @click.stop="e => openContextMenu(e, 'category', index)"
            />
          </div>
        </div>
        <TransitionGroup v-if="!(item.isFold)" tag="div" name="fade-right">
          <div
            v-for="file, fIdx in item.files"
            :key="file.id"
            class="py-0.5 pl-4 text-0.9rem hover:bg-2"
            @click="sys.currentFileID = file.id"
            @contextmenu="e => openContextMenu(e, 'file', index, fIdx)"
          >
            {{ file.name }}
          </div>
        </TransitionGroup>
      </div>
    </div>
    <div class="cursor-pointer py-1 text-center transition-all hover:bg-4" @click="addCategory()">
      新建分类
    </div>
    <ContextMenu v-model:value="contextOpen" :x="posX" :y="posY" :options="contextMenuOption" />
    <Modal v-model:value="modalOpen">
      <div class="h-6rem w-20rem flex-center gap-2 rounded-lg shadow-lg bg-1">
        <div>文件名</div>
        <input>
      </div>
    </Modal>
  </div>
</template>

<style>
.category-item:hover .category-control {
  opacity: 1;
}
.fade-right-move,
.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-right-enter-from,
.fade-right-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-right-leave-active {
  position: absolute;
}

.none-scroller::-webkit-scrollbar {
  display: none;
}
.none-scroller::scrollbar {
  display: none;
}
</style>
