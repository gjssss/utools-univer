import { describe, expect, it } from 'vitest'
import { utoolsPolyfill } from '~/utils/utools.polyfill'

describe('utools Polyfill', () => {
  window.utools = utoolsPolyfill() as any
  it('db', () => {
    expect(utools.db.put({
      _id: 'demo',
      data: 'demo',
    })).toMatchObject({
      id: 'demo',
      ok: true,
      rev: expect.anything(),
    })

    expect(utools.db.get('demo')).toMatchObject({
      _id: 'demo',
      _rev: expect.anything(),
      data: 'demo',
    })
  })
})
