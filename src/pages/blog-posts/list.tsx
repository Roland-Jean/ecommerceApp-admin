import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useMany } from "@refinedev/core";
import { Space, Table, Tag, Avatar, Card, Input } from "antd";
import { FileTextOutlined, SearchOutlined } from "@ant-design/icons";

export const BlogPostList = () => {
  const { result, tableProps } = useTable({
    syncWithLocation: true,
  });

  const {
    result: { data: categories },
    query: { isLoading: categoryIsLoading },
  } = useMany({
    resource: "categories",
    ids: result?.data?.map((item) => item?.category?.id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!result?.data,
    },
  });

  const statusColorMap: Record<string, string> = {
    draft: "default",
    published: "success",
    rejected: "error",
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <List
          title="Blog Posts"
          headerButtons={({ defaultButtons }) => (
            <>
              <Input
                placeholder="Search posts..."
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
            rowKey="id"
            style={{ marginTop: "16px" }}
            pagination={{
              ...tableProps.pagination,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} posts`,
            }}
          >
            <Table.Column
              dataIndex="id"
              title="ID"
              width={70}
              sorter
              render={(value) => (
                <Tag color="blue" style={{ fontWeight: 500 }}>
                  #{value}
                </Tag>
              )}
            />
            <Table.Column
              dataIndex="title"
              title="Title"
              sorter
              render={(value, record: any) => (
                <Space>
                  <Avatar
                    icon={<FileTextOutlined />}
                    style={{ backgroundColor: "#1890ff" }}
                    size="small"
                  />
                  <a
                    href={`/blog-posts/show/${record.id}`}
                    style={{ fontWeight: 500 }}
                  >
                    {value || "Untitled"}
                  </a>
                </Space>
              )}
            />
            <Table.Column
              dataIndex="content"
              title="Content"
              render={(value: any) => {
                if (!value) return <span style={{ color: "#8c8c8c" }}>-</span>;
                return (
                  <MarkdownField
                    value={value.slice(0, 100) + (value.length > 100 ? "..." : "")}
                  />
                );
              }}
            />
            <Table.Column
              dataIndex="category"
              title="Category"
              width={150}
              render={(value) =>
                categoryIsLoading ? (
                  <Tag>Loading...</Tag>
                ) : (
                  <Tag color="purple" style={{ borderRadius: "6px" }}>
                    {categories?.find((item) => item.id === value?.id)?.title ||
                      "Uncategorized"}
                  </Tag>
                )
              }
            />
            <Table.Column
              dataIndex="status"
              title="Status"
              width={120}
              sorter
              render={(value: string) => (
                <Tag
                  color={statusColorMap[value?.toLowerCase()] || "default"}
                  style={{
                    borderRadius: "6px",
                    textTransform: "capitalize",
                    fontWeight: 500,
                  }}
                >
                  {value || "draft"}
                </Tag>
              )}
            />
            <Table.Column
              dataIndex="createdAt"
              title="Created At"
              width={150}
              sorter
              render={(value: any) => (
                <DateField value={value} format="MMM DD, YYYY" />
              )}
            />
            <Table.Column
              title="Actions"
              dataIndex="actions"
              width={120}
              fixed="right"
              render={(_, record: BaseRecord) => (
                <Space>
                  <EditButton hideText size="small" recordItemId={record.id} />
                  <ShowButton hideText size="small" recordItemId={record.id} />
                  <DeleteButton hideText size="small" recordItemId={record.id} />
                </Space>
              )}
            />
          </Table>
        </List>
      </Card>
    </div>
  );
};
