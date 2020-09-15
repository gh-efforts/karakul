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

export { MaterialHistory, MaterialHistories }
