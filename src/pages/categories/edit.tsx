import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const CategoryEdit = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Category ID"
          name="categoryId"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Category name cannot be blank",
            },
          ]}
        >
          <Input placeholder="e.g., Electronics, Clothing" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Category description cannot be blank",
            },
          ]}
        >
          <Input.TextArea 
            rows={4} 
            placeholder="Enter a description of the category"
          />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imageUrl"
          rules={[
            {
              type: "url",
              message: "Please enter a valid URL",
            },
          ]}
        >
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
