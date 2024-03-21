import { describe, expect, it } from 'vitest'

describe('useData', () => {
  window.utools = utoolsPolyfill() as any

  it('isPedding', async () => {
    const { isPedding } = useData('pedding', { hello: 123 }, {
      Data2Str: src => JSON.stringify(src),
      Str2Data: src => JSON.parse(src),
    })
    expect(isPedding.value).toEqual(true)
    await sleep(10)
    expect(isPedding.value).toEqual(false)
  })

  it('data init and update', async () => {
    const { data } = useData('data', { hello: 123 }, {
      Data2Str: src => JSON.stringify(src),
      Str2Data: src => JSON.parse(src),
    })

    await sleep(10)
    // init
    expect(data.value).toEqual({ hello: 123 })
    expect(utools.db.get('data')!.data).toEqual(JSON.stringify({ hello: 123 }))

    // update
    data.value.hello = 456
    await sleep(10)
    expect(utools.db.get('data')!.data).toEqual(JSON.stringify({ hello: 456 }))
  })

  it('refresh', async () => {
    const { data, refresh } = useData('refresh', { hello: 123 }, {
      Data2Str: src => JSON.stringify(src),
      Str2Data: src => JSON.parse(src),
    })

    await sleep(10)
    utools.db.put({
      _id: 'refresh',
      data: JSON.stringify({ hello: 456 }),
      _rev: '1',
    })
    expect(data.value).toEqual({ hello: 123 })
    await refresh()
    expect(data.value).toEqual({ hello: 456 })
  })
})
