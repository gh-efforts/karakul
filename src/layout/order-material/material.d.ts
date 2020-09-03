import { MaterialsInput } from '../../../services'
export type Material = Pick<MaterialsInput, 'id' | 'amount' | 'material' | 'model' | 'action'>
