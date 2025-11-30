import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table, Tag, Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const UserList = () => {
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
        <List title="Users">
          <Table
            {...tableProps}
            rowKey="userId"
            style={{ marginTop: "16px" }}
            pagination={{
              ...tableProps.pagination,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} users`,
            }}
          >
            <Table.Column
              dataIndex="userId"
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
              dataIndex="username"
              title="Username"
              sorter
              render={(value, record: BaseRecord) => (
                <Space>
                  <Avatar icon={<UserOutlined />} size="small" style={{ backgroundColor: "#87d068" }} />
                  <a
                    href={`/users/show/${record.userId}`}
                    style={{ fontWeight: 500, fontSize: "15px" }}
                  >
                    {value || "N/A"}
                  </a>
                </Space>
              )}
            />
            <Table.Column
              dataIndex="email"
              title="Email"
              sorter
              render={(value) => (
                <span style={{ fontSize: "14px" }}>{value}</span>
              )}
            />
            <Table.Column
              dataIndex="userRole"
              title="Role"
              sorter
              render={(value) => {
                const colors: Record<string, string> = {
                  ADMIN: "red",
                  OWNER: "purple",
                  USER: "blue",
                };
                return <Tag color={colors[value] || "default"}>{value}</Tag>;
              }}
            />
            <Table.Column
              dataIndex="isVerified"
              title="Verified"
              render={(value) => (
                <Tag color={value ? "success" : "warning"}>
                  {value ? "Verified" : "Unverified"}
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
                  <EditButton hideText size="small" recordItemId={record.userId} />
                  <ShowButton hideText size="small" recordItemId={record.userId} />
                  <DeleteButton hideText size="small" recordItemId={record.userId} />
                </Space>
              )}
            />
          </Table>
        </List>
      </Card>
    </div>
  );
};
