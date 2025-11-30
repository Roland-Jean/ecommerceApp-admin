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
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import axios from "axios"; // Only used for type checking (isAxiosError)
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header, CustomSider } from "./components";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import {
  ProductCreate,
  ProductEdit,
  ProductList,
  ProductShow,
} from "./pages/products";
import {
  UserCreate,
  UserEdit,
  UserList,
  UserShow,
} from "./pages/users";
import {
  OrderCreate,
  OrderEdit,
  OrderList,
  OrderShow,
} from "./pages/orders";
import {
  CartCreate,
  CartList,
} from "./pages/carts";
import {
  PaymentCreate,
  PaymentEdit,
  PaymentList,
  PaymentShow,
} from "./pages/payments";
import { DashboardPage } from "./pages/dashboard";
import { Login } from "./pages/login";
import { api, API_CONFIG } from "./config/api";
import { dataProvider } from "./config/dataProvider";

// Only use basename for GitHub Pages
const isGitHubPages = import.meta.env.VITE_GITHUB_PAGES === 'true';
const basename = isGitHubPages ? '/ecommerceApp-admin' : '';

console.log('App.tsx loaded');
console.log('Environment:', import.meta.env.MODE);
console.log('VITE_GITHUB_PAGES:', isGitHubPages);
console.log('Basename:', basename);
console.log('API Base URL:', API_CONFIG.baseURL);
console.log('VITE_GITHUB_PAGES:', isGitHubPages);
console.log('Basename:', basename);

function App() {
  console.log('App component rendering...');
  
  if (!basename) {
    console.log('No basename - running on Vercel/local');
  } else {
    console.log('Using basename for GitHub Pages');
  }
  const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
      try {
        const response = await api.post(`/auth/login`, {
          email,
          password,
        });
        console.log('Login response:', response);
        
        const { token, user } = response.data;

        // Check if user object exists
        if (!user) {
          return {
            success: false,
            error: {
              name: "LoginError",
              message: "Invalid response from server",
            },
          };
        }

        // Check if user has admin role
        if (user.userRole !== "ADMIN") {
          return {
            success: false,
            error: {
              name: "LoginError",
              message: "You do not have admin access",
            },
          };
        }

        if (token) {
          // Store token - interceptor will automatically attach it to requests
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          
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
      } catch (error: unknown) {
        return {
          success: false,
          error: {
            name: "LoginError",
            message:
              (axios.isAxiosError(error) && error.response?.data?.message) ||
              (error instanceof Error ? error.message : null) ||
              "login failed. verify your credentials",
          },
        };
      }
    },
    logout: async () => {
      // Remove token and user from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
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
        // Token will be automatically attached by interceptor
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: () => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        return Promise.resolve(parsedUser.roles || []);
      }
      return Promise.resolve(null);
    },
    getIdentity: () => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        return Promise.resolve({
          id: parsedUser.id,
          name: parsedUser.name || parsedUser.username,
          email: parsedUser.email,
          avatar: parsedUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsedUser.email}`,
          ...parsedUser,
        });
      }
      return Promise.resolve(null);
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
                  <Route path="/login" element={<Login />} />
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
                    <Route path="/products">
                      <Route index element={<ProductList />} />
                      <Route path="create" element={<ProductCreate />} />
                      <Route path="edit/:id" element={<ProductEdit />} />
                      <Route path="show/:id" element={<ProductShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>
                    <Route path="/users">
                      <Route index element={<UserList />} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="show/:id" element={<UserShow />} />
                    </Route>
                    <Route path="/orders">
                      <Route index element={<OrderList />} />
                      <Route path="create" element={<OrderCreate />} />
                      <Route path="edit/:id" element={<OrderEdit />} />
                      <Route path="show/:id" element={<OrderShow />} />
                    </Route>
                    <Route path="/carts">
                      <Route index element={<CartList />} />
                      <Route path="create" element={<CartCreate />} />
                    </Route>
                    <Route path="/payments">
                      <Route index element={<PaymentList />} />
                      <Route path="create" element={<PaymentCreate />} />
                      <Route path="edit/:id" element={<PaymentEdit />} />
                      <Route path="show/:id" element={<PaymentShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
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
