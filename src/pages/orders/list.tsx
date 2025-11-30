import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table, Tag, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

export const OrderList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <div style={{ padding: "24px" }}>
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <List title="Orders">
          <Table
            {...tableProps}
            rowKey="orderId"
            style={{ marginTop: "16px" }}
            pagination={{
              ...tableProps.pagination,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} orders`,
            }}
          >
            <Table.Column
              dataIndex="orderId"
              title="Order ID"
              width={100}
              sorter
              render={(value) => (
                <Tag color="blue" style={{ fontWeight: 500 }}>
                  #{value}
                </Tag>
              )}
            />
            <Table.Column
              dataIndex={["user", "username"]}
              title="Customer"
              sorter
              render={(value, record: BaseRecord) => (
                <Space>
                  <ShoppingCartOutlined style={{ color: "#1890ff" }} />
                  <a
                    href={`/orders/show/${record.orderId}`}
                    style={{ fontWeight: 500, fontSize: "15px" }}
                  >
                    {value || record.user?.email || "N/A"}
                  </a>
                </Space>
              )}
            />
            <Table.Column
              dataIndex="totalAmount"
              title="Total Amount"
              sorter
              render={(value) => (
                <Tag color="green" style={{ fontSize: "14px" }}>
                  ${value?.toFixed(2)}
                </Tag>
              )}
            />
            <Table.Column
              dataIndex="orderStatus"
              title="Status"
              sorter
              render={(value) => {
                const colors: Record<string, string> = {
                  PENDING: "orange",
                  PROCESSING: "blue",
                  SHIPPED: "cyan",
                  DELIVERED: "green",
                  CANCELLED: "red",
                };
                return <Tag color={colors[value] || "default"}>{value}</Tag>;
              }}
            />
            <Table.Column
              dataIndex="orderDate"
              title="Order Date"
              sorter
              render={(value) => (
                <span>{value ? new Date(value).toLocaleDateString() : "N/A"}</span>
              )}
            />
            <Table.Column
              title="Actions"
              dataIndex="actions"
              width={150}
              fixed="right"
              render={(_, record: BaseRecord) => (
                <Space>
                  <EditButton hideText size="small" recordItemId={record.orderId} />
                  <ShowButton hideText size="small" recordItemId={record.orderId} />
                  <DeleteButton hideText size="small" recordItemId={record.orderId} />
                </Space>
              )}
            />
          </Table>
        </List>
      </Card>
    </div>
  );
};
