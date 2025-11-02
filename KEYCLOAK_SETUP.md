# EcommerceApp Admin Dashboard - Keycloak Setup

## 🔐 Keycloak Authentication

This admin dashboard uses Keycloak for secure authentication. Follow the setup guide below.

## 📋 Prerequisites

- Keycloak server running (version 25.0.1 or compatible)
- Admin access to Keycloak console

## 🚀 Quick Start

### Default Test Credentials

For testing purposes, use these credentials:

- **Username**: `admin`
- **Password**: `admin`

### Current Keycloak Configuration

The application is configured to connect to:

- **Keycloak URL**: `https://lemur-0.cloud-iam.com/auth`
- **Realm**: `refine`
- **Client ID**: `refine-demo`

## 🛠️ Keycloak Setup Instructions

### 1. Create a Realm

1. Log into your Keycloak Admin Console
2. Click **Add Realm** (or use existing realm `refine`)
3. Set realm name to `refine`
4. Save

### 2. Create a Client

1. Navigate to **Clients** in the left menu
2. Click **Create**
3. Set Client ID to `refine-demo`
4. Set Client Protocol to `openid-connect`
5. Save
6. Configure the client:
   - **Access Type**: `public`
   - **Standard Flow Enabled**: `ON`
   - **Direct Access Grants Enabled**: `ON`
   - **Valid Redirect URIs**:
     - `http://localhost:5173/*`
     - `http://localhost:3000/*`
     - Add your production URL
   - **Web Origins**: `*` (or specific origins for production)
7. Save

### 3. Create Admin User

1. Navigate to **Users** in the left menu
2. Click **Add User**
3. Fill in the details:
   - **Username**: `admin`
   - **Email**: `admin@example.com` (optional)
   - **First Name**: `Admin`
   - **Last Name**: `User`
   - **Email Verified**: `ON`
   - **Enabled**: `ON`
4. Save
5. Go to **Credentials** tab
6. Set password to `admin`
7. Set **Temporary**: `OFF`
8. Click **Set Password**

### 4. Assign Roles (Optional)

1. Go to **Roles** tab for the user
2. Assign realm roles as needed
3. The application will extract these roles and display them

## 🔧 Configure Your Own Keycloak Instance

If you want to use your own Keycloak instance, update the configuration in `src/index.tsx`:

```typescript
const keycloak = new Keycloak({
  clientId: "your-client-id",
  url: "https://your-keycloak-url/auth",
  realm: "your-realm",
});
```

## 📝 User Information Extracted from Keycloak

The application extracts the following user information from Keycloak tokens:

- **ID**: `sub` (Subject identifier)
- **Name**: `name` or `preferred_username`
- **Email**: `email`
- **Username**: `preferred_username`
- **First Name**: `given_name`
- **Last Name**: `family_name`
- **Roles**: `realm_access.roles`
- **Avatar**: Auto-generated from username using DiceBear API

## 🎨 Features

### Beautiful Admin Dashboard Includes:

- ✅ **Secure Keycloak Authentication**
- ✅ **User Profile with Keycloak Data**
- ✅ **Logout Functionality**
- ✅ **Dashboard with Statistics**
- ✅ **Dark/Light Mode Toggle**
- ✅ **Notifications & Messages**
- ✅ **Blog Posts & Categories Management**
- ✅ **Responsive Design**
- ✅ **Smooth Animations**

## 🚀 Running the Application

1. Make sure Keycloak is running and configured
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`
5. Click "Sign in with Keycloak"
6. Enter credentials: **admin** / **admin**
7. You'll be redirected to the dashboard

## 🔒 Security Notes

### For Production:

1. **Change Default Credentials**: Never use `admin/admin` in production
2. **Use HTTPS**: Always use HTTPS for Keycloak and your application
3. **Restrict Redirect URIs**: Set specific redirect URIs, not wildcards
4. **Configure CORS**: Set specific origins instead of `*`
5. **Enable MFA**: Enable multi-factor authentication in Keycloak
6. **Regular Updates**: Keep Keycloak updated to the latest version
7. **Token Expiration**: Configure appropriate token expiration times
8. **SSL Certificates**: Use valid SSL certificates

## 🐛 Troubleshooting

### Login Redirects to Error Page

- Check if Keycloak server is running
- Verify redirect URIs are correctly configured in Keycloak client
- Check browser console for CORS errors

### User Information Not Showing

- Verify the user exists in Keycloak
- Check if user profile attributes are properly set
- Ensure token contains expected claims

### Logout Not Working

- Check Keycloak logout URLs are configured
- Verify post-logout redirect URI is valid

## 📚 Additional Resources

- [Keycloak Documentation](https://www.keycloak.org/documentation)
- [Refine Documentation](https://refine.dev/docs/)
- [React Keycloak Integration](https://github.com/react-keycloak/react-keycloak)

## 💡 Tips

- Use Keycloak's built-in user federation for LDAP/AD integration
- Enable social login providers (Google, Facebook, GitHub, etc.)
- Configure email server for password reset functionality
- Use Keycloak's fine-grained authorization for complex permission systems

---

**Happy Coding! 🚀**
