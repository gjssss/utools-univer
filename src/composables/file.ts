/**
 * @description 文件操作函数
 */

const { data } = await useCatalogue()

export function renameFile() {

}

export async function deleteFile(idx: number) {
  const rawData = await utools.db.promises.get(data.value[idx].id) as DbDoc
  return await utools.db.promises.remove(rawData)
}
