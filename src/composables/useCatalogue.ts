import { nanoid } from 'nanoid'

export async function useCatalogue() {
  const { data, refresh, close } = await useData<Category[]>('catalogue', [
    {
      id: nanoid(),
      name: '未命名',
      files: [],
      isFold: false,
    },
  ], {
    Data2Str: src => JSON.stringify(src),
    Str2Data: src => JSON.parse(src),
  })

  return {
    data,
    refresh,
    close,
  }
}

interface Category {
  id: string
  name: string
  isFold: boolean
  files: FileItem[]
}

interface FileItem {
  id: string
  name: string
}
