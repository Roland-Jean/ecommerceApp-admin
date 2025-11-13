import {
  Authenticated,
  AuthProvider,
  Refine,
} from "@refinedev/core";

import {
  ErrorComponent,
  ThemedLayout,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerProvider, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header, CustomSider } from "./components";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { DashboardPage } from "./pages/dashboard";
import { Login } from "./pages/login";
import { api } from "./config/api";
import { dataProvider } from "./config/dataProvider";

const basename = import.meta.env.VITE_GITHUB_PAGES ? '/ecommerceApp-admin' : '';

function App() {
  const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
      try {
        const response = await api.post(`/auth/login`, {
          email,
          password,
        });
        console.log(response);
        const { token, user } = response.data;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          
          return {
            success: true,
            redirectTo: "/",
          };
        }

        return {
          success: false,
          error: {
            name: "LoginError",
            message: "Invalid credentials",
          },
        };
      } catch (error: any) {
        return {
          success: false,
          error: {
            name: "LoginError",
            message:error?.response?.data?.message || error?.message || "login failed. verify your credentials", 
          },
        };
      }
    },
    logout: async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      
      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return {
          logout: true,
          redirectTo: "/login",
          error,
        };
      }
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
        error: {
          message: "Authentication required",
          name: "Unauthorized",
        },
      };
    },
    getPermissions: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser.roles || [];
      }
      return null;
    },
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        return {
          id: parsedUser.id,
          name: parsedUser.name || parsedUser.username,
          email: parsedUser.email,
          avatar: parsedUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsedUser.email}`,
          ...parsedUser,
        };
      }
      return null;
    },
  };

  return (
    <BrowserRouter basename={basename}>
      <ColorModeContextProvider>
        <AntdApp>
          <Refine
                dataProvider={dataProvider("http://localhost:8081/api/v1")}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                resources={[
                  {
                    name: "dashboard",
                    list: "/",
                    meta: {
                      label: "Dashboard",
                      icon: "📊",
                    },
                  },
                  {
                    name: "products",
                    list: "/products",
                    create: "/products/create",
                    edit: "/products/edit/:id",
                    show: "/products/show/:id",
                    meta: {
                      canDelete: true,
                      label: "Products",
                      icon: "📦",
                    },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                      label: "Categories",
                      icon: "🏷️",
                    },
                  },
                  {
                    name: "users",
                    list: "/users",
                    create: "/users/create",
                    edit: "/users/edit/:id",
                    show: "/users/show/:id",
                    meta: {
                      canDelete: true,
                      label: "Users",
                      icon: "👥",
                    },
                  },
                  {
                    name: "orders",
                    list: "/orders",
                    create: "/orders/create",
                    edit: "/orders/edit/:id",
                    show: "/orders/show/:id",
                    meta: {
                      canDelete: true,
                      label: "Orders",
                      icon: "🛒",
                    },
                  },
                  {
                    name: "carts",
                    list: "/carts",
                    meta: {
                      label: "Carts",
                      icon: "🛍️",
                    },
                  },
                  {
                    name: "payment",
                    list: "/payments",
                    create: "/payments/create",
                    edit: "/payments/edit/:id",
                    show: "/payments/show/:id",
                    meta: {
                      canDelete: true,
                      label: "Payments",
                      icon: "💳",
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayout
                          Header={Header}
                          Sider={CustomSider}
                        >
                          <Outlet />
                        </ThemedLayout>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<DashboardPage />}
                    />
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
          </AntdApp>
        </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
