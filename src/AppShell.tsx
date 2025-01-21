import React, { useState } from "react";
import { NavigationSidebar } from "NavigationSidebar";
import { MyContent } from "CustomRoutes";
import { ThemeSwitcher } from "ColorScheme";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  Box,
  ButtonStylesParams,
} from "@mantine/core";
import { BrowserRouter as Router } from "react-router-dom";

const MyAppShell = () => {
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [content, setContent] = useState("home");

  return (
    <Router>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme: colorScheme,
            fontFamily: "Monospace",
            components: {
              Anchor: {
                styles: (theme, params: ButtonStylesParams, { variant }) => ({
                  root: {
                    color: colorScheme === "dark" ? "white" : "darkblue",
                  },
                }),
              },
              Button: {
                styles: (theme, params: ButtonStylesParams, { variant }) => ({
                  root: {
                    width: "90%",
                    height: "2.625rem",
                    padding: "0 1.875rem",

                    textTransform: "uppercase",
                    textDecoration: "uppercase",
                    borderRadius: "5px",
                    border: "1px solid black",
                    uppercase: true,
                    fontSize: "1.2rem",
                    backgroundColor:
                      colorScheme === "dark" ? "white" : "darkblue",
                    ...theme.fn.hover({
                      backgroundColor:
                        colorScheme === "dark" ? "lightblue" : "black",
                    }),
                    color: colorScheme === "dark" ? "black" : "white",
                  },
                }),
              },
              Header: {
                styles: (theme, params: ButtonStylesParams, { variant }) => ({
                  root: {
                    border: "1px solid black",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    justifyItems: "center",
                  },
                }),
              },
            },
          }}
          // withGlobalStyles
        >
          <AppShell
            styles={(theme) => ({
              main:
                theme.colorScheme === "dark"
                  ? {
                      /////define dark mode
                      color: "white",
                      backgroundColor: theme.colors.dark[7],
                    }
                  : {
                      ////define light mode
                      backgroundColor: theme.colors.blue[1],
                    },
            })}
            navbar={
              <Navbar
                p="md"
                hiddenBreakpoint="xl"
                hidden={!opened}
                style={{
                  position: "fixed", // This allows it to overlap

                  zIndex: 10, // Ensure it sits above the content
                  transition: "transform 0.3s ease-in-out", // Smooth animation for opening/closing
                  transform: opened ? "translateX(0)" : "translateX(-100%)", // Move the navbar off-screen when closed
                }}
              >
                <NavigationSidebar setOpened={setOpened} />
              </Navbar>
              // <Navbar p="md" hiddenBreakpoint="xl" hidden={!opened}>
              //   <NavigationSidebar setOpened={setOpened} />
              // </Navbar>
            }
            header={
              <Header height={{ base: 50 }} p="md">
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Burger
                    title="Open navigation"
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    mr="xl"
                  />
                  <div style={{ marginLeft: "auto" }}>
                    <ThemeSwitcher />
                  </div>
                </Box>
              </Header>
            }
          >
            <MyContent colorScheme={colorScheme} />
            {/* </AppShell>content={content} colorScheme={colorScheme}></MyContent> */}
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </Router>
  );
};

export { MyAppShell };
