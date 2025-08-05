import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const initialState = {
  state: "idle",
  posts: [
    {
      id: "1",
      authorId: "5f8f6171af18547f7dbbc8d5",
      title: "Teste",
      content: "Look at the following code snippet:",
      visible: true,
    },
    {
      id: "2",
      authorId: "5f8f6171af18547f7dbbc8d5",
      title: "Teste",
      content: "Hello",
      visible: true,
    },
  ],
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/posts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to fetch posts"
      );
    }
  }
);

export const postAdded = createAsyncThunk(
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
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to create post"
      );
    }
  }
);

export const updatePost = createAsyncThunk(
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
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to update post"
      );
    }
  }
);

export const removePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/posts/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to delete post"
      );
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const posts = state.posts;
      const postIndex = posts.findIndex((p) => p._id === action.payload.id);
      if (postIndex > -1)
        posts[postIndex] = {
          ...posts[postIndex],
          ...action.payload,
        };
    },
    toggleVisibility: (state, action) => {
      const post = state.posts.find((p) => p._id === action.payload);
      if (post) {
        post.visible = !post.visible;
      }
    },
    deletePost: (state, action) => {
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
        state.state = "idle";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.state = "error";
        state.posts = [];
      })
      .addCase(postAdded.pending, (state, action) => {
        state.state = "loading";
      })
      .addCase(postAdded.fulfilled, (state, action) => {
        state.state = "idle";
        state.posts.unshift(action.payload); // Add new post to the beginning
      })
      .addCase(postAdded.rejected, (state, action) => {
        state.state = "error";
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

export const selectAllPosts = (state) => state.posts;
export const selectPostById = (id) => (state) =>
  state.posts.posts.find((post) => post._id === id);
export const selectPostsByAuthor = (id) => (state) =>
  state.posts.posts.filter((post) => post.authorId._id === id);

export const usePostAuthor = (post) => {
  // Since posts now come populated from backend, we can directly return the author
  return post?.authorId || null;
};

export const useAllPosts = () => useSelector(selectAllPosts);

export default postsSlice.reducer;
