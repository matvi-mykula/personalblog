import { Box, Image, Text, ActionIcon } from "@mantine/core";
import { useState } from "react";

interface ContentSquareProps {
  imageSrc: string;
  title: string;
  onTitleClick: () => void;
}

const ContentSquare = ({
  imageSrc,
  title,
  onTitleClick,
}: ContentSquareProps) => {
  return (
    <Box
      sx={{
        width: "200px",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Image src={imageSrc} alt={title} width="100%" height={200} fit="cover" />
      <Text
        onClick={onTitleClick}
        sx={{
          fontWeight: 600,
          fontSize: "16px",
          marginTop: "8px",
          color: "#007bff",
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        {title}
      </Text>
    </Box>
  );
};

const ArtGrid = () => {
  const handleTitleClick = () => {
    alert("Title clicked!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <ContentSquare
        imageSrc="/images/shellLampV1-1.jpg"
        title="Shell Lamp"
        onTitleClick={handleTitleClick}
      />
      <ContentSquare
        imageSrc="/images/shellLampV1-2.jpg"
        title="Ocean Breeze Lamp"
        onTitleClick={handleTitleClick}
      />
      {/* Add more ContentSquare components as needed */}
    </Box>
  );
};

export { ArtGrid };
