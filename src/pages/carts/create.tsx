import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, InputNumber, Select } from "antd";

export const CartCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "email",
    optionValue: "userId",
  });

  const { selectProps: productSelectProps } = useSelect({
    resource: "products",
    optionLabel: "name",
    optionValue: "productId",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
          label="Product"
          name={["product", "productId"]}
          rules={[
            {
              required: true,
              message: "Product is required",
            },
          ]}
        >
          <Select {...productSelectProps} placeholder="Select a product" />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Quantity is required",
            },
          ]}
          initialValue={1}
        >
          <InputNumber 
            min={1} 
            style={{ width: "100%" }}
            placeholder="1"
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
