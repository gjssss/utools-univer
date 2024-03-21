import { nanoid } from 'nanoid'

export async function useCatalogue() {
  const { data, refresh } = await useData<Category[]>('catalogue', [
    {
      id: nanoid(),
      name: '未命名',
      files: [],
    },
  ], {
    Data2Str: src => JSON.stringify(src),
    Str2Data: src => JSON.parse(src),
  })

  return {
    data,
    refresh,
  }
}

interface Category {
  id: string
  name: string
  files: FileItem[]
}

interface FileItem {
  id: string
  name: string
}
