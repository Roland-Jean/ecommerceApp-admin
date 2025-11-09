# Authentication Setup

This admin panel uses a custom authentication system that connects to a Spring Boot backend.

## Test Credentials (Development/Demo)

For testing and demo purposes, you can use these credentials:

- **Email:** `admin@test.com`
- **Password:** `admin123`

These test credentials work without a backend connection and are perfect for:
- Local development
- GitHub Pages demo
- Testing the UI/UX

## Connecting to Your Spring Boot Backend

### 1. Backend Requirements

Your Spring Boot backend should have a `/auth/login` endpoint that:

**Request:**
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "username": "username",
    "roles": ["admin"],
    "avatar": "https://..."
  }
}
```

**Response (Error):**
```json
{
  "message": "Invalid credentials"
}
```

### 2. Configure API URL

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the API URL:

```env
VITE_API_URL=http://localhost:8080/api
```

For production:

```env
VITE_API_URL=https://your-backend-api.com/api
```

### 3. Authentication Flow

1. **Login:** User enters credentials → App checks test credentials first → If not match, calls Spring Boot API
2. **Token Storage:** JWT token stored in localStorage
3. **API Requests:** Token sent in Authorization header: `Bearer {token}`
4. **Auto-logout:** On 401/403 responses
5. **Session Check:** Token presence checked on page load

### 4. Customizing Authentication

Edit [`src/App.tsx`](src/App.tsx ) to modify:
- Test credentials
- Login logic
- Token handling
- User permissions

### 5. API Configuration

Edit [`src/config/api.ts`](src/config/api.ts ) to:
- Change API endpoints
- Update base URL
- Configure timeout
- Add custom headers

## GitHub Pages Deployment

The app is configured to work on GitHub Pages with test credentials enabled by default.

**Live Demo:** `https://yourusername.github.io/ecommerceApp-admin/`

Use test credentials (`admin@test.com` / `admin123`) to login.

## Security Notes

⚠️ **Important:**
- Test credentials are hardcoded for demo purposes only
- Remove or disable test credentials in production
- Always use HTTPS in production
- Implement proper JWT validation on backend
- Use secure password policies
- Consider implementing refresh tokens

## Spring Boot Backend Example

Here's a sample Spring Boot controller:

```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Validate credentials
        User user = authService.authenticate(request.getEmail(), request.getPassword());
        
        if (user != null) {
            String token = jwtService.generateToken(user);
            
            return ResponseEntity.ok(new LoginResponse(
                token,
                new UserDTO(user)
            ));
        }
        
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(new ErrorResponse("Invalid credentials"));
    }
}
```

## Need Help?

- Check console for error messages
- Verify backend is running
- Test backend endpoint with Postman/curl
- Check CORS configuration on backend
- Verify environment variables are loaded
