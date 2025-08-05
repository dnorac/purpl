import { useNavigate } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";

function PasswordRecovery() {
  const navigate = useNavigate();

  return (
    <Segment basic>
      <Container>
        <Header size="huge">Recuperar conta</Header>
        <Button
          content="Voltar"
          icon="arrow left"
          onClick={() => navigate(-1)}
        />
      </Container>
    </Segment>
  );
}

export default PasswordRecovery;
