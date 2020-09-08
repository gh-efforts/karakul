import PapaParse from 'papaparse'
import { SAccessory } from './goods'

export function readFile(file: File, encoding = 'utf-8'): Promise<string> {
  const reader = new window.FileReader()

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort()
      reject(new DOMException('Error while reading file'))
    }
    reader.onload = e => {
      resolve(e.target?.result as string)
    }
    reader.readAsText(file, encoding)
  })
}

export function papaParse(content: string): Promise<PapaParse.ParseResult<unknown>> {
  return new Promise((resolve, reject) => {
    PapaParse.parse(content, {
      complete: function (result) {
        resolve(result)
      },
      error: function (error) {
        reject(error)
      },
    })
  })
}

// transfer ParseResult to SAccessory[]
function transfer(res: PapaParse.ParseResult<unknown>) {
  if (res.errors.length || res.data.length < 2) {
    // eslint-disable-next-line standard/no-callback-literal
    return [] as SAccessory[]
  }
  // 标记 id
  const now = new Date().getTime().toString()
  const headers = res.data[0] as string[]
  const keys = ['分类', '型号', '标示', '配件编号']
  const pos: { [p: string]: number } = {
    分类: 999,
    型号: 999,
    标示: 999,
    配件编号: 999,
  }

  // 获取 key 值对应的 index
  for (const k of keys) {
    const idx = headers.findIndex(h => h.includes(k))
    if (idx >= 0) {
      pos[k] = idx
    }
  }

  // 转换数据格式
  const transfered = res.data
    .map((o, i) => {
      // 排除错误数据 和 header 行
      if (!Array.isArray(o) || i === 0) {
        return null
      }

      // 排除空数据
      if (o[pos['分类']] || o[pos['型号']] || o[pos['标示']] || o[pos['配件编号']]) {
        return {
          id: `${now}-i-${i}`,
          material: { name: o[pos['分类']] },
          model: o[pos['型号']],
          label: o[pos['标示']],
          sn: o[pos['配件编号']],
        } as SAccessory
      }
      return null
    })
    .filter(Boolean) as SAccessory[]

  return transfered
}

/**
 * onlyCSV: 只使用 csv 数据
 *
 * append: 在原始数据末尾追加 csv 数据
 *
 * preferCSV: 根基 sn 码合并数据，sn 码相同时使用 CSV 中的数据 (其它信息可能不同)
 */
type MergeOption = 'onlyCSV' | 'append' | 'preferCSV' | 'preferPrevious'

// 获取 csv 数据
//
// https://github.com/Bunlong/react-papaparse/blob/master/src/CSVReader.tsx
export async function parseCsvDataToSAccessory(
  file: File,
  previousData: SAccessory[],
  mergeOption: MergeOption = 'onlyCSV'
) {
  try {
    const csvData = await readFile(file).then(papaParse)

    const newAccessories = transfer(csvData)

    if (mergeOption === 'preferCSV') {
      const csvSnList = newAccessories.map(v => v?.sn).filter(Boolean)
      const noDuplicatePreviouseData = previousData.filter(accessory => !csvSnList.includes(accessory.sn))
      return [...noDuplicatePreviouseData, ...newAccessories]
    }

    if (mergeOption === 'append') {
      return [...previousData, ...newAccessories]
    }

    if (mergeOption === 'preferPrevious') {
      const previousSnList = previousData.map(v => v?.sn).filter(Boolean)
      const noDuplicateCsvData = newAccessories.filter(accessory => !previousSnList.includes(accessory?.sn))
      return [...previousData, ...noDuplicateCsvData]
    }

    return newAccessories
  } catch {
    return previousData
  }
}
