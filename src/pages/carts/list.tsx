import {
  DeleteButton,
  List,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table, Tag, Avatar, Card, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

export const CartList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    resource: "carts/products",
  });

  return (
    <div style={{ padding: "24px" }}>
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <List 
          title="Shopping Carts"
          headerButtons={({ defaultButtons }) => (
            <>
              {defaultButtons}
              <Button type="primary" danger>
                Clear All Carts
              </Button>
            </>
          )}
        >
          <Table
            {...tableProps}
            rowKey="cartId"
            style={{ marginTop: "16px" }}
            pagination={{
              ...tableProps.pagination,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} cart items`,
            }}
          >
            <Table.Column
              dataIndex="cartId"
              title="Cart ID"
              width={80}
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
                  <Avatar icon={<ShoppingCartOutlined />} size="small" style={{ backgroundColor: "#ff7a45" }} />
                  <span style={{ fontWeight: 500 }}>
                    {value || record.user?.email || "N/A"}
                  </span>
                </Space>
              )}
            />
            <Table.Column
              dataIndex={["product", "name"]}
              title="Product"
              render={(value, record: BaseRecord) => (
                <Space>
                  {record.product?.imageUrl && (
                    <Avatar src={record.product.imageUrl} size="small" />
                  )}
                  <span>{value || "N/A"}</span>
                </Space>
              )}
            />
            <Table.Column
              dataIndex="quantity"
              title="Quantity"
              sorter
              render={(value) => (
                <Tag color="purple">{value} items</Tag>
              )}
            />
            <Table.Column
              dataIndex={["product", "price"]}
              title="Price"
              render={(value) => (
                <Tag color="green">${value?.toFixed(2)}</Tag>
              )}
            />
            <Table.Column
              title="Total"
              render={(_, record: BaseRecord) => {
                const total = (record.quantity || 0) * (record.product?.price || 0);
                return (
                  <Tag color="green" style={{ fontSize: "14px", fontWeight: "bold" }}>
                    ${total.toFixed(2)}
                  </Tag>
                );
              }}
            />
            <Table.Column
              title="Actions"
              dataIndex="actions"
              width={100}
              fixed="right"
              render={(_, record: BaseRecord) => (
                <Space>
                  <DeleteButton 
                    hideText 
                    size="small" 
                    recordItemId={record.cartId}
                    resource="carts"
                  />
                </Space>
              )}
            />
          </Table>
        </List>
      </Card>
    </div>
  );
};
