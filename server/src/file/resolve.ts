export function resolveFile(path: string) {
  return fs.readFileSync(path, {
    encoding: 'utf-8',
  })
}
