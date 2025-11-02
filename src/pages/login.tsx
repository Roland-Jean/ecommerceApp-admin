import { useLogin } from "@refinedev/core";
import { Button, Layout, Space, Typography, Card, Alert } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const Login: React.FC = () => {
  const { mutate: login } = useLogin();

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

          {/* Login Information Alert */}
          <Alert
            message="Keycloak Authentication"
            description={
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
                <Text>You will be redirected to Keycloak login page</Text>
                <div style={{ marginTop: "8px" }}>
                  <Text strong>Test Credentials:</Text>
                  <div style={{ marginLeft: "8px" }}>
                    <Text>Username: <Text code>admin</Text></Text>
                    <br />
                    <Text>Password: <Text code>admin</Text></Text>
                  </div>
                </div>
              </Space>
            }
            type="info"
            showIcon
            style={{ width: "100%", marginBottom: "16px" }}
          />

          {/* Login Button */}
          <Button
            style={{ 
              width: "100%", 
              height: "48px",
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: "8px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
            }}
            type="primary"
            size="large"
            icon={<LockOutlined />}
            onClick={() => login({})}
          >
            Sign in with Keycloak
          </Button>

          {/* Additional Info */}
          <Space direction="vertical" align="center" size="small" style={{ marginTop: "16px" }}>
            <Space>
              <UserOutlined style={{ color: "#8c8c8c" }} />
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Secure authentication powered by
              </Text>
            </Space>
            <img
              style={{ height: "24px" }}
              alt="Keycloak"
              src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fkeycloak.svg"
            />
          </Space>

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
