# Authentication Setup - Spring Boot Backend Integration

## Overview
Keycloak has been removed and replaced with a custom authentication system that integrates with your Spring Boot backend.

## Configuration

### 1. Environment Variables
Create a `.env` file in the root directory (copy from `.env.example`):

```bash
VITE_API_URL=http://localhost:8080/api
```

### 2. Spring Boot Backend Requirements

Your Spring Boot backend should provide the following authentication endpoints:

#### Login Endpoint
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "user@example.com",
    "username": "johndoe",
    "roles": ["ADMIN", "USER"],
    "avatar": "https://example.com/avatar.jpg" // optional
  }
}
```

**Response (Error - 401):**
```json
{
  "message": "Invalid credentials"
}
```

#### Get Current User (Optional)
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "user@example.com",
  "username": "johndoe",
  "roles": ["ADMIN", "USER"]
}
```

### 3. Spring Boot Security Configuration Example

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtAuthenticationFilter(), 
                UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

### 4. Login Controller Example

```java
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private UserRepository userRepository;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenProvider.generateToken(authentication);
            
            User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            LoginResponse response = new LoginResponse();
            response.setToken(token);
            response.setUser(UserDTO.fromUser(user));
            
            return ResponseEntity.ok(response);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid credentials"));
        }
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        return ResponseEntity.ok(UserDTO.fromUser(user));
    }
}
```

## Frontend Authentication Flow

### 1. Login
When a user submits the login form:
1. Email and password are sent to `/api/auth/login`
2. Backend validates credentials and returns JWT token + user data
3. Token is stored in `localStorage`
4. Token is set in axios default headers for all subsequent requests
5. User is redirected to dashboard

### 2. Authentication Check
On every page load:
1. Token is retrieved from `localStorage`
2. If token exists, it's added to axios headers
3. User can access protected routes

### 3. Logout
When user logs out:
1. Token and user data are removed from `localStorage`
2. Authorization header is removed from axios
3. User is redirected to login page

### 4. Auto-logout on 401/403
If any API request returns 401 or 403:
1. User is automatically logged out
2. Redirected to login page

## API Configuration

Update the API configuration in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  endpoints: {
    auth: {
      login: "/auth/login",
      logout: "/auth/logout",
      refresh: "/auth/refresh",
      me: "/auth/me",
    },
  },
};
```

## Customization

### Change Login Form Fields
Edit `src/pages/login.tsx` to add/remove fields:

```tsx
<Form.Item
  name="username" // instead of email
  label="Username"
  rules={[{ required: true, message: "Please enter your username" }]}
>
  <Input placeholder="username" />
</Form.Item>
```

### Update Authentication Logic
Edit `src/App.tsx` in the `authProvider` object:
- `login`: Handle login request/response
- `logout`: Handle logout logic
- `check`: Verify authentication status
- `getIdentity`: Get current user data
- `getPermissions`: Get user roles/permissions

## Testing

### Start Development Server
```bash
npm run dev
```

### Test Login
1. Navigate to `http://localhost:5173/login`
2. Enter credentials
3. Check browser console for requests
4. Verify token is stored in localStorage

### Debug
- Check Network tab for API requests
- Check Console for errors
- Check Application > Local Storage for token

## CORS Configuration

Make sure your Spring Boot backend allows CORS:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## Security Notes

1. **Never commit `.env` file** - Add it to `.gitignore`
2. **Use HTTPS in production**
3. **Implement token refresh** for better security
4. **Add rate limiting** to prevent brute force attacks
5. **Validate tokens on backend** for every request
6. **Use secure password hashing** (BCrypt recommended)

## Troubleshooting

### Login fails with CORS error
- Check Spring Boot CORS configuration
- Verify API URL in `.env` file

### Token not being sent with requests
- Check browser console for errors
- Verify token is in localStorage
- Check axios headers in Network tab

### 401 errors after login
- Verify token format matches backend expectations
- Check token expiration
- Verify Authorization header format: `Bearer {token}`
