import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Post, PostsState } from "../../types";

interface CreatePostPayload {
  authorId: string;
  title: string;
  content: string;
  visible: boolean;
  callback?: () => void;
}

interface UpdatePostPayload {
  id: string;
  title: string;
  content: string;
  visible: boolean;
}

const initialState: PostsState = {
  state: "idle",
  posts: [
    {
      _id: "1",
      authorId: "5f8f6171af18547f7dbbc8d5",
      title: "Teste",
      content: "Look at the following code snippet:",
      date: new Date().toISOString(),
      visible: true,
    },
    {
      _id: "2",
      authorId: "5f8f6171af18547f7dbbc8d5",
      title: "Teste",
      content: "Hello",
      date: new Date().toISOString(),
      visible: true,
    },
  ],
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[], void>(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/posts");
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.error || "Failed to fetch posts"
      );
    }
  }
);

export const postAdded = createAsyncThunk<Post, CreatePostPayload>(
  "posts/addPost",
  async ({ authorId, title, content, visible, callback }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "/api/posts",
        { title, content, visible },
        { withCredentials: true }
      );
      // Call the callback after successful post creation
      if (callback) callback();
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.error || "Failed to create post"
      );
    }
  }
);

export const updatePost = createAsyncThunk<Post, UpdatePostPayload>(
  "posts/updatePost",
  async ({ id, title, content, visible }, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `/api/posts/${id}`,
        { title, content, visible },
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.error || "Failed to update post"
      );
    }
  }
);

export const removePost = createAsyncThunk<string, string>(
  "posts/deletePost",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/posts/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.error || "Failed to delete post"
      );
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated: (
      state,
      action: PayloadAction<{ id: string; [key: string]: any }>
    ) => {
      const posts = state.posts;
      const postIndex = posts.findIndex((p) => p._id === action.payload.id);
      if (postIndex > -1)
        posts[postIndex] = {
          ...posts[postIndex],
          ...action.payload,
        };
    },
    toggleVisibility: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p._id === action.payload);
      if (post) {
        post.visible = !post.visible;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const posts = state.posts;
      posts.splice(
        posts.findIndex((p) => p._id === action.payload),
        1
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.state = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.state = "failed";
        state.posts = [];
      })
      .addCase(postAdded.pending, (state, action) => {
        state.state = "loading";
      })
      .addCase(postAdded.fulfilled, (state, action) => {
        state.state = "succeeded";
        state.posts.unshift(action.payload); // Add new post to the beginning
      })
      .addCase(postAdded.rejected, (state, action) => {
        state.state = "failed";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export const { postUpdated, toggleVisibility, deletePost } = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts;
export const selectPostById = (id: string) => (state: RootState) =>
  state.posts.posts.find((post) => post._id === id);
export const selectPostsByAuthor = (id: string) => (state: RootState) =>
  state.posts.posts.filter((post) => {
    if (typeof post.authorId === "string") {
      return post.authorId === id;
    }
    return post.authorId._id === id;
  });

export const usePostAuthor = (post: Post | null | undefined) => {
  // Since posts now come populated from backend, we can directly return the author
  if (!post) return null;
  if (typeof post.authorId === "string") return null; // Just ID, no author details
  return post.authorId;
};

export const useAllPosts = () => useSelector(selectAllPosts);

export default postsSlice.reducer;
