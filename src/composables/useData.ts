import { hasInjectionContext } from 'vue'

export function useData<T>(id: string, initVal: T, transformer: Transformer<T>) {
  const data = ref(initVal) as unknown as Ref<T>
  const rawData = ref() as unknown as Ref<DbDoc>
  const isPedding = ref(true)

  ;(async function () {
    const _d = await utools.db.promises.get(id)
    if (_d === null) {
      // New Data Set
      await utools.db.promises.put({
        _id: id,
        data: transformer.Data2Str(initVal),
      })
      rawData.value = await utools.db.promises.get(id) as DbDoc
    }
    else {
      rawData.value = _d
      data.value = transformer.Str2Data(rawData.value.data as string)
    }
    isPedding.value = false
  })()

  async function refresh() {
    isPedding.value = true
    rawData.value = await utools.db.promises.get(id) as DbDoc
    data.value = transformer.Str2Data(rawData.value.data as string)
    isPedding.value = false
  }

  const close = watch(data, async () => {
    isPedding.value = true
    await utools.db.promises.put({
      _id: id,
      data: transformer.Data2Str(data.value),
      _rev: rawData.value._rev,
    })
    rawData.value = await utools.db.promises.get(id) as DbDoc
    isPedding.value = false
  }, {
    deep: true,
  })

  if (hasInjectionContext()) {
    onUnmounted(() => {
      close()
    })
  }

  return {
    data,
    isPedding,
    refresh,
  }
}

interface Transformer<T> {
  Str2Data: (data: string) => T
  Data2Str: (data: T) => string
}
