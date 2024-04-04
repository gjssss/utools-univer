export async function getFile<T extends object>(id: string, def?: T) {
  const data = await utools.db.promises.get(id)
  return JSON.parse(data?.data || JSON.stringify(def || {}))
}

export async function setFile(id: string, content: object) {
  const data = await utools.db.promises.get(id)
  await utools.db.promises.put({
    _id: id,
    _rev: data?._rev,
    data: JSON.stringify(content),
  })
}

export async function deleteFile(id: string) {
  if (id)
    await utools.db.promises.remove(id)
  else
    console.error('file not found')
}
