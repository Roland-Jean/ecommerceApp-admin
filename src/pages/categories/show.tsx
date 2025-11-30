import { Show, TextField, ImageField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Space, Avatar, Tag } from "antd";
import { TagsOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export const CategoryShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={5}>Category ID</Title>
          <Tag color="blue" style={{ fontSize: "14px" }}>
            #{record?.categoryId}
          </Tag>
        </div>

        <div>
          <Title level={5}>Category Name</Title>
          <Space>
            {record?.imageUrl ? (
              <Avatar src={record.imageUrl} size="large" />
            ) : (
              <Avatar icon={<TagsOutlined />} size="large" style={{ backgroundColor: "#667eea" }} />
            )}
            <TextField value={record?.name} style={{ fontSize: "18px", fontWeight: 500 }} />
          </Space>
        </div>

        <div>
          <Title level={5}>Description</Title>
          <Paragraph style={{ fontSize: "14px", color: "#666" }}>
            {record?.description || "No description available"}
          </Paragraph>
        </div>

        {record?.imageUrl && (
          <div>
            <Title level={5}>Category Image</Title>
            <ImageField
              value={record.imageUrl}
              width={200}
              style={{ borderRadius: "8px" }}
            />
          </div>
        )}
      </Space>
    </Show>
  );
};
