import React from "react"
import { useSelector } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import { Button, Container, Header, Segment } from "semantic-ui-react"
import { selectCurrentUser } from "../user/userSlice"
import Post from "./Post"
import { selectAllPosts } from "./postsSlice"

function PostList() {
  const { state, posts } = useSelector(selectAllPosts)
  const { user } = useSelector(selectCurrentUser)

  if (!user.email) return <Redirect to="/login" />

  const renderedPosts = (user.email ? posts : posts.filter(p => p.visible)).map(
    post => {
      return <Post key={post.id} post={post} />
    }
  )

  return (
    <Segment basic>
      <Container loading={state === "loading"}>
        <Header size="huge">Posts</Header>
        {renderedPosts}

        <Button
          primary
          as={Link}
          to="/posts/add"
          icon="write"
          content="Novo Post"
          labelPosition="left"
        />
      </Container>
    </Segment>
  )
}

export default PostList
