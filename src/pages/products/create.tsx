import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch } from "antd";
import { useState } from "react";

export const ProductCreate: React.FC = () => {
  const { formProps, saveButtonProps, onFinish } = useForm({});
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const { selectProps: categorySelectProps, query: categoryQuery } = useSelect({
    resource: "categories",
    optionLabel: "name",
    optionValue: "categoryId",
  });

  const handleFormFinish = (values: any) => {
    // Transform categoryId to category array with full category object
    const { categoryId, stockQuantity, ...rest } = values;
    
    // Find the full category object from the loaded categories
    const fullCategory = categoryQuery.data?.data?.find(
      (cat: any) => cat.categoryId === categoryId
    );
    
    const transformedValues = {
      ...rest,
      category: fullCategory ? [fullCategory] : [],
      stock: stockQuantity, // Map stockQuantity to stock
    };
    // Remove stockQuantity from the payload
    delete transformedValues.stockQuantity;
    onFinish(transformedValues);
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleFormFinish}>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Product name is required",
            },
          ]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Description is required",
            },
          ]}
        >
          <Input.TextArea 
            rows={4} 
            placeholder="Enter product description"
          />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Price is required",
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
          label="Stock Quantity"
          name="stockQuantity"
          rules={[
            {
              required: true,
              message: "Stock quantity is required",
            },
          ]}
        >
          <InputNumber 
            min={0} 
            style={{ width: "100%" }}
            placeholder="0"
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Category is required",
            },
          ]}
        >
          <Select {...categorySelectProps} placeholder="Select a category" />
        </Form.Item>

        <Form.Item
          label="Badge"
          name="badge"
          rules={[
            {
              required: true,
              message: "Badge is required",
            },
          ]}
        >
          <Input placeholder="e.g., New, Sale, Featured" />
        </Form.Item>

        <Form.Item
          label="Rating"
          name="rating"
          rules={[
            {
              required: true,
              message: "Rating is required",
            },
          ]}
          initialValue={0}
        >
          <InputNumber 
            min={0} 
            max={5}
            step={0.1}
            style={{ width: "100%" }}
            placeholder="0.0"
          />
        </Form.Item>

        <Form.Item
          label="Active Status"
          name="isActive"
          valuePropName="checked"
          initialValue={true}
          rules={[
            {
              required: true,
              message: "Active status is required",
            },
          ]}
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imageUrl"
          rules={[
            {
              required: true,
              message: "Image URL is required",
            },
            {
              type: "url",
              message: "Please enter a valid URL",
            },
            {
              max: 250,
              message: "URL must be less than 250 characters",
            },
          ]}
        >
          <Input 
            placeholder="https://example.com/product-image.jpg" 
            showCount 
            maxLength={250}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
