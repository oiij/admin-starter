import { saveAs } from 'file-saver'
import { isFunction } from 'mixte'
import { utils, write } from 'xlsx'

type Data = Record<string, unknown>
interface Head<T extends Data> { key: keyof T, title: string, transform?: Transform<T> }
interface TransformParam<T extends Data> {
  rawValue: T[Head<T>['key']]
  rawRow: T
  rawRowIndex: number
  head: Head<T>
  headIndex: number
}
type Transform<T extends Data> = (params: TransformParam<T>) => T[Head<T>['key']]
export function useSheets() {
  function transform<T extends Data>(data: T[], head: Head<T>[]) {
    const result: unknown[][] = []
    result.push(head.map(m => m.title))
    data.forEach((d, i) => {
      const item: unknown[] = []
      head.forEach((h, hi) => {
        const value = d[h.key]
        if (h.transform && isFunction(h.transform)) {
          const result = h.transform({
            rawValue: value,
            rawRow: d,
            rawRowIndex: i,
            head: h,
            headIndex: hi,
          })
          return item.push(result)
        }

        return item.push(value)
      })
      result.push(item)
    })
    return result
  }
  function json2XLS(data: unknown[]) {
    const type = 'application/vnd.ms-excel'
    const ws = utils.json_to_sheet(data, {
      skipHeader: true,
    })
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Sheet1')
    const buffer = write(wb, { bookType: 'xls', type: 'array' })
    return new Blob([buffer], { type })
  }
  function json2XLSX(data: unknown[]) {
    const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const ws = utils.json_to_sheet(data, {
      skipHeader: true,
    })
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Sheet1')
    const buffer = write(wb, { bookType: 'xlsx', type: 'array' })
    return new Blob([buffer], { type })
  }
  function json2CSV(data: unknown[]) {
    const type = 'text/plain;charset=UTF-8'
    const ws = utils.json_to_sheet(data, {
      skipHeader: true,
    })
    const buffer = utils.sheet_to_csv(ws)
    return new Blob([buffer], { type })
  }
  function exportSheet(data: unknown[], fileName: string, type: 'xls' | 'xlsx' | 'csv') {
    switch (type) {
      case 'xls':
        return saveAs(json2XLS(data), `${fileName}.${type}`)
        break
      case 'xlsx':
        return saveAs(json2XLSX(data), `${fileName}.${type}`)
        break
      case 'csv':
        return saveAs(json2CSV(data), `${fileName}.${type}`)
        break

      default:
        break
    }
  }
  function json2Sheet<T extends Data>(data: T[], head: Head<T>[], fileName: string, type: 'xls' | 'xlsx' | 'csv') {
    return exportSheet(transform(data, head), fileName, type)
  }
  return {
    transform,
    json2XLS,
    json2XLSX,
    json2CSV,
    exportSheet,
    json2Sheet,
  }
}
