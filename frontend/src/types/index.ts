export interface User {
  _id: string;
  email: string;
  name: string;
  dateJoined: string;
  lastSeen: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  date: string;
  authorId: User | string;
  visible: boolean;
}

// API payload types
export interface AddPostPayload {
  authorId: string;
  title: string;
  content: string;
  visible: boolean;
  callback?: () => void;
}

export interface UpdatePostPayload {
  id: string;
  title: string;
  content: string;
  visible: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  privacyPolicy: boolean;
  termsOfService: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  state: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface PostsState {
  posts: Post[];
  state: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface UsersState {
  users: User[];
  state: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
