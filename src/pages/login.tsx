import { useState } from "react";
import { useLogin } from "@refinedev/core";
import { Button, Layout, Space, Typography, Card, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { redirect } from "react-router";

const { Title, Text } = Typography;

export const Login: React.FC = () => {
  const { mutate: login } = useLogin();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = (values: { email: string; password: string }) => {
    setIsLoading(true);
    login(values, {
      onSuccess: () => {
        setIsLoading(false);
        redirect("/")
      },
      onError: (error) => {
        setIsLoading(false);
        message.error(error?.message || "Login failed. Please check your credentials.");
      },
    });
  };

  return (
    <Layout
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card
        style={{
          width: 450,
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          padding: "24px",
        }}
      >
        <Space direction="vertical" align="center" style={{ width: "100%" }} size="large">
          {/* Logo and Title */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "8px",
              }}
            >
              EA
            </div>
            <Title level={3} style={{ margin: 0 }}>
              EcommerceApp Admin
            </Title>
            <Text type="secondary">Sign in to your dashboard</Text>
          </div>

          {/* Login Form */}
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            style={{ width: "100%" }}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label={<span style={{ fontWeight: 500 }}>Email</span>}
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: "#8c8c8c" }} />}
                placeholder="admin@example.com"
                size="large"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span style={{ fontWeight: 500 }}>Password</span>}
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: "#8c8c8c" }} />}
                placeholder="••••••••"
                size="large"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{
                  width: "100%",
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                }}
                icon={<UserOutlined />}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              © 2025 EcommerceApp. All rights reserved.
            </Text>
          </div>
        </Space>
      </Card>
    </Layout>
  );
};
