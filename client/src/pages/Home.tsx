import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Group, Paper, Stack, TextInput, Text, Flex, Container } from "@mantine/core";

import { useSessionStore } from "../store";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const session = useSessionStore();

  const [room, setRoom] = React.useState(session.username);
  const [username, setUsername] = React.useState(session.username);
  const [error, setError] = React.useState<{ room: null | string; username: null | string }>({ room: null, username: null });

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsername(event.currentTarget.value);
  };

  const handleRoomChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setRoom(event.currentTarget.value);
  };

  const validateUsername = () => {
    if (username.length === 0) {
      setError((state) => ({ ...state, username: "Please provide an username" }));
      return false;
    } else if (username.length < 4) {
      setError((state) => ({ ...state, username: "Username should be atleast 4 characters" }));
      return false;
    } else {
      setError((state) => ({ ...state, username: null }));
      return true;
    }
  };

  const validateRoom = () => {
    if (room.length === 0) {
      setError((state) => ({ ...state, room: "Please provide a room" }));
      return false;
    } else if (room.length < 4) {
      setError((state) => ({ ...state, room: "Room should be atleast 4 characters" }));
      return false;
    } else {
      setError((state) => ({ ...state, room: null }));
      return true;
    }
  };

  const handleLogin = () => {
    const valid = validateUsername() && validateRoom();
    if (!valid) return;
    session.initialize(username);
    navigate(`/room/${room}`);
  };

  return (
    <Flex mih="100vh" align="center" justify="stretch" bg="gray.3">
      <Container size="xs" w="100%">
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" align="center" weight={500} mb="lg">
            Welcome to Stremeo
          </Text>
          <Stack>
            <TextInput required label="Username" error={error.username} value={username} onChange={handleUsernameChange} />
            <TextInput required label="Room" error={error.room} value={room} onChange={handleRoomChange} />
          </Stack>
          <Group position="right" mt="xl">
            <Button onClick={handleLogin}>Login</Button>
          </Group>
        </Paper>
      </Container>
    </Flex>
  );
};

export default HomePage;
