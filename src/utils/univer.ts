import { LocaleType, Tools, Univer } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsFormulaUIPlugin } from '@univerjs/sheets-formula-ui'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverUIPlugin } from '@univerjs/ui'
import DesignEnUS from '@univerjs/design/locale/en-US'
import UIEnUS from '@univerjs/ui/locale/en-US'
import DocsUIEnUS from '@univerjs/docs-ui/locale/en-US'
import SheetsEnUS from '@univerjs/sheets/locale/en-US'
import SheetsUIEnUS from '@univerjs/sheets-ui/locale/en-US'
import SheetsFormulaUIEnUS from '@univerjs/sheets-formula-ui/locale/en-US'
import DesignZhCN from '@univerjs/design/locale/zh-CN'
import UIZhCN from '@univerjs/ui/locale/zh-CN'
import DocsUIZhCN from '@univerjs/docs-ui/locale/zh-CN'
import SheetsZhCN from '@univerjs/sheets/locale/zh-CN'
import SheetsUIZhCN from '@univerjs/sheets-ui/locale/zh-CN'
import SheetsFormulaUIZhCN from '@univerjs/sheets-formula-ui/locale/zh-CN'
import '@univerjs/design/lib/index.css'
import '@univerjs/ui/lib/index.css'
import '@univerjs/docs-ui/lib/index.css'
import '@univerjs/sheets-ui/lib/index.css'
import '@univerjs/sheets-formula-ui/lib/index.css'

export function init(option: any) {
  const univer = new Univer({
    theme: defaultTheme,
    locale: LocaleType.ZH_CN,
    locales: {
      [LocaleType.EN_US]: Tools.deepMerge(
        SheetsEnUS,
        DocsUIEnUS,
        SheetsUIEnUS,
        SheetsFormulaUIEnUS,
        UIEnUS,
        DesignEnUS,
      ),
      [LocaleType.ZH_CN]: Tools.deepMerge(
        SheetsZhCN,
        DocsUIZhCN,
        SheetsUIZhCN,
        SheetsFormulaUIZhCN,
        UIZhCN,
        DesignZhCN,
      ),
    },
  })

  univer.registerPlugin(UniverRenderEnginePlugin)
  univer.registerPlugin(UniverFormulaEnginePlugin)

  univer.registerPlugin(UniverUIPlugin, option)

  univer.registerPlugin(UniverDocsPlugin)
  univer.registerPlugin(UniverDocsUIPlugin)

  univer.registerPlugin(UniverSheetsPlugin)
  univer.registerPlugin(UniverSheetsUIPlugin)
  univer.registerPlugin(UniverSheetsFormulaPlugin)
  univer.registerPlugin(UniverSheetsFormulaUIPlugin)
  return univer
}
