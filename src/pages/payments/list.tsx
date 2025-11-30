import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table, Tag, Card } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";

export const PaymentList = () => {
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
        <List title="Payments">
          <Table
            {...tableProps}
            rowKey="paymentId"
            style={{ marginTop: "16px" }}
            pagination={{
              ...tableProps.pagination,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} payments`,
            }}
          >
            <Table.Column
              dataIndex="paymentId"
              title="Payment ID"
              width={100}
              sorter
              render={(value) => (
                <Tag color="blue" style={{ fontWeight: 500 }}>
                  #{value}
                </Tag>
              )}
            />
            <Table.Column
              dataIndex={["order", "orderId"]}
              title="Order ID"
              sorter
              render={(value) => (
                <Space>
                  <CreditCardOutlined style={{ color: "#1890ff" }} />
                  <a
                    href={`/orders/show/${value}`}
                    style={{ fontWeight: 500 }}
                  >
                    Order #{value}
                  </a>
                </Space>
              )}
            />
            <Table.Column
              dataIndex="amount"
              title="Amount"
              sorter
              render={(value) => (
                <Tag color="green" style={{ fontSize: "14px" }}>
                  ${value?.toFixed(2)}
                </Tag>
              )}
            />
            <Table.Column
              dataIndex="paymentMethod"
              title="Payment Method"
              sorter
              render={(value) => {
                const colors: Record<string, string> = {
                  CREDIT_CARD: "blue",
                  DEBIT_CARD: "cyan",
                  PAYPAL: "purple",
                  CASH: "green",
                  BANK_TRANSFER: "orange",
                };
                return <Tag color={colors[value] || "default"}>{value}</Tag>;
              }}
            />
            <Table.Column
              dataIndex="paymentStatus"
              title="Status"
              sorter
              render={(value) => {
                const colors: Record<string, string> = {
                  PENDING: "orange",
                  COMPLETED: "green",
                  FAILED: "red",
                  REFUNDED: "purple",
                };
                return <Tag color={colors[value] || "default"}>{value}</Tag>;
              }}
            />
            <Table.Column
              dataIndex="paymentDate"
              title="Payment Date"
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
                  <EditButton hideText size="small" recordItemId={record.paymentId} />
                  <ShowButton hideText size="small" recordItemId={record.paymentId} />
                  <DeleteButton hideText size="small" recordItemId={record.paymentId} />
                </Space>
              )}
            />
          </Table>
        </List>
      </Card>
    </div>
  );
};
