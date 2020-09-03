// 处理请求参数

type ParamsType = string | number | undefined | null | string[]

// query 筛选数字
function filterNumericalValue(val: number | string | null) {
  if (typeof val === 'number') {
    return val
  }
  if (typeof val === 'string') {
    const v = Number(val || 'string')
    return Number.isNaN(v) ? null : v
  }
  return null
}

// query 筛选数字
function filterNumericalParams(valArr: (number | string)[]) {
  return valArr.map(filterNumericalValue)
}

function filterStringValue(val: string | null) {
  if (typeof val === 'string') {
    return val.trim() || null
  }
  return null
}

// query 筛选字符串
function filterStringParams(valArr: string[]) {
  return valArr.map(filterStringValue)
}

// query 筛选分页参数
function filterPaginationValue(limit: ParamsType, start: ParamsType) {
  return [Number(limit) || 10, Number(start) || 0]
}

// 根据 count size 获取最后一页
function ceilLastPage(count: ParamsType, size: ParamsType) {
  return Math.ceil((Number(count) || 0 + 1) / (Number(size) || 10))
}

// 根据 [page, size] 获取 [start, limit, page, size]
function pageToStart(page: ParamsType, size: ParamsType) {
  const [_page, _size] = [Number(page) || 1, Number(size) || 10]

  return [(_page - 1) * _size, _size, _page, _size]
}

export {
  filterNumericalValue,
  filterNumericalParams,
  filterStringValue,
  filterStringParams,
  filterPaginationValue,
  ceilLastPage,
  pageToStart,
}
