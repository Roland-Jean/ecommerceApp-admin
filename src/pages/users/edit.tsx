import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";

export const UserEdit = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="User ID"
          name="userId"
        >
          <Input disabled />
        </Form.Item>

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
          help="Leave blank to keep current password"
        >
          <Input.Password placeholder="Enter new password (optional)" />
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
        >
          <Switch checkedChildren="Verified" unCheckedChildren="Unverified" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
