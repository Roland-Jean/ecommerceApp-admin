import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

// Import the upload function
const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ecommerce");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/dce1fl8qu/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
};

export const ProductCreate: React.FC = () => {
  const { formProps, saveButtonProps, onFinish } = useForm({});
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { selectProps: categorySelectProps, query: categoryQuery } = useSelect({
    resource: "categories",
    optionLabel: "name",
    optionValue: "categoryId",
  });

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const cloudinaryResponse = await uploadToCloudinary(file);
      
      if (cloudinaryResponse.secure_url) {
        setImageUrl(cloudinaryResponse.secure_url);
        formProps.form?.setFieldsValue({ imageUrl: cloudinaryResponse.secure_url });
        message.success("Image uploaded successfully!");
        return true;
      } else {
        message.error("Failed to upload image to Cloudinary");
        return false;
      }
    } catch (error) {
      console.error("Upload error:", error);
      message.error("Failed to upload image");
      return false;
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    name: "file",
    fileList,
    beforeUpload: async (file: File) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return Upload.LIST_IGNORE;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return Upload.LIST_IGNORE;
      }

      const success = await handleImageUpload(file);
      
      if (success) {
        setFileList([{
          uid: file.uid,
          name: file.name,
          status: "done",
          url: imageUrl,
        }]);
      }
      
      return false; // Prevent default upload behavior
    },
    onRemove: () => {
      setFileList([]);
      setImageUrl("");
      formProps.form?.setFieldsValue({ imageUrl: "" });
    },
    maxCount: 1,
  };

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
          label="Upload Product Image"
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} loading={uploading}>
              {uploading ? "Uploading..." : "Select Image"}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imageUrl"
          rules={[
            {
              required: true,
              message: "Please upload an image",
            },
          ]}
        >
          <Input 
            placeholder="Image URL (auto-filled after upload)" 
            disabled
          />
        </Form.Item>
      </Form>
    </Create>
  );
};