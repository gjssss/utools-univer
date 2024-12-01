interface FilePayload {
  isFile: boolean
  isDirectory: boolean
  name: string
  path: string
}
export async function resolveFilePayload(payload: FilePayload[]) {
  const data = server.fileModule.resolveFile(payload[0].path)
  // eslint-disable-next-line no-console
  console.log(data)
}
