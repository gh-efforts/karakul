import { Table, Pagination } from "antd";
import { ColumnProps } from "antd/lib/table";
import { TableRowSelection } from "antd/lib/table/interface";
import styles from "./index.module.scss";
interface DataTableProps<T extends object = any> {
  data: T[];
  loading?: boolean;
  columns: ColumnProps<T>[];
  isEmpty?: boolean;
  total: number;
  currentPage: number;
  onPageChange?: (page: number, size?: number | undefined) => void;
  onTableChange?: (page: any, filter: any, sorter: any) => void;
  pageSize?: number;
  rowSelection?: TableRowSelection<T>;
  onRow?: (record: T, index?: number) => React.HTMLAttributes<HTMLElement>;
  onShowSizeChange?: ((current: number, size: number) => void) | undefined;
  footerslot?: React.ReactElement;
  minWidth?: string;
}
function KTable<T extends object = any>(
  props: DataTableProps<T>
): React.ReactElement {
  const { data, total, pageSize, currentPage } = props;
  return (
    <div className={styles["table-page"]}>
      <Table<T>
        {...props}
        dataSource={data}
        className={styles.table}
        pagination={false}
        rowKey={(_item, _index) => "tableRow" + _index}
      />
      <div className={styles.pagination}>
        <span>共{total}条记录</span>
        <Pagination
          total={total}
          showSizeChanger
          pageSize={pageSize ?? 20}
          current={currentPage ?? 1}
        />
      </div>
    </div>
  );
}

export default KTable;
