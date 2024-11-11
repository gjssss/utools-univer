import type { IUniverUIConfig } from '@univerjs/ui'
import { univerLocales } from '@/locales'
import { LocaleType, Univer, UserManagerService } from '@univerjs/core'
import { UniverDataValidationPlugin } from '@univerjs/data-validation'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverDrawingPlugin } from '@univerjs/drawing'
import { UniverDrawingUIPlugin } from '@univerjs/drawing-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { FUniver } from '@univerjs/facade'
import { UniverFindReplacePlugin } from '@univerjs/find-replace'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsConditionalFormattingPlugin } from '@univerjs/sheets-conditional-formatting'
import { UniverSheetsConditionalFormattingUIPlugin } from '@univerjs/sheets-conditional-formatting-ui'
import { UniverSheetsCrosshairHighlightPlugin } from '@univerjs/sheets-crosshair-highlight'
import { UniverSheetsDataValidationPlugin } from '@univerjs/sheets-data-validation'
import { UniverSheetsDrawingPlugin } from '@univerjs/sheets-drawing'
import { UniverSheetsDrawingUIPlugin } from '@univerjs/sheets-drawing-ui'
import { UniverSheetsFilterPlugin } from '@univerjs/sheets-filter'
import { UniverSheetsFilterUIPlugin } from '@univerjs/sheets-filter-ui'
import { UniverSheetsFindReplacePlugin } from '@univerjs/sheets-find-replace'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsFormulaUIPlugin } from '@univerjs/sheets-formula-ui'
import { UniverSheetsHyperLinkPlugin } from '@univerjs/sheets-hyper-link'
import { UniverSheetsHyperLinkUIPlugin } from '@univerjs/sheets-hyper-link-ui'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsSortPlugin } from '@univerjs/sheets-sort'
import { UniverSheetsSortUIPlugin } from '@univerjs/sheets-sort-ui'
import { UniverSheetsThreadCommentPlugin } from '@univerjs/sheets-thread-comment'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { IThreadCommentMentionDataService, UniverThreadCommentUIPlugin } from '@univerjs/thread-comment-ui'
import { UniverUIPlugin } from '@univerjs/ui'
import { CustomMentionDataService, mockUser } from './customMentionDataService'

export function sheetInit(option: IUniverUIConfig) {
  const univer = new Univer({
    theme: defaultTheme,
    locale: LocaleType.ZH_CN,
    locales: univerLocales,
  })
  // register the univer core engine
  univer.registerPlugin(UniverRenderEnginePlugin)
  univer.registerPlugin(UniverUIPlugin, option)
  // sheets based on doc
  univer.registerPlugin(UniverDocsPlugin)
  univer.registerPlugin(UniverDocsUIPlugin)
  // register the sheets, if no webworker, then set notExecuteFormula to false
  univer.registerPlugin(UniverSheetsPlugin, { notExecuteFormula: false })
  univer.registerPlugin(UniverSheetsUIPlugin)

  // sheet feature plugins
  univer.registerPlugin(UniverSheetsNumfmtPlugin)
  univer.registerPlugin(UniverFormulaEnginePlugin, { notExecuteFormula: false })
  univer.registerPlugin(UniverSheetsFormulaPlugin, { notExecuteFormula: false })
  univer.registerPlugin(UniverSheetsFormulaUIPlugin)

  // zen model editor
  univer.registerPlugin(UniverSheetsZenEditorPlugin)

  // find replace
  univer.registerPlugin(UniverSheetsFindReplacePlugin)
  univer.registerPlugin(UniverFindReplacePlugin)

  // float image
  univer.registerPlugin(UniverDrawingPlugin)
  univer.registerPlugin(UniverDrawingUIPlugin)
  univer.registerPlugin(UniverSheetsDrawingPlugin)
  univer.registerPlugin(UniverSheetsDrawingUIPlugin)

  // filter plugin
  univer.registerPlugin(UniverSheetsFilterPlugin)
  univer.registerPlugin(UniverSheetsFilterUIPlugin)
  // mock lazy load
  setTimeout(() => {
  // hyperlink
    univer.registerPlugin(UniverSheetsHyperLinkPlugin)
    univer.registerPlugin(UniverSheetsHyperLinkUIPlugin)
  }, 500)

  // mock lazy load data validation
  setTimeout(() => {
    univer.registerPlugin(UniverDataValidationPlugin)
    univer.registerPlugin(UniverSheetsDataValidationPlugin)
  }, 500)

  // sort
  univer.registerPlugin(UniverSheetsSortPlugin)
  univer.registerPlugin(UniverSheetsSortUIPlugin)

  // condition formatting
  univer.registerPlugin(UniverSheetsConditionalFormattingPlugin)
  univer.registerPlugin(UniverSheetsConditionalFormattingUIPlugin)

  // highlight
  univer.registerPlugin(UniverSheetsCrosshairHighlightPlugin)

  // comment
  univer.registerPlugin(UniverThreadCommentUIPlugin, { overrides: [[IThreadCommentMentionDataService, { useClass: CustomMentionDataService }]] })
  univer.registerPlugin(UniverSheetsThreadCommentPlugin)

  const injector = univer.__getInjector()
  const userManagerService = injector.get(UserManagerService)
  userManagerService.setCurrentUser(mockUser)

  window.uSheetAPI = FUniver.newAPI(univer)

  return univer
}
