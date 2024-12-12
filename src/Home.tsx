import React, { useState } from "react";
import { Container, Center, Text, Box } from "@mantine/core";
import "./App.css";
const stickFigures = Array.from({ length: 12 }, () => ({
  body: [" o ", "/|\\", "/ \\"],
}));

const StickFigure: React.FC<{
  figure: string[];
  hovered: boolean;
  index: number;
}> = ({ figure, hovered, index }) => {
  // raised hands
  const displayedFigure = hovered ? [" o ", "\\|/", "/ \\"] : figure;

  const angle = (index / stickFigures.length) * 2 * Math.PI;
  const radius = 200;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <Box
      className={`stick-figure ${hovered ? "raised" : "lowered"}`} // Apply class based on hover state
      style={{
        position: "absolute",
        top: `calc(50% + ${y}px)`,
        left: `calc(50% + ${x}px)`,
        textAlign: "center",
        cursor: "pointer",
        fontFamily: "monospace",
      }}
    >
      {displayedFigure.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </Box>
  );
};

const Home: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Container
      size="md"
      style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Center style={{ flexDirection: "column", zIndex: 1, width: "40%" }}>
        <Text size="lg" weight={700} align="center" mb="lg">
          :::
        </Text>
        <Text size="lg" weight={700} align="center" mb="lg">
          Matvi Mykula
        </Text>
        <Text size="lg" weight={700} align="center" mb="lg">
          :::
        </Text>
        <Text size="sm" align="center" color="dimmed">
          Around here we seriously love to code, explore new things, make art,
          move, oxford commas, and being a try-hard.
        </Text>
      </Center>
      {stickFigures.map((figure, index) => (
        <Box
          key={index}
          onMouseEnter={() => {
            setHoveredIndex(index);
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <StickFigure
            figure={figure.body}
            hovered={hoveredIndex === index} // Hovered state check
            index={index}
          />
        </Box>
      ))}
    </Container>
  );
};

export { Home };
