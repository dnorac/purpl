import { Button, Container, Paper, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

function PasswordRecovery() {
  const navigate = useNavigate();

  return (
    <Container>
      <Paper p="xl">
        <Title order={1} mb="lg">
          Recuperar conta
        </Title>
        <Button
          variant="outline"
          leftSection={<IconArrowLeft size={14} />}
          onClick={() =>
            navigate({
              to: "..",
            })
          }
        >
          Voltar
        </Button>
      </Paper>
    </Container>
  );
}

export default PasswordRecovery;
