# Users Module with Bcrypt Password Hashing

This module provides secure user management with bcrypt password hashing.

## Features

- **Secure Password Hashing**: All passwords are hashed using bcrypt with 10 salt rounds
- **Password Validation**: Secure password comparison for authentication
- **User Authentication**: Login endpoint with credential validation
- **Password Management**: Change password functionality with current password verification
- **Security**: Password fields are automatically excluded from API responses
- **Required Passwords**: Passwords are always required and cannot be omitted

## API Endpoints

### User Management
- `POST /users` - Create a new user (password automatically hashed, **password required**)
- `GET /users` - Get all users (passwords excluded)
- `GET /users/:id` - Get user by ID (password excluded)
- `PUT /users/:id` - Update user (password hashed, **password required**)
- `DELETE /users/:id` - Delete user

### Authentication
- `POST /users/login` - User login with email/password validation
- `POST /users/:id/change-password` - Change user password

### File Upload
- `POST /users/:id/upload-image` - Upload profile image

## DTOs

- `CreateUserDto` - For creating new users (**password required**)
- `UpdateUserDto` - For updating users (password required, other fields optional)
- `LoginDto` - For user authentication
- `ChangePasswordDto` - For password changes

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt before storage
2. **Required Passwords**: Passwords are mandatory for all user operations
3. **Salt Rounds**: Configurable salt rounds (currently set to 10)
4. **Password Exclusion**: Passwords are never returned in API responses
5. **Secure Comparison**: Password comparison uses bcrypt.compare() for timing attack protection
6. **Input Validation**: All inputs are validated using class-validator

## Usage Examples

### Creating a User
```typescript
const userData = {
  fullName: "John Doe",
  email: "john@example.com",
  password: "securePassword123", // Password is required
  phone: 1234567890,
  role: UserRole.CUSTOMER
};

const user = await usersService.createUser(userData);
// Password is automatically hashed before saving
```

### Updating a User
```typescript
const updateData = {
  fullName: "John Smith",
  password: "newSecurePassword123" // Password is required for updates
};

const updatedUser = await usersService.update(userId, updateData);
// Password is automatically hashed before saving
```

### User Authentication
```typescript
const credentials = {
  email: "john@example.com",
  password: "securePassword123"
};

const user = await usersService.validateUser(credentials.email, credentials.password);
if (user) {
  // User authenticated successfully
}
```

### Changing Password
```typescript
const success = await usersService.changePassword(
  userId,
  "currentPassword",
  "newSecurePassword"
);
```

## Bcrypt Configuration

The salt rounds are configurable via the `SALT_ROUNDS` constant in the service:
- Current setting: 10 rounds
- Higher values = more secure but slower
- Recommended range: 10-12 for most applications

## Important Notes

- **Passwords are always required** for user creation and updates
- **No user can exist without a password** in the system
- **Password updates always require the new password** to be provided
- **All passwords are automatically hashed** before storage
- **Database constraint** ensures password field cannot be null
