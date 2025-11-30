import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, InputNumber, Select, Input } from "antd";

export const PaymentEdit = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: orderSelectProps } = useSelect({
    resource: "orders",
    optionLabel: "orderId",
    optionValue: "orderId",
    defaultValue: formProps?.initialValues?.order?.orderId,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Payment ID"
          name="paymentId"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Order"
          name={["order", "orderId"]}
          rules={[
            {
              required: true,
              message: "Order is required",
            },
          ]}
        >
          <Select {...orderSelectProps} placeholder="Select an order" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Amount is required",
            },
          ]}
        >
          <InputNumber 
            min={0} 
            step={0.01}
            style={{ width: "100%" }}
            placeholder="0.00"
            prefix="$"
          />
        </Form.Item>

        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          rules={[
            {
              required: true,
              message: "Payment method is required",
            },
          ]}
        >
          <Select placeholder="Select payment method">
            <Select.Option value="CREDIT_CARD">Credit Card</Select.Option>
            <Select.Option value="DEBIT_CARD">Debit Card</Select.Option>
            <Select.Option value="PAYPAL">PayPal</Select.Option>
            <Select.Option value="CASH">Cash</Select.Option>
            <Select.Option value="BANK_TRANSFER">Bank Transfer</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Payment Status"
          name="paymentStatus"
          rules={[
            {
              required: true,
              message: "Payment status is required",
            },
          ]}
        >
          <Select placeholder="Select status">
            <Select.Option value="PENDING">Pending</Select.Option>
            <Select.Option value="COMPLETED">Completed</Select.Option>
            <Select.Option value="FAILED">Failed</Select.Option>
            <Select.Option value="REFUNDED">Refunded</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Payment Date"
          name="paymentDate"
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Edit>
  );
};
