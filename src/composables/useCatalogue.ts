import type { FileType } from './store'
import { nanoid } from 'nanoid'

export async function useCatalogue() {
  const { data, refresh, close } = await useData<Category[]>('catalogue', [
    {
      id: nanoid(),
      name: '未命名分类',
      files: [],
      isFold: false,
    },
  ], {
    Data2Str: src => JSON.stringify(src),
    Str2Data: src => JSON.parse(src),
  })

  function addCategory() {
    const id = nanoid()
    data.value.push({
      id,
      name: '未命名分类',
      isFold: false,
      files: [],
    })
    return id
  }

  function delCategory(idx: number) {
    const files = data.value[idx].files
    const promises = files.map(file => deleteFile(file.id))
    Promise.all(promises).then(() => data.value.splice(idx, 1)).catch(console.error)
  }

  return {
    data,
    refresh,
    close,
    addCategory,
    delCategory,
  }
}

interface Category {
  id: string
  name: string
  isFold: boolean
  files: FileItem[]
}

export interface FileItem {
  id: string
  name: string
  type: FileType
}
