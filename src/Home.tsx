import React from "react";
import { Container, Center, Text } from "@mantine/core";

const Home: React.FC = () => {
  return (
    <Container
      size="md"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Center style={{ flexDirection: "column" }}>
        <Text size="xl" weight={700} align="center" mb="lg">
          ::: Hey! My name is Mat :::
        </Text>
        <Text size="md" align="center" color="dimmed">
          Around here we seriously love to code, explore new things, make art,
          move, oxford commas, and being a try hard.
        </Text>
      </Center>
    </Container>
  );
};

export { Home };
