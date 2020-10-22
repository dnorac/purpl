import React from "react"
import { useSelector } from "react-redux"
import { Link, Redirect, useRouteMatch } from "react-router-dom"
import { Button, Container, Header, Image, Segment } from "semantic-ui-react"
import { selectCurrentUser } from "../user/userSlice"
import { selectUserById } from "../users/usersSlice"
import { selectPostById } from "./postsSlice"

const Post = ({ post }) => {
  const author = useSelector(selectUserById(post.authorId))

  return (
    <Segment.Group>
      <Segment>
        <Header size="huge">{post.title}</Header>
        {post.content}
      </Segment>
      <Segment>
        <Container textAlign="center">
          <Link to={`/users/${author._id}`}>
            <Header size="large">
              <Image src={author.avatar} avatar />
              {author.firstName} {author.lastName}
            </Header>
          </Link>
        </Container>
      </Segment>
    </Segment.Group>
  )
}

function SinglePostPage() {
  const {
    params: { postId },
  } = useRouteMatch()
  const post = useSelector(selectPostById(postId))

  const { user } = useSelector(selectCurrentUser)

  if (!user.email) return <Redirect to="/login" />

  if (!post)
    return (
      <div className="post-list">
        <h1>Post não encontrado! :(</h1>
        <Link to="/posts" className="button">
          Voltar
        </Link>
      </div>
    )

  return (
    <Segment basic>
      <Container>
        <Post post={post} />
        <Button as={Link} to="/posts" className="button">
          Voltar
        </Button>
      </Container>
    </Segment>
  )
}

export default SinglePostPage
