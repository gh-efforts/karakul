import { MaterialsInput } from '../../../services'
type Material = Pick<MaterialsInput, 'id' | 'amount' | 'material' | 'model' | 'action'>
type Remark = Pick<UpdateOrderMaterialsInput, 'attachment' | 'attachment_desc' | 'remark'>
