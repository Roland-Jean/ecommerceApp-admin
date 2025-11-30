import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table, Tag, Avatar, Card, Input } from "antd";
import { TagsOutlined, SearchOutlined } from "@ant-design/icons";

export const CategoryList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const categoryColors = [
    "#667eea",
    "#764ba2",
    "#f093fb",
    "#4facfe",
    "#43e97b",
    "#fa709a",
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <List
          title="Categories"
          headerButtons={({ defaultButtons }) => (
            <>
              <Input
                placeholder="Search categories..."
                prefix={<SearchOutlined />}
                style={{
                  width: 300,
                  borderRadius: "8px",
                  marginRight: "16px",
                }}
              />
              {defaultButtons}
            </>
          )}
        >
          <Table
            {...tableProps}
            rowKey="categoryId"
            style={{ marginTop: "16px" }}
            pagination={{
              ...tableProps.pagination,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} categories`,
            }}
          >
            <Table.Column
              dataIndex="categoryId"
              title="ID"
              width={100}
              sorter
              render={(value) => (
                <Tag color="blue" style={{ fontWeight: 500 }}>
                  #{value}
                </Tag>
              )}
            />
            <Table.Column
              dataIndex="name"
              title="Category Name"
              sorter
              render={(value, record: BaseRecord, index: number) => (
                <Space>
                  {record.imageUrl ? (
                    <Avatar
                      src={record.imageUrl}
                      size="small"
                    />
                  ) : (
                    <Avatar
                      icon={<TagsOutlined />}
                      style={{
                        backgroundColor: categoryColors[index % categoryColors.length],
                      }}
                      size="small"
                    />
                  )}
                  <a
                    href={`/categories/show/${record.categoryId}`}
                    style={{ fontWeight: 500, fontSize: "15px" }}
                  >
                    {value || "Untitled Category"}
                  </a>
                </Space>
              )}
            />
            <Table.Column
              dataIndex="description"
              title="Description"
              ellipsis
              render={(value) => (
                <span style={{ color: "#666" }}>
                  {value || "No description"}
                </span>
              )}
            />
            <Table.Column
              title="Actions"
              dataIndex="actions"
              width={150}
              fixed="right"
              render={(_, record: BaseRecord) => (
                <Space>
                  <EditButton hideText size="small" recordItemId={record.categoryId} />
                  <ShowButton hideText size="small" recordItemId={record.categoryId} />
                  <DeleteButton hideText size="small" recordItemId={record.categoryId} />
                </Space>
              )}
            />
          </Table>
        </List>
      </Card>
    </div>
  );
};
