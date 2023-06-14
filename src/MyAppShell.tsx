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
  Anchor,
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
            Anchor: {
              styles: (theme, params: ButtonStylesParams, { variant }) => ({
                root: {
                  color: colorScheme === 'dark' ? 'white' : 'darkblue',
                },
              }),
            },
            Button: {
              styles: (theme, params: ButtonStylesParams, { variant }) => ({
                root: {
                  width: '90%',
                  height: '2.625rem',
                  padding: '0 1.875rem',

                  textTransform: 'uppercase',
                  textDecoration: 'uppercase',
                  borderRadius: '5px',
                  border: '1px solid black',
                  uppercase: true,
                  fontSize: '1.2rem',
                  backgroundColor:
                    colorScheme === 'dark' ? 'white' : 'darkblue',
                  ...theme.fn.hover({
                    backgroundColor:
                      colorScheme === 'dark' ? 'lightblue' : 'black',
                  }),
                  color: colorScheme === 'dark' ? 'black' : 'white',
                },
              }),
            },
            Header: {
              styles: (theme, params: ButtonStylesParams, { variant }) => ({
                root: {
                  border: '1px solid black',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  justifyItems: 'center',
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
              width={{ sm: 200, lg: 250 }}
            >
              <MyNav
                setOpened={setOpened}
                content={content}
                setContent={setContent}
                colorScheme={colorScheme}
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
                  verticalAlign: 'middle',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100vw',
                }}
              >
                <MediaQuery
                  largerThan="sm"
                  styles={{ display: 'none' }}
                >
                  <div>
                    <Burger
                      title="Open navigation"
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      mr="xl"
                    />
                  </div>
                </MediaQuery>
                <Text
                  fw={700}
                  style={{
                    fontSize: 'calc(18px + 0.390625vw)',
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
          <MyContent
            content={content}
            colorScheme={colorScheme}
          ></MyContent>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export { MyAppShell };
