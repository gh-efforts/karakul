import gql from 'graphql-tag'
export const OrderHistoryFragmentDoc = gql`
  fragment orderHistory on OrderMaterialHistory {
    id
    createdAt
    updatedAt
    order_id {
      id
    }
    remark
    attachment_desc
    content
    user {
      username
    }
  }
`
export const OrderFragmentDoc = gql`
  fragment order on Order {
    id
    name
    createdAt
    updatedAt
    detail
    amount
    delivery_time
    user {
      username
    }
  }
`
export const UploadDocument = gql`
  mutation Upload($refId: ID, $ref: String, $field: String, $source: String, $file: Upload!) {
    upload(refId: $refId, ref: $ref, field: $field, source: $source, file: $file) {
      id
      _id
      createdAt
      updatedAt
      name
      alternativeText
      caption
      width
      height
      formats
      hash
      ext
      mime
      size
      url
      httpUrl
      previewUrl
      provider
      provider_metadata
    }
  }
`
export const MultipleUploadDocument = gql`
  mutation MultipleUpload($refId: ID, $ref: String, $field: String, $source: String, $files: [Upload]!) {
    multipleUpload(refId: $refId, ref: $ref, field: $field, source: $source, files: $files) {
      id
      _id
      createdAt
      updatedAt
      name
      alternativeText
      caption
      width
      height
      formats
      hash
      ext
      mime
      size
      url
      httpUrl
      previewUrl
      provider
      provider_metadata
    }
  }
`
export const GoodsOrdersDocument = gql`
  query GoodsOrders($limit: Int, $start: Int, $where: JSON) {
    orders: ordersConnection(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
      values {
        id
        name
      }
      aggregate {
        count
        totalCount
      }
    }
  }
`
export const OrderCommoditiesDocument = gql`
  query OrderCommodities($id: ID!) {
    order(id: $id) {
      id
      commodities(start: 0, limit: 1000, sort: "createdAt:desc") {
        id
        code
        commodity_type {
          id
          name
        }
        warehouse {
          name
          id
        }
        destination
        createdAt
        user {
          username
        }
        accessories
      }
    }
  }
`
export const OrderCommoditiesSimpleDocument = gql`
  query OrderCommoditiesSimple($id: ID!, $start: Int, $limit: Int, $state: ENUM_COMMODITY_STATE) {
    commodities: commoditiesConnection(start: $start, limit: $limit, where: { order: $id, state: $state }) {
      values {
        id
        code
        commodity_type {
          id
          name
        }
        destination
        warehouse {
          name
          id
        }
      }
      aggregate {
        count
        totalCount
      }
    }
  }
`
export const CommodityTypesSelectDocument = gql`
  query CommodityTypesSelect {
    types: commodityTypes(start: 0, limit: 1000) {
      id
      name
    }
  }
`
export const WarehousesSelectDocument = gql`
  query WarehousesSelect {
    pos: warehouses(start: 0, limit: 1000) {
      id
      name
    }
  }
`
export const CommodityExWarehouseDocument = gql`
  mutation CommodityExWarehouse($input: outboundCommodityInput) {
    commodities: outboundCommodity(input: $input) {
      data
    }
  }
`
export const CommoditiesDocument = gql`
  query Commodities($sort: String, $limit: Int, $start: Int, $where: JSON) {
    commodities(sort: $sort, limit: $limit, start: $start, where: $where) {
      id
      accessories
    }
  }
`
export const CreateCommodityDocument = gql`
  mutation CreateCommodity($data: CommodityInput) {
    res: createCommodity(input: { data: $data }) {
      commodity {
        id
      }
    }
  }
`
export const UpdateCommodityDocument = gql`
  mutation UpdateCommodity($id: ID!, $data: editCommodityInput) {
    res: updateCommodity(input: { where: { id: $id }, data: $data }) {
      commodity {
        id
      }
    }
  }
`
export const ExWarehouseHistoryDocument = gql`
  query ExWarehouseHistory($limit: Int, $start: Int, $orderId: ID) {
    commodities: commoditiesConnection(
      sort: "createdAt:desc"
      limit: $limit
      start: $start
      where: { order: $orderId, state: "out" }
    ) {
      values {
        id
        code
        destination
        delivery_time
        user {
          username
        }
        outbound_user {
          username
        }
      }
      aggregate {
        count
      }
    }
  }
`
export const CommoditiesInWarehouseDocument = gql`
  query CommoditiesInWarehouse($limit: Int, $start: Int, $orderId: ID) {
    commodities: commoditiesConnection(
      sort: "createdAt:desc"
      limit: $limit
      start: $start
      where: { order: $orderId, state: "in" }
    ) {
      values {
        id
        code
        commodity_type {
          name
        }
        warehouse {
          name
        }
        createdAt
        user {
          username
        }
      }
      aggregate {
        count
      }
    }
  }
`
export const OmHrysDocument = gql`
  query OMHrys($limit: Int, $start: Int, $where: JSON) {
    hrys: orderMaterialHistories(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
      ...orderHistory
    }
  }
  ${OrderHistoryFragmentDoc}
`
export const OmHryDocument = gql`
  query OMHry($id: ID!) {
    hry: orderMaterialHistory(id: $id) {
      ...orderHistory
    }
  }
  ${OrderHistoryFragmentDoc}
`
export const OrderMaterialsDocument = gql`
  query OrderMaterials($limit: Int, $start: Int, $where: JSON) {
    orderMaterials(limit: $limit, start: $start, where: $where, sort: "createdAt:desc") {
      id
      createdAt
      updatedAt
      order_id {
        id
      }
      material
      amount
      model
      user {
        id
        username
      }
    }
  }
`
export const OrderMaterialsConnectionDocument = gql`
  query OrderMaterialsConnection($limit: Int, $start: Int, $where: JSON) {
    orderMaterialsConnection(limit: $limit, start: $start, where: $where, sort: "createdAt:desc") {
      values {
        id
        createdAt
        updatedAt
        order_id {
          id
        }
        material
        amount
        model
        user {
          id
          username
        }
      }
      aggregate {
        count
      }
    }
  }
`
export const CreateOrderMaterialsDocument = gql`
  mutation CreateOrderMaterials($input: CreateOrderMaterialsInput) {
    batchCreateMaterials(input: $input) {
      order_id
    }
  }
`
export const UpdateOrderMaterialsDocument = gql`
  mutation UpdateOrderMaterials($input: UpdateOrderMaterialsInput) {
    batchUpdateMaterials(input: $input) {
      order_id
    }
  }
`
export const OrderMaterialHistoriesConnectionDocument = gql`
  query OrderMaterialHistoriesConnection($limit: Int, $start: Int, $id: ID) {
    orderMaterialHistoriesConnection(limit: $limit, start: $start, where: { order_id: $id }, sort: "createdAt:desc") {
      values {
        id
        createdAt
        updatedAt
        remark
        user {
          username
        }
        attachment_desc
        content
        attachment {
          id
          url
          ext
          name
        }
      }
      aggregate {
        count
      }
    }
  }
`
export const MaterialsDocument = gql`
  query Materials {
    materials(limit: 1000, start: 0) {
      id
      name
    }
  }
`
export const OrdersDocument = gql`
  query Orders($limit: Int, $start: Int, $where: JSON) {
    orders(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
      ...order
    }
  }
  ${OrderFragmentDoc}
`
export const OrderDocument = gql`
  query Order($id: ID!) {
    order(id: $id) {
      ...order
    }
  }
  ${OrderFragmentDoc}
`
export const OrdersConnectionDocument = gql`
  query OrdersConnection($limit: Int, $start: Int, $where: JSON) {
    ordersConnection(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
      values {
        ...order
      }
      aggregate {
        count
      }
    }
  }
  ${OrderFragmentDoc}
`
export const CreateOrderDocument = gql`
  mutation CreateOrder($data: OrderInput) {
    createNewOrder(input: { data: $data }) {
      order {
        ...order
      }
    }
  }
  ${OrderFragmentDoc}
`
export const UpdateOrderDocument = gql`
  mutation UpdateOrder($id: ID!, $data: editOrderInput) {
    updateOldOrder(input: { where: { id: $id }, data: $data }) {
      order {
        ...order
      }
    }
  }
  ${OrderFragmentDoc}
`
export const OrderHistoriesConnectionDocument = gql`
  query OrderHistoriesConnection($limit: Int, $start: Int, $id: ID!) {
    orderHistoriesConnection(sort: "createdAt:desc", limit: $limit, start: $start, where: { order: $id }) {
      values {
        id
        createdAt
        updatedAt
        detail
        amount
        delivery_time
        order {
          id
          name
        }
        user {
          username
        }
      }
      aggregate {
        count
      }
    }
  }
`
export const CommodityTypesDocument = gql`
  query CommodityTypes($limit: Int, $start: Int, $where: JSON) {
    commodityTypesConnection(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
      values {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
      aggregate {
        count
      }
    }
  }
`
export const CreateCommodityTypeDocument = gql`
  mutation CreateCommodityType($data: CommodityTypeInput) {
    createCommodityType(input: { data: $data }) {
      commodityType {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
    }
  }
`
export const UpdateCommodityTypeDocument = gql`
  mutation UpdateCommodityType($id: ID!, $data: editCommodityTypeInput) {
    updateCommodityType(input: { where: { id: $id }, data: $data }) {
      commodityType {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
    }
  }
`
export const DeleteCommodityTypeDocument = gql`
  mutation DeleteCommodityType($id: ID!) {
    deleteCommodityType(input: { where: { id: $id } }) {
      commodityType {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
    }
  }
`
export const WarehousesDocument = gql`
  query Warehouses($limit: Int, $start: Int, $where: JSON) {
    warehousesConnection(sort: "createdAt:desc", limit: $limit, start: $start, where: $where) {
      values {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
      aggregate {
        count
      }
    }
  }
`
export const CreateWarehouseDocument = gql`
  mutation CreateWarehouse($data: WarehouseInput) {
    createWarehouse(input: { data: $data }) {
      warehouse {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
    }
  }
`
export const DeleteWarehouseDocument = gql`
  mutation DeleteWarehouse($id: ID!) {
    deleteWarehouse(input: { where: { id: $id } }) {
      warehouse {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
    }
  }
`
export const UpdateWarehouseDocument = gql`
  mutation UpdateWarehouse($id: ID!, $data: editWarehouseInput) {
    updateWarehouse(input: { where: { id: $id }, data: $data }) {
      warehouse {
        id
        createdAt
        updatedAt
        name
        user {
          id
          username
        }
      }
    }
  }
`
