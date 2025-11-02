import React from "react";
import { ThemedSider } from "@refinedev/antd";

const CustomTitle: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: collapsed ? "center" : "flex-start",
      padding: collapsed ? "16px 0" : "16px 24px",
      height: "72px",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
    }}
  >
    {collapsed ? (
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        EA
      </div>
    ) : (
      <div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          EcommerceApp
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#8c8c8c",
            marginTop: "4px",
          }}
        >
          Admin Dashboard
        </div>
      </div>
    )}
  </div>
);

export const CustomSider: React.FC = () => {
  return (
    <ThemedSider
      Title={CustomTitle}
    />
  );
};
