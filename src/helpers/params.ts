// 处理请求参数

type ParamsType = string | number | undefined | null | string[]

// 根据 [page, size] 获取 [start, limit, page, size]
function pageToStart(page: ParamsType, size: ParamsType) {
  const [_page, _size] = [Number(page) || 1, Number(size) || 10]

  return [(_page - 1) * _size, _size, _page, _size]
}

export { pageToStart }
