import { OrderMaterialHistory } from '../../services'
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
  'id' | 'createdAt' | 'content' | 'updatedAt' | 'remark' | 'user' | 'attachment_desc' | 'attachment' | 'order_id'
>

export { MaterialHistory, MaterialHistories, HistoryInfo }
