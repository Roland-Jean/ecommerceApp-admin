import { Show, TextField, NumberField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions, Space, Avatar, Table } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const OrderShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  const statusColors: Record<string, string> = {
    PENDING: "orange",
    PROCESSING: "blue",
    SHIPPED: "cyan",
    DELIVERED: "green",
    CANCELLED: "red",
  };

  return (
    <Show isLoading={isLoading}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={5}>Order Details</Title>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Order ID">
              <Tag color="blue">#{record?.orderId}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Customer">
              <Space>
                <Avatar icon={<UserOutlined />} size="small" style={{ backgroundColor: "#87d068" }} />
                <TextField value={record?.user?.username || record?.user?.email || "N/A"} />
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Total Amount">
              <Tag color="green" style={{ fontSize: "16px" }}>
                ${record?.totalAmount?.toFixed(2)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Order Status">
              <Tag color={statusColors[record?.orderStatus] || "default"}>
                {record?.orderStatus}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Order Date">
              {record?.orderDate ? new Date(record.orderDate).toLocaleString() : "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </div>

        {record?.orderItems && record.orderItems.length > 0 && (
          <div>
            <Title level={5}>Order Items</Title>
            <Table
              dataSource={record.orderItems}
              rowKey="orderItemId"
              pagination={false}
            >
              <Table.Column
                dataIndex={["product", "name"]}
                title="Product"
                render={(value) => (
                  <Space>
                    <ShoppingCartOutlined />
                    <span>{value || "N/A"}</span>
                  </Space>
                )}
              />
              <Table.Column
                dataIndex="quantity"
                title="Quantity"
                render={(value) => <Tag color="blue">{value}</Tag>}
              />
              <Table.Column
                dataIndex="price"
                title="Price"
                render={(value) => (
                  <Tag color="green">${value?.toFixed(2)}</Tag>
                )}
              />
            </Table>
          </div>
        )}
      </Space>
    </Show>
  );
};
