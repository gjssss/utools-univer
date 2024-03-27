<script setup lang="ts">
import { nanoid } from 'nanoid'
import type { ContextMenuListOption } from '~/types'

type ContextType = 'category' | 'file'

const posX = ref(0)
const posY = ref(0)
const contextOpen = ref(false)
const contextType = ref<ContextType>('category')
const selectIdx = ref(0)
const contextMenuOption = computed<ContextMenuListOption>(() => {
  if (contextType.value === 'category') {
    return [
      {
        text: '删除分类',
        icon: 'i-carbon-trash-can',
        cb: () => {},
      },
    ]
  }
  else {
    return [
      {
        text: '重命名文件',
        icon: 'i-carbon-edit',
        cb: () => {},
      },
      {
        text: '删除文件',
        icon: 'i-carbon-trash-can',
        cb: () => {},
      },
    ]
  }
})

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

async function openContextMenu(event: MouseEvent, type: ContextType, idx: number) {
  const { clientX, clientY } = event
  posX.value = clientX
  posY.value = clientY
  contextType.value = type
  selectIdx.value = idx
  await nextTick()
  contextOpen.value = true
}
</script>

<template>
  <div class="h-full w-full flex flex-col cursor-default bg-#eee dark:bg-#222">
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
          <div class="category-control absolute right-0 flex gap-1 bg-#eee px-2 op-0 transition-opacity dark:bg-#222">
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
            v-for="file, fileIndex in item.files"
            :key="file.id"
            class="py-0.5 pl-4 text-0.9rem hover:bg-#ddd hover:dark:bg-#555"
            @click="sys.currentFileID = file.id"
            @contextmenu="e => openContextMenu(e, 'file', fileIndex)"
          >
            {{ file.name }}
          </div>
        </TransitionGroup>
      </div>
    </div>
    <div class="cursor-pointer py-1 text-center transition-all hover:bg-#ddd hover:dark:bg-#555" @click="addCategory()">
      新建分类
    </div>
    <ContextMenu v-model:value="contextOpen" :x="posX" :y="posY" :options="contextMenuOption" />
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
