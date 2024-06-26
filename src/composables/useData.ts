import { hasInjectionContext } from 'vue'

export async function useData<T>(id: string, initVal: T, transformer: Transformer<T>) {
  const data = ref(initVal) as unknown as Ref<T>
  const rawData = ref() as unknown as Ref<DbDoc>
  let isClose = false

  const _d = await utools.db.promises.get(id)
  if (_d === null) {
    // create a new doc
    await utools.db.promises.put({
      _id: id,
      data: transformer.Data2Str(initVal),
    })
    // equipped the new doc to rawData
    rawData.value = await utools.db.promises.get(id) as DbDoc
  }
  else {
    rawData.value = _d
    data.value = transformer.Str2Data(rawData.value.data as string)
  }

  async function refresh() {
    rawData.value = await utools.db.promises.get(id) as DbDoc
    data.value = transformer.Str2Data(rawData.value.data as string)
  }

  const close = watch(data, async () => {
    await utools.db.promises.put({
      _id: id,
      data: transformer.Data2Str(data.value),
      _rev: rawData.value._rev,
    })
    rawData.value = await utools.db.promises.get(id) as DbDoc
  }, {
    deep: true,
  })

  if (hasInjectionContext()) {
    onUnmounted(() => {
      if (!isClose) {
        isClose = true
        close()
      }
    })
  }

  return {
    data,
    refresh,
    close: () => {
      isClose = true
      return close()
    },
  }
}

interface Transformer<T> {
  Str2Data: (data: string) => T
  Data2Str: (data: T) => string
}
