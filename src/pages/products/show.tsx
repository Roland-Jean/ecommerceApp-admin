import { Show, TextField, NumberField, ImageField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Space, Avatar, Tag, Descriptions } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const ProductShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={5}>Product Details</Title>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Product ID">
              <Tag color="blue">#{record?.productId}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              <Space>
                {record?.imageUrl ? (
                  <Avatar src={record.imageUrl} size="large" />
                ) : (
                  <Avatar icon={<ShoppingOutlined />} size="large" style={{ backgroundColor: "#4facfe" }} />
                )}
                <TextField value={record?.name} style={{ fontSize: "16px", fontWeight: 500 }} />
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {record?.description || "No description"}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              <Tag color="green" style={{ fontSize: "16px" }}>
                ${record?.price?.toFixed(2)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Stock Quantity">
              <Tag color={record?.stock > 10 || record?.stockQuantity > 10 ? "success" : (record?.stock > 0 || record?.stockQuantity > 0) ? "warning" : "error"}>
                {record?.stock || record?.stockQuantity} units
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Categories">
              <Space>
                {record?.category && record.category.length > 0 ? (
                  record.category.map((cat: any) => (
                    <Tag key={cat.categoryId} color="purple">
                      {cat.name || `Category ${cat.categoryId}`}
                    </Tag>
                  ))
                ) : (
                  <Tag color="default">N/A</Tag>
                )}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Badge">
              <Tag color="gold">{record?.badge || "N/A"}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Rating">
              <Tag color="cyan">{record?.rating ? `⭐ ${record.rating}` : "N/A"}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={record?.isActive ? "success" : "default"}>
                {record?.isActive ? "Active" : "Inactive"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </div>

        {record?.imageUrl && (
          <div>
            <Title level={5}>Product Image</Title>
            <ImageField
              value={record.imageUrl}
              width={300}
              style={{ borderRadius: "8px" }}
            />
          </div>
        )}
      </Space>
    </Show>
  );
};
