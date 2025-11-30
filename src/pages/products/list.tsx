import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table, Tag, Avatar, Card } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

export const ProductList = () => {
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
        <List title="Products">
          <Table
            {...tableProps}
            rowKey="productId"
            style={{ marginTop: "16px" }}
            pagination={{
              ...tableProps.pagination,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} products`,
            }}
          >
            <Table.Column
              dataIndex="productId"
              title="ID"
              width={80}
              sorter
              render={(value) => (
                <Tag color="blue" style={{ fontWeight: 500 }}>
                  #{value}
                </Tag>
              )}
            />
            <Table.Column
              dataIndex="name"
              title="Product Name"
              sorter
              render={(value, record: BaseRecord) => (
                <Space>
                  {record.imageUrl ? (
                    <Avatar src={record.imageUrl} size="small" />
                  ) : (
                    <Avatar icon={<ShoppingOutlined />} size="small" style={{ backgroundColor: "#4facfe" }} />
                  )}
                  <a
                    href={`/products/show/${record.productId}`}
                    style={{ fontWeight: 500, fontSize: "15px" }}
                  >
                    {value || "Untitled Product"}
                  </a>
                </Space>
              )}
            />
            <Table.Column
              dataIndex="price"
              title="Price"
              sorter
              render={(value) => (
                <Tag color="green" style={{ fontSize: "14px" }}>
                  ${value?.toFixed(2)}
                </Tag>
              )}
            />
            <Table.Column
              dataIndex="stockQuantity"
              title="Stock"
              sorter
              render={(value, record: BaseRecord) => {
                const stockValue = value !== undefined ? value : record.stock;
                return (
                  <Tag color={stockValue > 10 ? "success" : stockValue > 0 ? "warning" : "error"}>
                    {stockValue} units
                  </Tag>
                );
              }}
            />
            <Table.Column
              dataIndex="category"
              title="Category"
              render={(category: any[]) => (
                <>
                  {category && category.length > 0 ? (
                    category.map((cat: any) => (
                      <Tag key={cat.categoryId} color="purple">
                        {cat.name || `Category ${cat.categoryId}`}
                      </Tag>
                    ))
                  ) : (
                    <Tag color="default">N/A</Tag>
                  )}
                </>
              )}
            />
            <Table.Column
              dataIndex="badge"
              title="Badge"
              render={(value) => (
                <Tag color="gold">{value || "N/A"}</Tag>
              )}
            />
            <Table.Column
              dataIndex="rating"
              title="Rating"
              sorter
              render={(value) => (
                <Tag color="cyan">{value ? `⭐ ${value}` : "N/A"}</Tag>
              )}
            />
            <Table.Column
              dataIndex="isActive"
              title="Status"
              render={(value) => (
                <Tag color={value ? "success" : "default"}>
                  {value ? "Active" : "Inactive"}
                </Tag>
              )}
            />
            <Table.Column
              title="Actions"
              dataIndex="actions"
              width={150}
              fixed="right"
              render={(_, record: BaseRecord) => (
                <Space>
                  <EditButton hideText size="small" recordItemId={record.productId} />
                  <ShowButton hideText size="small" recordItemId={record.productId} />
                  <DeleteButton hideText size="small" recordItemId={record.productId} />
                </Space>
              )}
            />
          </Table>
        </List>
      </Card>
    </div>
  );
};
