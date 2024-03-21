export function useCatalogue() {
  const { data, isPedding, refresh } = useData<Category[]>('catalogue', [
    {
      name: '未命名',
      files: [],
    },
  ], {
    Data2Str: src => JSON.stringify(src),
    Str2Data: src => JSON.parse(src),
  })

  return {
    data,
    isPedding,
    refresh,
  }
}

interface Category {
  name: string
  files: FileItem[]
}

interface FileItem {
  id: string
  name: string
  content: string
}
