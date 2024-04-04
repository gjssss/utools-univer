// Utools Polyfill File
// Please Only Run in Development Environment

function deepclone<T extends object>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export function utoolsPolyfill() {
  return {
    db: DB(),
  }
}

function DB() {
  const memory = new Map<string, any>()
  function put(data: DbDoc): DbReturn {
    memory.set(data._id, deepclone(data))
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
        data: deepclone(memory.get(id).data),
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
  function remove(id: string): DbDoc | null {
    const doc = get(id)
    memory.delete(id)
    return doc
  }
  async function aRemove(id: string): Promise<DbDoc | null> {
    return remove(id)
  }
  return {
    put,
    get,
    remove,
    promises: {
      get: aGet,
      put: aPut,
      remove: aRemove,
    },
  }
}
