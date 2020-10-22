import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
  state: "idle",
  posts: [
    {
      id: "1",
      authorId: "5f8f6171af18547f7dbbc8d5",
      title: "Teste",
      content: "Hello",
      visible: true,
    },
    {
      id: "2",
      authorId: "5f8f6171af18547f7dbbc8d5",
      title: "Teste",
      content: "Hello",
      visible: true,
    },
    // {
    //   id: "1",
    //   authorId: "1",
    //   title: "First Post!",
    //   content: "Hello!",
    //   visible: true,
    // },
    // {
    //   id: "2",
    //   authorId: "1",
    //   title: "Second Post!",
    //   content: "More text",
    //   visible: false,
    // },
    // {
    //   id: "3",
    //   authorId: "1",
    //   title: "Third Post!",
    //   content: "Yet another text",
    //   visible: true,
    // },
  ],
}

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (payload, thunkAPI) => {
    return []
  }
)

export const postAdded = createAsyncThunk(
  "posts/addPost",
  async ({ authorId, title, content, visible, callback }, thunkAPI) => {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve({
          id: nanoid(),
          authorId,
          title,
          content,
          visible,
        })
        callback()
      }, 300)
    })
  }
)

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const posts = state.posts
      const postIndex = posts.findIndex(p => p.id === action.payload.id)
      if (postIndex > -1)
        posts[postIndex] = {
          ...posts[postIndex],
          ...action.payload,
        }
    },
    toggleVisibility: (state, action) => {
      const post = state.posts.find(p => p.id === action.payload)
      post.visible = !post.visible
    },
    deletePost: (state, action) => {
      const posts = state.posts
      posts.splice(
        posts.findIndex(p => p.id === action.payload),
        1
      )
    },
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      return state
      return { state: "idle", posts: action.payload }
    },
    [fetchPosts.rejected]: (state, action) => {
      return { state: "error", posts: [] }
    },
    [postAdded.pending]: (state, action) => {
      state.state = "loading"
    },
    [postAdded.fulfilled]: (state, action) => {
      state.state = "idle"
      state.posts.push(action.payload)
    },
  },
})

export const { postUpdated, toggleVisibility, deletePost } = postsSlice.actions

export const selectAllPosts = state => state.posts
export const selectPostById = id => state =>
  state.posts.posts.find(post => post.id === id)
export const selectPostsByAuthor = id => state =>
  state.posts.posts.filter(post => post.authorId === id)

export default postsSlice.reducer
