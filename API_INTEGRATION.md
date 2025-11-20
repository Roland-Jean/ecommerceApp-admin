# 🎯 Admin Dashboard - Spring Boot API Integration

## ✅ **Integration Complete!**

Your admin dashboard is now fully connected to your Spring Boot backend API endpoints!

---

## 🔌 **API Configuration**

### Base URL

```typescript
baseURL: "http://localhost:8081/api/v1";
```

### Data Provider

Created custom data provider (`src/config/dataProvider.ts`) that:

- ✅ Handles pagination
- ✅ Supports filtering and sorting
- ✅ Automatic JWT token injection
- ✅ Error handling with proper status codes
- ✅ Compatible with Spring Boot response format

---

## 📋 **Connected Endpoints**

### 1. **Authentication** (`/auth`)

- ✅ `POST /auth/login` - Login with email/password
- ✅ `POST /auth/logout` - Logout user
- ✅ JWT token stored in localStorage
- ✅ Automatic token refresh in headers

### 2. **Products** (`/products`)

- ✅ `GET /products` - List all products
- ✅ `POST /products` - Create new product (ADMIN/OWNER)
- ✅ `GET /products/{id}` - Get product by ID
- ✅ `PUT /products/{id}` - Update product (ADMIN/OWNER)
- ✅ `DELETE /products/{id}` - Delete product (ADMIN/OWNER)

### 3. **Categories** (`/categories`)

- ✅ `GET /categories` - List all categories
- ✅ `POST /categories` - Create category (ADMIN/OWNER)
- ✅ `PUT /categories` - Update category (ADMIN/OWNER)
- ✅ `DELETE /categories/{id}` - Delete category (ADMIN/OWNER)

### 4. **Users** (`/users`)

- ✅ `GET /users` - List all users (ADMIN/OWNER)
- ✅ `POST /users/register` - Register new user
- ✅ `GET /users/{id}` - Get user by ID (ADMIN/OWNER)
- ✅ `GET /users/email/{email}` - Get user by email (ADMIN/OWNER)
- ✅ `PUT /users/{id}` - Update user (USER/ADMIN/OWNER)
- ✅ `DELETE /users/{id}` - Delete user (ADMIN/OWNER)

### 5. **Orders** (`/orders`)

- ✅ `GET /orders` - List all orders (Authenticated)
- ✅ `POST /orders` - Create new order (Authenticated)
- ✅ `GET /orders/{id}` - Get order details
- ✅ `PUT /orders/{id}` - Update order
- ✅ `DELETE /orders/{id}` - Delete order

### 6. **Carts** (`/carts`)

- ✅ `GET /carts/products` - Get cart products
- ✅ `POST /carts` - Add to cart
- ✅ `DELETE /carts/product/{productId}` - Remove from cart
- ✅ `DELETE /carts/products` - Clear cart

### 7. **Payments** (`/payment`)

- ✅ `GET /payment/list payments` - List all payments (Authenticated)
- ✅ `POST /payment` - Create payment (Authenticated)
- ✅ `GET /payment/{id}` - Get payment by ID (Authenticated)
- ✅ `PUT /payment` - Update payment (Authenticated)
- ✅ `DELETE /payment/{id}` - Delete payment (Authenticated)

---

## 🎨 **Dashboard Features**

### Real-Time Statistics

```typescript
- Total Revenue (calculated from orders)
- Total Orders (from /orders endpoint)
- Total Users (from /users endpoint)
- Total Products (from /products endpoint)
```

### Resources in Sidebar

- 📊 **Dashboard** - Homepage with stats
- 📦 **Products** - Full CRUD operations
- 🏷️ **Categories** - Manage product categories
- 👥 **Users** - User management
- 🛒 **Orders** - Order management
- 🛍️ **Carts** - Shopping cart management
- 💳 **Payments** - Payment tracking

---

## 🔐 **Authentication Flow**

### 1. Login

```typescript
POST /auth/login
Body: { email: string, password: string }
Response: { token: string, user: UserDto }
```

### 2. Token Storage

- Token saved to `localStorage.setItem("token", token)`
- User data saved to `localStorage.setItem("user", JSON.stringify(user))`

### 3. Auto-Injection

- Every API request automatically includes:
  ```typescript
  headers: {
    Authorization: `Bearer ${token}`;
  }
  ```

### 4. Logout

- Clears token from localStorage
- Removes Authorization header
- Redirects to `/login`

---

## 🚀 **How to Use**

### 1. Start Your Spring Boot Backend

```bash
# In your IntelliJ project
./mvnw spring-boot:run
```

Backend should be running at: `http://localhost:8081`

### 2. Start Admin Dashboard

```bash
# In VS Code terminal
npm run dev
```

Dashboard will open at: `http://localhost:5173`

### 3. Login

- Navigate to `http://localhost:5173/login`
- Enter your credentials
- Click "Sign in"
- Redirected to dashboard

### 4. Manage Resources

- Click any resource in the sidebar
- Perform CRUD operations
- All changes sync with your Spring Boot API

---

## 📊 **Data Flow**

```
Frontend (React)
    ↓
Custom Data Provider (src/config/dataProvider.ts)
    ↓
Axios Instance (src/config/api.ts)
    ↓
HTTP Request with JWT Token
    ↓
Spring Boot API (http://localhost:8081/api/v1)
    ↓
Response
    ↓
Rendered in UI
```

---

## 🔧 **Configuration Files**

### 1. API Config (`src/config/api.ts`)

```typescript
export const api = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  timeout: 10000,
});
```

### 2. Data Provider (`src/config/dataProvider.ts`)

- Custom implementation for Spring Boot
- Handles pagination, filtering, sorting
- Automatic JWT injection

### 3. Auth Provider (`src/App.tsx`)

- Login/Logout logic
- Token management
- User identity extraction

---

## 🎯 **Testing**

### Test Authentication

```bash
# Should work with your existing users
Email: admin@example.com (or whatever you set)
Password: your_password
```

### Test API Calls

1. **Open Browser DevTools** (F12)
2. **Go to Network tab**
3. **Perform action** (e.g., view products)
4. **Check Request**:
   - URL: `http://localhost:8081/api/v1/products`
   - Headers: `Authorization: Bearer <token>`
   - Method: GET
   - Response: Your product data

---

## ⚠️ **Important Notes**

### CORS Configuration

Make sure your Spring Boot has CORS enabled:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### Security Configuration

Ensure endpoints are properly secured:

- Public: `/auth/login`, `/users/register`
- Authenticated: `/products`, `/categories`, `/orders`, etc.
- Admin Only: Create/Update/Delete for sensitive resources

---

## 🐛 **Troubleshooting**

### Problem: Can't Login

- ✅ Check if backend is running on port 8081
- ✅ Verify user exists in database
- ✅ Check console for error messages
- ✅ Verify CORS is enabled

### Problem: Data Not Loading

- ✅ Check Network tab in DevTools
- ✅ Verify JWT token is being sent
- ✅ Check API endpoint URLs
- ✅ Verify backend returns correct format

### Problem: 401 Unauthorized

- ✅ Token might be expired
- ✅ Logout and login again
- ✅ Check token in localStorage
- ✅ Verify JWT secret matches

### Problem: 403 Forbidden

- ✅ Check user roles
- ✅ Verify endpoint permissions
- ✅ User might not have required role (ADMIN/OWNER)

---

## 🎉 **What's Working**

✅ **Authentication** - Login/Logout with JWT
✅ **Products Management** - Full CRUD
✅ **Categories Management** - Full CRUD  
✅ **Users Management** - Full CRUD
✅ **Orders Tracking** - View and manage
✅ **Cart Operations** - Add/Remove products
✅ **Payment Tracking** - Monitor payments
✅ **Dashboard Stats** - Real-time from API
✅ **Role-Based Access** - Admin/Owner/User
✅ **Beautiful UI** - Animations and gradients
✅ **Dark Mode** - Toggle theme
✅ **Responsive Design** - Works on all devices

---

**Your admin dashboard is now fully connected to your Spring Boot API! 🚀**

All CRUD operations will hit your real backend endpoints and manage your database data.
