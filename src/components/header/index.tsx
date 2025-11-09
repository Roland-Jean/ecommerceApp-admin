import type { RefineThemedLayoutHeaderProps } from "@refinedev/antd";
import { useGetIdentity, useLogout } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Space,
  Switch,
  theme,
  Typography,
  Badge,
  Dropdown,
  Input,
  Button,
} from "antd";
import {
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MailOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
};

export const Header: React.FC<RefineThemedLayoutHeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mutate: logout } = useLogout();
  const { mode, setMode } = useContext(ColorModeContext);

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 24px",
    height: "72px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 999;
  }

  const handleMenuClick = (info: { key: string }) => {
    if (info.key === "logout") {
      logout();
    }
    // Add handlers for profile and settings when needed
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  const notificationItems = [
    {
      key: "1",
      label: (
        <div style={{ width: 280 }}>
          <div style={{ fontWeight: 600 }}>New order received</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>2 minutes ago</div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div style={{ width: 280 }}>
          <div style={{ fontWeight: 600 }}>User registered</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>15 minutes ago</div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div style={{ width: 280 }}>
          <div style={{ fontWeight: 600 }}>New comment on post</div>
          <div style={{ fontSize: 12, color: "#8c8c8c" }}>1 hour ago</div>
        </div>
      ),
    },
  ];

  return (
    <AntdLayout.Header style={headerStyles}>
      {/* Left Section - Search */}
      <div style={{ flex: 1, maxWidth: 400 }}>
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          style={{
            borderRadius: "20px",
            backgroundColor: mode === "dark" ? "#141414" : "#f5f5f5",
            border: "none",
          }}
          size="large"
        />
      </div>

      {/* Right Section - Actions */}
      <Space size="large">
        {/* Messages */}
        <Dropdown
          menu={{ items: notificationItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Badge count={2} size="small">
            <Button
              type="text"
              icon={<MailOutlined style={{ fontSize: 18 }} />}
              style={{ border: "none" }}
            />
          </Badge>
        </Dropdown>

        {/* Notifications */}
        <Dropdown
          menu={{ items: notificationItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Badge count={5} size="small">
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: 18 }} />}
              style={{ border: "none" }}
            />
          </Badge>
        </Dropdown>

        {/* Dark Mode Toggle */}
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />

        {/* User Profile */}
        <Dropdown 
          menu={{ items: userMenuItems, onClick: handleMenuClick }} 
          placement="bottomRight"
        >
          <Space
            style={{
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: "8px",
              backgroundColor: mode === "dark" ? "#141414" : "#f5f5f5",
            }}
          >
            <Avatar
              src={user?.avatar}
              icon={!user?.avatar && <UserOutlined />}
              style={{ backgroundColor: "#1890ff" }}
            />
            <div style={{ lineHeight: "1.2" }}>
              <Text strong style={{ display: "block", fontSize: "14px" }}>
                {user?.name || user?.username || "Admin User"}
              </Text>
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {user?.email || "Administrator"}
              </Text>
            </div>
          </Space>
        </Dropdown>
      </Space>
    </AntdLayout.Header>
  );
};
