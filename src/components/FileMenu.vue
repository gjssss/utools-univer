<script setup lang="ts">
import { nanoid } from 'nanoid'
import { FileType } from '~/composables/store'
import type { FileItem } from '~/composables/useCatalogue'
import type { ContextMenuListOption } from '~/types'

type ContextType = 'category' | 'file'

const { data, addCategory, delCategory } = await useCatalogue()
const sys = useSystemStore()
const posX = ref(0)
const posY = ref(0)
const contextOpen = ref(false)
const modalOpen = ref(false)
const delNoticeOpen = ref(false)
const contextType = ref<ContextType>('category')
const categoryIndex = ref(0)
const fileIndex = ref(0)
const tempFileName = ref('')
const renameInput = ref<HTMLInputElement>()
const typeSelectVisible = ref(false)
let delCb = () => {}
const contextMenuOption = computed<ContextMenuListOption>(() => {
  if (contextType.value === 'category') {
    return [
      {
        text: '重命名分类',
        icon: 'i-carbon-edit',
        cb: async () => {
          tempFileName.value = data.value[categoryIndex.value].name
          modalOpen.value = true
          await nextTick()
          renameInput.value?.focus()
        },
      },
      {
        text: '删除分类',
        icon: 'i-carbon-trash-can',
        cb: () => {
          delNoticeOpen.value = true

          delCb = () => {
            delCategory(categoryIndex.value)
            delNoticeOpen.value = false
          }
        },
      },
    ]
  }
  else {
    return [
      {
        text: '重命名文件',
        icon: 'i-carbon-edit',
        cb: async () => {
          tempFileName.value = data.value[categoryIndex.value].files[fileIndex.value].name
          modalOpen.value = true
          await nextTick()
          renameInput.value?.focus()
        },
      },
      {
        text: '删除文件',
        icon: 'i-carbon-trash-can',
        cb: () => {
          delNoticeOpen.value = true
          delCb = async () => {
            const idx = data.value[categoryIndex.value].files[fileIndex.value].id
            await deleteFile(idx)
            data.value[categoryIndex.value].files.splice(fileIndex.value, 1)
            delNoticeOpen.value = false
          }
        },
      },
    ]
  }
})

function addFile(idx: number) {
  categoryIndex.value = idx
  typeSelectVisible.value = true
}

function createFile(type: FileType) {
  data.value[categoryIndex.value].isFold = false
  data.value[categoryIndex.value].files.push({
    id: nanoid(),
    name: `未命名${type === 'sheet' ? '表格' : '文档'}`,
    type,
  })
  typeSelectVisible.value = false
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

function updateFile(file: FileItem) {
  sys.currentFileID = file.id
  sys.fileType = file.type
}

function confirmRenameFile() {
  if (contextType.value === 'category')
    data.value[categoryIndex.value].name = tempFileName.value
  else
    data.value[categoryIndex.value].files[fileIndex.value].name = tempFileName.value
  modalOpen.value = false
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
            @click="updateFile(file)"
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
    <!-- 类型选择 -->
    <Modal v-model:value="typeSelectVisible">
      <div class="h-8rem w-20rem flex-center flex-col gap-4 rounded-lg px-2rem shadow-lg bg-1">
        <div>选择文件类型</div>
        <div class="flex gap-4">
          <UButton @click="createFile(FileType.Doc)">
            文档
          </UButton>
          <UButton @click="createFile(FileType.Sheet)">
            表格
          </UButton>
        </div>
      </div>
    </Modal>
    <ContextMenu v-model:value="contextOpen" :x="posX" :y="posY" :options="contextMenuOption" />
    <Modal v-model:value="modalOpen">
      <div class="h-8rem w-20rem flex-center flex-col gap-4 rounded-lg px-2rem shadow-lg bg-1">
        <div class="flex gap-4">
          <div>名称</div>
          <input ref="renameInput" v-model="tempFileName" @keyup.enter="confirmRenameFile">
        </div>
        <div class="w-full flex justify-end">
          <UButton @click="confirmRenameFile">
            确认
          </UButton>
        </div>
      </div>
    </Modal>
    <Modal v-model:value="delNoticeOpen">
      <div class="h-8rem w-20rem flex-center flex-col gap-4 rounded-lg px-2rem shadow-lg bg-1">
        <div class="text-1.1rem">
          确认要删除吗？
        </div>
        <div class="w-full flex justify-end gap-4">
          <UButton @click="delCb">
            确认
          </UButton>
          <UButton @click="delNoticeOpen = false">
            取消
          </UButton>
        </div>
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
