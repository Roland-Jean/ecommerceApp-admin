import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";

export const UserCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email is required",
            },
            {
              type: "email",
              message: "Please enter a valid email",
            },
          ]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="User Role"
          name="userRole"
          rules={[
            {
              required: true,
              message: "User role is required",
            },
          ]}
          initialValue="USER"
        >
          <Select placeholder="Select role">
            <Select.Option value="USER">User</Select.Option>
            <Select.Option value="ADMIN">Admin</Select.Option>
            <Select.Option value="OWNER">Owner</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Verified Status"
          name="isVerified"
          valuePropName="checked"
          initialValue={false}
        >
          <Switch checkedChildren="Verified" unCheckedChildren="Unverified" />
        </Form.Item>
      </Form>
    </Create>
  );
};
