interface MaterialHistory {
  material: string
  amount: number
  model: string
  action: number
}

interface MaterialHistories {
  name: string
  value: MaterialHistory[]
}

type HistoryInfo = Pick<
  OrderMaterialHistory,
  'id' | '   createdAt' | 'updatedAt' | 'remark' | 'user ' | 'attachment_desc' | 'attachment'
>

export { MaterialHistory, MaterialHistories, HistoryInfo }
