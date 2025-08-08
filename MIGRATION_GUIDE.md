# [ARCHIVED] This migration guide is now obsolete. The migration to Mantine, @tanstack/react-router, and removal of SASS/Semantic UI is complete. See README.md for the current tech stack and setup instructions.

---

# Purpl Project Dependencies Migration Guide

## Overview

This document outlines the major dependency updates and breaking changes that have been applied to modernize the Purpl project.

## Major Updates Applied

### Package Dependencies Updated

#### Frontend (`frontend/package.json`)

- ✅ **node-sass** → **sass** (^1.77.8) - Eliminates Python 2 dependency
- ✅ **react** & **react-dom**: ^17.0.1 → ^18.3.1
- ✅ **@reduxjs/toolkit**: ^1.4.0 → ^2.2.7
- ✅ **react-redux**: ^7.2.1 → ^9.1.2
- ✅ **react-router-dom**: ^5.2.0 → ^6.26.0 (BREAKING CHANGES)
- ✅ **react-hook-form**: ^6.9.4 → ^7.52.2 (BREAKING CHANGES)
- ✅ **axios**: ^0.20.0 → ^1.7.3
- ✅ **@testing-library/\***: Updated to latest versions
- ✅ **prettier**: ^2.2.1 → ^3.3.3
- ✅ **eslint-plugin-prettier**: ^3.1.4 → ^5.2.1

#### Backend (`backend/package.json`)

- ✅ **mongoose**: ^5.10.9 → ^8.5.2 (BREAKING CHANGES)
- ✅ **express**: ^4.17.1 → ^4.19.2
- ✅ **helmet**: ^4.1.1 → ^7.1.0
- ✅ **jsonwebtoken**: ^8.5.1 → ^9.0.2
- ✅ **bcrypt**: ^5.0.0 → ^5.1.1
- ✅ **dotenv**: ^8.2.0 → ^16.4.5
- ✅ **nodemon**: ^2.0.6 → ^3.1.4
- ✅ **nanoid**: ^3.1.12 → ^5.0.7
- ✅ **eslint**: ^7.14.0 → ^9.8.0

#### Root (`package.json`)

- ✅ **concurrently**: ^5.3.0 → ^8.2.2
- ✅ **eslint-plugin-react**: ^7.21.5 → ^7.35.0

## Breaking Changes Requiring Code Updates

### 1. React Router v5 → v6 (CRITICAL)

#### Already Applied:

- ✅ **App.js**: `Switch` → `Routes`, route children → `element` prop

#### Still Need to Apply:

The following components need to be updated to use React Router v6 patterns:

```javascript
// Replace these imports:
import { useHistory, useRouteMatch, Redirect } from "react-router-dom";

// With these:
import {
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";
```

**Files needing updates:**

- `frontend/src/features/posts/AddPostForm.js`
- `frontend/src/features/posts/EditPostForm.js`
- `frontend/src/features/posts/Post.js`
- `frontend/src/features/posts/PostList.js`
- `frontend/src/features/posts/SinglePostPage.js`
- `frontend/src/features/user/LoginForm.js`
- `frontend/src/features/user/PasswordRecovery.js`
- `frontend/src/features/user/UpdateProfileForm.js`
- `frontend/src/features/users/RegisterForm.js`
- `frontend/src/features/users/UserList.js`
- `frontend/src/features/users/SingleUserPage.js`
- `frontend/src/features/users/CurrentUser.js`
- `frontend/src/features/users/TermsOfService.js`
- `frontend/src/features/users/PrivacyPolicy.js`

### 2. React Hook Form v6 → v7 (CRITICAL)

The `register` method signature has changed:

```javascript
// OLD (v6):
useEffect(() => {
  register({ name: "email" }, { required: "Digite seu email." });
}, [register]);

// NEW (v7):
const { register } = useForm({
  defaultValues: { email: "" },
});

// In JSX:
<input {...register("email", { required: "Digite seu email." })} />;
```

**Files needing updates:**

- `frontend/src/features/user/LoginForm.js`
- `frontend/src/features/users/RegisterForm.js`
- `frontend/src/features/posts/AddPostForm.js`
- `frontend/src/features/posts/EditPostForm.js`
- `frontend/src/features/user/UpdateProfileForm.js`

### 3. Redux Toolkit extraReducers (BREAKING)

Need to update from object syntax to builder syntax:

```javascript
// OLD:
extraReducers: {
  [thunkName.pending]: (state, action) => { /* ... */ },
  [thunkName.fulfilled]: (state, action) => { /* ... */ },
}

// NEW:
extraReducers: (builder) => {
  builder
    .addCase(thunkName.pending, (state, action) => { /* ... */ })
    .addCase(thunkName.fulfilled, (state, action) => { /* ... */ });
}
```

**Files needing updates:**

- `frontend/src/features/user/userSlice.js`
- `frontend/src/features/users/usersSlice.js`
- `frontend/src/features/posts/postsSlice.js`

### 5. Mongoose v5 → v8 (POTENTIAL BREAKING)

Review for compatibility issues:

- Connection string format
- Deprecated methods
- Schema definitions

**Files to review:**

- `backend/src/config/db.js`
- `backend/src/users/model.js`
- `backend/src/posts/model.js`

## Migration Status

### ✅ Completed

1. Package.json updates for all three directories
2. Basic React Router v6 setup in App.js
3. All dependencies installed successfully

### 🔄 In Progress / Next Steps

1. Update all React Router usage (useHistory, useRouteMatch, Redirect)
2. Update all React Hook Form v7 patterns
3. Update Redux Toolkit extraReducers to builder syntax
4. Test Mongoose compatibility
5. Update any TypeScript types if needed
6. Run tests and fix any remaining issues

### 🧪 Testing Required

After applying the remaining changes:

1. `npm run start` in root directory
2. Test all user flows (registration, login, posting, etc.)
3. Verify SCSS compilation works with new sass package
4. Check for any console errors or warnings

## Notes

- All packages installed with `--legacy-peer-deps` due to some compatibility issues
- Some deprecation warnings are expected but don't affect functionality
- The project should be significantly more secure and maintainable after these updates
- Python 2 dependency has been eliminated completely
