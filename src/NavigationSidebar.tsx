import React from "react";
import { Button, Stack, Affix } from "@mantine/core";
import { Link } from "react-router-dom";

interface Props {
  setOpened: Function;
}

const NavigationSidebar: React.FC<Props> = ({ setOpened }) => {
  return (
    <div
      style={{
        position: "fixed", // Fixed position to make it always visible
        top: 0,
        left: 0,
        height: "90vh", // Full viewport height
        width: "20vw", // Minimal width for a sidebar
        backgroundColor: "#333", // Dark background for the sidebar
        color: "#fff", // White text color
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center buttons
        justifyContent: "space-between", // Space between buttons
        paddingTop: "20px",
        paddingBottom: "20px",
        boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        transition: "width 0.3s ease", // Smooth width transition
      }}
    >
      <Stack spacing="xs">
        {["home", "about", "contact", "coding", "sculpture"].map((item) => (
          <Button
            key={item}
            onClick={() => setOpened(false)} // Close the menu when clicked
            component={Link}
            to={`/${item}`} // Route to the path
            variant="subtle"
            color="gray"
            style={{
              width: "100%",
              height: "50px", // Consistent button size
              textAlign: "center", // Center text inside button
              padding: "0",
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: "#fff",
              fontSize: "16px",
              lineHeight: "50px",
              transition: "background-color 0.3s ease", // Smooth background change
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#444"; // Hover background
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"; // Reset background
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Button>
        ))}
      </Stack>

      <Button
        style={{
          width: "100%",
          height: "50px",
          textAlign: "center",
          padding: "0",
          border: "none",
          backgroundColor: "transparent",
          color: "#fff",
          fontSize: "16px",
          lineHeight: "50px",
          transition: "background-color 0.3s ease",
        }}
        component={Link}
        to="/admin"
        onClick={() => setOpened(false)} // Close the menu when clicked
      ></Button>
    </div>
  );
};

export { NavigationSidebar };
