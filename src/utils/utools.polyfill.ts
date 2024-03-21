// Utools Polyfill File
// Please Only Run in Development Environment

export function utoolsPolyfill() {
  return {
    db: DB(),
  }
}

function DB() {
  const memory = new Map<string, any>()
  function put(data: DbDoc): DbReturn {
    memory.set(data._id, data)
    return {
      id: data._id,
      rev: data._rev || '1',
      ok: true,
      error: false,
    }
  }
  async function aPut(data: DbDoc): Promise<DbReturn> {
    return put(data)
  }
  function get(id: string): DbDoc | null {
    if (memory.has(id)) {
      return {
        _id: id,
        data: memory.get(id).data,
        _rev: '1',
      }
    }
    else {
      return null
    }
  }
  async function aGet(id: string): Promise<DbDoc | null> {
    return get(id)
  }
  return {
    put,
    get,
    promises: {
      get: aGet,
      put: aPut,
    },
  }
}
