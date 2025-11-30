import { Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions, Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const UserShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  const roleColors: Record<string, string> = {
    ADMIN: "red",
    OWNER: "purple",
    USER: "blue",
  };

  return (
    <Show isLoading={isLoading}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={5}>User Details</Title>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="User ID">
              <Tag color="blue">#{record?.userId}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Username">
              <Space>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#87d068" }} />
                <TextField value={record?.username} style={{ fontSize: "16px", fontWeight: 500 }} />
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <TextField value={record?.email} />
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              <Tag color={roleColors[record?.userRole] || "default"}>
                {record?.userRole}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Verified">
              <Tag color={record?.isVerified ? "success" : "warning"}>
                {record?.isVerified ? "Verified" : "Unverified"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Space>
    </Show>
  );
};
