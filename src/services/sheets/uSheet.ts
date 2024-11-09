import type { Nullable } from '@univerjs/core'
// import type { IUniverRPCMainThreadConfig } from '@univerjs/rpc'
import type { IThreadCommentMentionDataSource } from '@univerjs/thread-comment-ui'
import type { IUniverUIConfig } from '@univerjs/ui'
import { univerLocales } from '@/locales'
import { LocaleType, Univer, UserManagerService } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'

import { FUniver } from '@univerjs/facade'
// import { UniverRPCMainThreadPlugin } from '@univerjs/rpc'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsConditionalFormattingPlugin } from '@univerjs/sheets-conditional-formatting'
import { UniverSheetsConditionalFormattingUIPlugin } from '@univerjs/sheets-conditional-formatting-ui'
import { UniverSheetsDataValidationPlugin } from '@univerjs/sheets-data-validation'
import { UniverSheetsDrawingUIPlugin } from '@univerjs/sheets-drawing-ui'
import { UniverSheetsFilterPlugin } from '@univerjs/sheets-filter'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsHyperLinkUIPlugin } from '@univerjs/sheets-hyper-link-ui'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsSortUIPlugin } from '@univerjs/sheets-sort-ui'
import { UniverSheetsThreadCommentPlugin } from '@univerjs/sheets-thread-comment'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { IThreadCommentMentionDataService, UniverThreadCommentUIPlugin } from '@univerjs/thread-comment-ui'
import { UniverUIPlugin } from '@univerjs/ui'

export function sheetInit(option: IUniverUIConfig) {
  const univer = new Univer({
    theme: defaultTheme,
    locale: LocaleType.ZH_CN,
    locales: univerLocales,
  })

  // univer.registerPlugin(UniverRPCMainThreadPlugin, {
  //   workerURL: new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }),
  // } as IUniverRPCMainThreadConfig)

  univer.registerPlugin(UniverDocsPlugin)
  univer.registerPlugin(UniverRenderEnginePlugin)
  univer.registerPlugin(UniverUIPlugin, option)
  univer.registerPlugin(UniverDocsUIPlugin)
  univer.registerPlugin(UniverSheetsPlugin, { notExecuteFormula: true })
  univer.registerPlugin(UniverSheetsUIPlugin)

  // sheet feature plugins
  univer.registerPlugin(UniverSheetsNumfmtPlugin)
  univer.registerPlugin(UniverSheetsZenEditorPlugin)
  univer.registerPlugin(UniverFormulaEnginePlugin, { notExecuteFormula: true })
  univer.registerPlugin(UniverSheetsFormulaPlugin, { notExecuteFormula: true })
  // filter plugin
  univer.registerPlugin(UniverSheetsFilterPlugin)
  // mock lazy load
  setTimeout(() => {
  // hyperlink
    univer.registerPlugin(UniverSheetsHyperLinkUIPlugin)
  }, 500)

  // mock lazy load data validation
  setTimeout(() => {
    univer.registerPlugin(UniverSheetsDataValidationPlugin)
  }, 500)

  // sort
  univer.registerPlugin(UniverSheetsSortUIPlugin)
  // condition formatting
  univer.registerPlugin(UniverSheetsConditionalFormattingPlugin)
  univer.registerPlugin(UniverSheetsConditionalFormattingUIPlugin)

  // drawing
  univer.registerPlugin(UniverSheetsDrawingUIPlugin)

  const mockUser = {
    userID: 'Owner_qxVnhPbQ',
    name: 'Owner',
    avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAInSURBVHgBtZU9TxtBEIbfWRzFSIdkikhBSqRQkJqkCKTCFkqVInSUSaT0wC8w/gXxD4gU2nRJkXQWhAZowDUUWKIwEgWWbEEB3mVmx3dn4DA2nB/ppNuPeWd29mMIPXDr+RxwtgRHeW6+guNPRxogqnL7Dwz9psJ27S4NShaeZTH3kwXy6I81dlRKcmRui88swdq9AcSFL7Buz1Vmlns64MiLsCjzwnIYHLH57tbfFbs7KRaXyEU8FVZofqccOfA5l7Q8LPIkGrwnb2RPNEXWFVMUF3L+kDCk0btDDAMzOm5YfAHDwp4tG74wnzAsiOYMnJ3GoDybA7IT98/jm5+JNnfiIzAS6LlqHQBN/i6b2t/cV1Hh6BfwYlHnHP4AXi5q/8kmMMpOs8+BixZw/Fd6xUEHEbnkgclvQP2fGp7uShRKnQ3G32rkjV1th8JhIGG7tR/JyjGteSOZELwGMmNqIIigRCLRh2OZIE6BjItdd7pCW6Uhm1zzkUtungSxwEUzNpQ+GQumtH1ej1MqgmNT6vwmhCq5yuwq56EYTbgeQUz3yvrpV1b4ok3nYJ+eYhgYmjRUqErx2EDq0Fr8FhG++iqVGqxlUJI/70Ar0UgJaWHj6hYVHJrfKssAHot1JfqwE9WVWzXZVd5z2Ws/4PnmtEjkXeKJDvxUecLbWOXH/DP6QQ4J72NS0adedp1aseBfXP8odlZFfPvBF7SN/8hky1TYuPOAXAEipMx15u5ToAAAAABJRU5ErkJggg==',
    anonymous: false,
    canBindAnonymous: false,
  }

  class CustomMentionDataService implements IThreadCommentMentionDataService {
    dataSource: Nullable<IThreadCommentMentionDataSource>
    trigger: string = '@'

    async getMentions() {
      return [
        {
          id: mockUser.userID,
          label: mockUser.name,
          type: 'user',
          icon: mockUser.avatar,
        },
        {
          id: '2',
          label: 'User2',
          type: 'user',
          icon: mockUser.avatar,
        },
      ]
    }
  }

  // comment
  univer.registerPlugin(UniverThreadCommentUIPlugin, { overrides: [[IThreadCommentMentionDataService, { useClass: CustomMentionDataService }]] })
  univer.registerPlugin(UniverSheetsThreadCommentPlugin)

  const injector = univer.__getInjector()
  const userManagerService = injector.get(UserManagerService)
  userManagerService.setCurrentUser(mockUser)

  // create univer sheet instance
  // univer.createUnit(UniverInstanceType.UNIVER_SHEET, {})

  window.uSheetAPI = FUniver.newAPI(univer)

  return univer
}
