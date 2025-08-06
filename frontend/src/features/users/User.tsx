import { Link } from "react-router-dom";
import { Grid, Header, Image, Segment } from "semantic-ui-react";
import { User as UserType } from "../../types";

interface UserProps {
  user: UserType;
}

function User({ user }: UserProps) {
  const { firstName, lastName, avatar, name } = user;

  return (
    <Grid.Column
      // columns="equal"
      as={Link}
      to={`/users/${user._id}`}
    >
      <Segment>
        <Grid columns="equal" verticalAlign="middle">
          <Grid.Column mobile={3} width={5}>
            <Image src={avatar} circular size="medium" />
          </Grid.Column>
          <Grid.Column>
            <Header>
              {firstName} {lastName}
            </Header>
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
}

export default User;
