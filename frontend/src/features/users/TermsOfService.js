import React from "react"
import { useHistory } from "react-router-dom"
import { Button, Container, Header, Segment } from "semantic-ui-react"

function TermsOfService() {
  const history = useHistory()

  return (
    <Segment basic>
      <Container>
        <Header size="huge">Termos de serviço</Header>
        <Button
          content="Voltar"
          icon="arrow left"
          onClick={() => history.goBack()}
        />
      </Container>
    </Segment>
  )
}

export default TermsOfService
