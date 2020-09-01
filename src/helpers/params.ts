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

function filterNumericalParams(valArr: (number | string)[]) {
  return valArr.map(filterNumericalValue)
}

function filterStringValue(val: string | null) {
  if (typeof val === 'string') {
    return val.trim() || null
  }
  return null
}

function filterStringParams(valArr: string[]) {
  return valArr.map(filterStringValue)
}

function filterPaginationValue(
  limit: string | number | undefined | null | string[],
  start: string | number | undefined | null | string[]
) {
  return [Number(limit) || 10, Number(start) || 1]
}

function ceilLastPage(count: string | number | undefined | null, size: string | number | undefined | null | string[]) {
  return Math.ceil((Number(count) || 0 + 1) / (Number(size) || 10))
}

export {
  filterNumericalValue,
  filterNumericalParams,
  filterStringValue,
  filterStringParams,
  filterPaginationValue,
  ceilLastPage,
}
