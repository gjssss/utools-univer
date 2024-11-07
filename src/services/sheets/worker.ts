import { univerLocales } from '@/locales'
import { LocaleType, LogLevel, Univer } from '@univerjs/core'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRPCWorkerThreadPlugin } from '@univerjs/rpc'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFilterUIWorkerPlugin } from '@univerjs/sheets-filter-ui'
import { UniverRemoteSheetsFormulaPlugin } from '@univerjs/sheets-formula'

// Univer web worker is also a univer application.
const univer = new Univer({
  locale: LocaleType.ZH_CN,
  logLevel: LogLevel.VERBOSE,
  locales: univerLocales,
})

univer.registerPlugin(UniverSheetsPlugin, { onlyRegisterFormulaRelatedMutations: true })
univer.registerPlugin(UniverFormulaEnginePlugin)
univer.registerPlugin(UniverRPCWorkerThreadPlugin)
univer.registerPlugin(UniverRemoteSheetsFormulaPlugin)
univer.registerPlugin(UniverSheetsFilterUIWorkerPlugin)

declare let self: WorkerGlobalScope & typeof globalThis & { univer: Univer }
self.univer = univer
