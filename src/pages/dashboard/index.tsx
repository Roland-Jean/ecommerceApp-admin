import { useList } from "@refinedev/core";
import {
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  List,
  Avatar,
  Space,
  Tag,
  Progress,
} from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  FileTextOutlined,
  DollarCircleOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export const DashboardPage = () => {
  const { result: { data: products } = { data: [] } } = useList({
    resource: "products",
    pagination: { pageSize: 5 },
  });

  const { result: { data: categories } = { data: [] } } = useList({
    resource: "categories",
  });

  const { result: { data: users } = { data: [] } } = useList({
    resource: "users",
  });

  const { result: { data: orders } = { data: [] } } = useList({
    resource: "orders",
  });

  // Calculate stats from real data
  const stats = {
    totalRevenue: orders?.reduce((sum: number, order: Record<string, unknown>) => sum + (Number(order.totalPrice) || 0), 0) || 0,
    revenueGrowth: 12.5, // You can calculate this based on previous period
    totalOrders: orders?.length || 0,
    ordersGrowth: 8.3,
    totalUsers: users?.length || 0,
    usersGrowth: -2.4,
    totalProducts: products?.length || 0,
    productsGrowth: 5.1,
  };

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "Created new blog post",
      time: "2 minutes ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated category",
      time: "15 minutes ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Published 3 posts",
      time: "1 hour ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    {
      id: 4,
      user: "Sarah Williams",
      action: "Added new product",
      time: "2 hours ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  ];

  const StatCard = ({
    title,
    value,
    growth,
    icon,
    prefix,
  }: {
    title: string;
    value: number;
    growth: number;
    icon: React.ReactNode;
    prefix?: string;
  }) => (
    <Card
      hoverable
      className="dashboard-stat-card"
      style={{
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Text type="secondary" style={{ fontSize: "14px" }}>
            {title}
          </Text>
          <div style={{ marginTop: "8px" }}>
            <Statistic
              value={value}
              prefix={prefix}
              valueStyle={{ fontSize: "28px", fontWeight: "bold" }}
            />
          </div>
          <div style={{ marginTop: "8px" }}>
            <Space>
              {growth >= 0 ? (
                <RiseOutlined style={{ color: "#52c41a" }} />
              ) : (
                <FallOutlined style={{ color: "#ff4d4f" }} />
              )}
              <Text style={{ color: growth >= 0 ? "#52c41a" : "#ff4d4f" }}>
                {Math.abs(growth)}% vs last month
              </Text>
            </Space>
          </div>
        </div>
        <div
          style={{
            fontSize: "48px",
            color: "#1890ff",
            opacity: 0.2,
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );

  return (
    <div style={{ padding: "24px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Title level={2}>Dashboard Overview</Title>
        <Text type="secondary">Welcome back! Here's what's happening today.</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            growth={stats.revenueGrowth}
            icon={<DollarCircleOutlined />}
            prefix="$"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            growth={stats.ordersGrowth}
            icon={<ShoppingCartOutlined />}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            growth={stats.usersGrowth}
            icon={<UserOutlined />}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            growth={stats.productsGrowth}
            icon={<FileTextOutlined />}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Recent Products */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <FileTextOutlined />
                <span>Recent Products</span>
              </Space>
            }
            extra={<a href="/products">View All</a>}
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "100%",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={products?.slice(0, 5) || []}
              renderItem={(item: Record<string, unknown>) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={<FileTextOutlined />}
                        style={{ backgroundColor: "#1890ff" }}
                      />
                    }
                    title={
                      <a href={`/products/show/${String(item.id || item.productId)}`}>
                        {typeof item.name === 'string' ? item.name : (typeof item.productName === 'string' ? item.productName : "Untitled")}
                      </a>
                    }
                    description={
                      <Space>
                        <Tag color="green">${Number(item.price || 0).toFixed(2)}</Tag>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          Stock: {Number(item.stock || item.quantity || 0)}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <EyeOutlined />
                <span>Recent Activities</span>
              </Space>
            }
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              height: "100%",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.user}
                    description={
                      <Space direction="vertical" size={0}>
                        <Text>{item.action}</Text>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          {item.time}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Categories Overview */}
      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24}>
          <Card
            title="Categories Overview"
            style={{
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Row gutter={[16, 16]}>
              {categories?.slice(0, 4).map((category: Record<string, unknown>, index: number) => (
                <Col xs={24} sm={12} lg={6} key={String(category.id)}>
                  <Card
                    hoverable
                    style={{
                      textAlign: "center",
                      background: `linear-gradient(135deg, ${
                        ["#667eea", "#764ba2", "#f093fb", "#4facfe"][index % 4]
                      } 0%, ${
                        ["#764ba2", "#667eea", "#f5576c", "#00f2fe"][index % 4]
                      } 100%)`,
                      color: "white",
                      border: "none",
                    }}
                  >
                    <Title level={3} style={{ color: "white", margin: 0 }}>
                      {String(category.title)}
                    </Title>
                    <Progress
                      percent={Math.floor(Math.random() * 40 + 60)}
                      strokeColor="white"
                      trailColor="rgba(255,255,255,0.3)"
                      style={{ marginTop: "16px" }}
                    />
                    <Text style={{ color: "white", fontSize: "12px" }}>
                      Activity Rate
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
