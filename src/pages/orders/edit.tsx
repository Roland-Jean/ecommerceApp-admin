import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, InputNumber, Select, Input } from "antd";

export const OrderEdit = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "email",
    optionValue: "userId",
    defaultValue: formProps?.initialValues?.user?.userId,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Order ID"
          name="orderId"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Customer"
          name={["user", "userId"]}
          rules={[
            {
              required: true,
              message: "Customer is required",
            },
          ]}
        >
          <Select {...userSelectProps} placeholder="Select a customer" />
        </Form.Item>

        <Form.Item
          label="Total Amount"
          name="totalAmount"
          rules={[
            {
              required: true,
              message: "Total amount is required",
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
          label="Order Status"
          name="orderStatus"
          rules={[
            {
              required: true,
              message: "Order status is required",
            },
          ]}
        >
          <Select placeholder="Select status">
            <Select.Option value="PENDING">Pending</Select.Option>
            <Select.Option value="PROCESSING">Processing</Select.Option>
            <Select.Option value="SHIPPED">Shipped</Select.Option>
            <Select.Option value="DELIVERED">Delivered</Select.Option>
            <Select.Option value="CANCELLED">Cancelled</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Order Date"
          name="orderDate"
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Edit>
  );
};
