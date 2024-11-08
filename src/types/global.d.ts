import type { Univer } from '@univerjs/core'
import type { FUniver } from '@univerjs/facade'

declare global {
  interface Window {
    univer: Univer
    uDocAPI: ReturnType<typeof FUniver.newAPI>
    uSheetAPI: ReturnType<typeof FUniver.newAPI>
  }
}
