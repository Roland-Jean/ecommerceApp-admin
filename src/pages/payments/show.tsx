import { Show, TextField, NumberField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions, Space } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const PaymentShow = () => {
  const { query } = useShow({});
  const { data, isLoading } = query;

  const record = data?.data;

  const methodColors: Record<string, string> = {
    CREDIT_CARD: "blue",
    DEBIT_CARD: "cyan",
    PAYPAL: "purple",
    CASH: "green",
    BANK_TRANSFER: "orange",
  };

  const statusColors: Record<string, string> = {
    PENDING: "orange",
    COMPLETED: "green",
    FAILED: "red",
    REFUNDED: "purple",
  };

  return (
    <Show isLoading={isLoading}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={5}>Payment Details</Title>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Payment ID">
              <Tag color="blue">#{record?.paymentId}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Order ID">
              <Space>
                <CreditCardOutlined style={{ color: "#1890ff" }} />
                <a href={`/orders/show/${record?.order?.orderId}`}>
                  Order #{record?.order?.orderId}
                </a>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              <Tag color="green" style={{ fontSize: "16px" }}>
                ${record?.amount?.toFixed(2)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method">
              <Tag color={methodColors[record?.paymentMethod] || "default"}>
                {record?.paymentMethod}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              <Tag color={statusColors[record?.paymentStatus] || "default"}>
                {record?.paymentStatus}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Date">
              {record?.paymentDate ? new Date(record.paymentDate).toLocaleString() : "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Space>
    </Show>
  );
};
