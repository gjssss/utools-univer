import { describe, expect, it } from 'vitest'

describe('useData', () => {
  window.utools = utoolsPolyfill() as any

  it('data init and update', async () => {
    const { data } = await useData('data', { hello: 123 }, {
      Data2Str: src => JSON.stringify(src),
      Str2Data: src => JSON.parse(src),
    })

    // init
    expect(data.value).toEqual({ hello: 123 })
    expect(utools.db.get('data')!.data).toEqual(JSON.stringify({ hello: 123 }))

    // update
    data.value.hello = 456
    await sleep(10)
    expect(utools.db.get('data')!.data).toEqual(JSON.stringify({ hello: 456 }))
  })

  it('refresh', async () => {
    const { data, refresh } = await useData('refresh', { hello: 123 }, {
      Data2Str: src => JSON.stringify(src),
      Str2Data: src => JSON.parse(src),
    })

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
