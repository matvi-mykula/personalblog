import React, { useState } from 'react';

import { MyNav } from 'MyNav';
import { MyContent } from 'MyContent';
import { ThemeSwitcher } from 'ColorScheme';

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
} from '@mantine/core';

const MyAppShell = () => {
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [content, setContent] = useState('home');
  // console.log({ content });
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme: colorScheme,
          fontFamily: 'Monospace',
          components: {
            Button: {
              styles: (theme, params: ButtonStylesParams, { variant }) => ({
                root: {
                  width: '90%',
                  height: '2.625rem',
                  padding: '0 1.875rem',
                  // color="gray"
                  // radius="xl"
                  // size="md"
                  // compact
                  // uppercase

                  borderRadius: '5%',
                  uppercase: true,
                  filled: {
                    backgroundColor:
                      colorScheme === 'dark'
                        ? theme.colors.dark[2]
                        : theme.colors.blue[5],
                    '&:hover': {
                      transform: 'scale(1.2)',
                      backgroundColor: 'black',
                    },
                  },
                },
              }),
            },
          },
        }}
        // withGlobalStyles
      >
        <AppShell
          styles={(theme) => ({
            // Button: (theme: {
            //   colorScheme: string;
            //   colors: { dark: any[]; gray: any[] };
            // }) => ({
            //   // Shared button styles are applied to all buttons
            //   root: { height: 42, padding: '0 30px', color: 'blue' },

            //   // These styles are applied only to buttons with outline variant
            //   outline: {
            //     // You can use any selectors inside (the same way as in createStyles function)
            //     '&:hover': {
            //       backgroundColor:
            //         theme.colorScheme === 'dark'
            //           ? theme.colors.dark[8]
            //           : theme.colors.gray[0],
            //     },
            //   },
            // }),
            main:
              theme.colorScheme === 'dark'
                ? {
                    /////define dark mode
                    color: 'white',
                    backgroundColor: theme.colors.dark[7],
                  }
                : {
                    ////define light mode
                    backgroundColor: theme.colors.blue[1],
                  },
          })}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <Navbar
              // style={{ background: theme.colorScheme.colors.blue[2] }}
              p="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 150, lg: 250 }}
            >
              <MyNav
                setOpened={setOpened}
                content={content}
                setContent={setContent}
              ></MyNav>
            </Navbar>
          }
          header={
            <Header
              height={{ base: 50, md: 70 }}
              p="md"
            >
              <Box
                style={{
                  maxWidth: '90vw',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100vw',
                }}
              >
                <MediaQuery
                  largerThan="sm"
                  styles={{ display: 'none' }}
                >
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    mr="xl"
                  />
                </MediaQuery>
                <Text
                  fw={700}
                  style={{
                    fontSize: 'calc(15px + 0.390625vw)',
                    color: colorScheme === 'dark' ? 'white' : 'black',
                  }}
                >
                  Personal Blog of Matvi
                </Text>
                <Box>
                  <ThemeSwitcher></ThemeSwitcher>
                </Box>
              </Box>
            </Header>
          }
        >
          <MyContent content={content}></MyContent>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export { MyAppShell };
