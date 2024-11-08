export enum FileType {
  Sheet = 'sheet',
  Doc = 'doc',
}

const state = reactive<{
  currentFileID: string
  fileType: FileType
}>({
  currentFileID: '',
  fileType: FileType.Sheet,
})

export function useSystemStore() {
  return state
}
