import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";

function PasswordRecovery() {
  const history = useHistory();

  return (
    <Segment basic>
      <Container>
        <Header size="huge">Recuperar conta</Header>
        <Button
          content="Voltar"
          icon="arrow left"
          onClick={() => history.goBack()}
        />
      </Container>
    </Segment>
  );
}

export default PasswordRecovery;
