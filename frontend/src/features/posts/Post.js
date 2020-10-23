import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Button, Header, Image, Label, Popup, Segment } from "semantic-ui-react"
import { selectCurrentUser } from "../user/userSlice"
import { selectAllUsers } from "../users/usersSlice"
import { deletePost, toggleVisibility } from "./postsSlice"

function Post({ post }) {
  console.log(post)
  const dispatch = useDispatch()
  const history = useHistory()

  const { user } = useSelector(selectCurrentUser)
  const { users } = useSelector(selectAllUsers)
  console.log(users)
  const author = users.find(u => u._id === post.authorId)
  console.log(author)

  if (!author || (!post.visible && user._id !== post.authorId)) return null

  const codeSnippet = `import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
const Component = () => {
  const codeString = '(num) => num + 1';
  return (
    <SyntaxHighlighter language="javascript" style={dark}>
      {codeString === false}
    </SyntaxHighlighter>
  );
};`

  return (
    <Segment.Group>
      <Segment>
        <Header>{post.title}</Header>
        <p>{post.content}</p>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          customStyle={{ borderRadius: 7 }}
          showLineNumbers
        >
          {codeSnippet}
        </SyntaxHighlighter>
      </Segment>
      <Segment clearing>
        <Label
          as={Link}
          to={`/users/${post.authorId}`}
          basic
          image
          size="medium"
        >
          <Image
            src={author.avatar}
            avatar
            alt={`${author.firstName} ${author.lastName}`}
          />
          {author.firstName} {author.lastName}
        </Label>
        {user._id === post.authorId && (
          <Button.Group size="small" floated="right" compact>
            <Popup
              content="Exibir/ocultar post"
              trigger={
                <Button
                  icon={post.visible ? "eye" : "eye slash"}
                  color={post.visible ? "blue" : "grey"}
                  basic
                  onClick={() => dispatch(toggleVisibility(post.id))}
                />
              }
              mouseEnterDelay={200}
            />
            <Popup
              mouseEnterDelay={200}
              on="click"
              wide
              content={
                <Button
                  fluid
                  color="red"
                  content="Apagar post"
                  size="tiny"
                  onClick={() => dispatch(deletePost(post.id))}
                />
              }
              trigger={<Button color="red" icon="delete" basic />}
            />
            <Popup
              mouseEnterDelay={200}
              content="Editar post"
              trigger={
                <Button
                  onClick={() => history.push(`/posts/${post.id}/edit`)}
                  basic
                  color="grey"
                  icon="edit"
                />
              }
            />
            <Popup
              mouseEnterDelay={200}
              content="Ver post"
              trigger={
                <Button
                  onClick={() => history.push(`/posts/${post.id}`)}
                  basic
                  color="grey"
                  icon="arrow right"
                />
              }
            />
          </Button.Group>
        )}
      </Segment>
    </Segment.Group>
  )
}

export default Post
