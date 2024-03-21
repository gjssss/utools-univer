const state = reactive({
  currentFileID: '',
})

export function useSystemStore() {
  return state
}
