import React, { useEffect, useState } from 'react';
import { Login } from 'Login';
// import { AppRouter } from 'AppRouter';
import { App } from 'Home';
import { Button } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { MyNav } from 'MyNav';
// import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { MyContent } from 'MyContent';
import { ThemeSwitcher } from 'ColorScheme';

import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Card,
} from '@mantine/core';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from '@mantine/core';

const MyAppShell = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [content, setContent] = useState('home');
  console.log({ content });
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme: colorScheme }}
        withGlobalStyles
      >
        <AppShell
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
          // styles={{
          //   main: {
          //     background:
          //       theme.colorScheme === 'dark'F
          //         ? theme.colors.dark[8]
          //         : theme.colors.gray[0],
          //   },
          // }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <Navbar
              p="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              {/* <BrowserRouter>
            <Link to={'/'}>Home </Link>
            <Link to={'/admin'}>Admin </Link>
          </BrowserRouter> */}
              <MyNav
                content={content}
                setContent={setContent}
              ></MyNav>
              {/* <DarkModeToggle></DarkModeToggle>{' '} */}
            </Navbar>
          }
          // aside={
          //   <MediaQuery
          //     smallerThan="sm"
          //     styles={{ display: 'none' }}
          //   >
          //     <Aside
          //       p="md"
          //       hiddenBreakpoint="sm"
          //       width={{ sm: 200, lg: 300 }}
          //     >
          //       <Text>Application sidebar</Text>
          //     </Aside>
          //   </MediaQuery>
          // }
          // footer={
          //   <Footer
          //     height={60}
          //     p="md"
          //   >
          //     Application footer
          //   </Footer>
          // }
          header={
            <Header
              height={{ base: 50, md: 70 }}
              p="md"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
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
                    // color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <Text>Personal Blog of Matvi</Text>
                <div style={{ paddingLeft: '60vw' }}>
                  <ThemeSwitcher></ThemeSwitcher>
                </div>
              </div>
            </Header>
          }
        >
          <MyContent content={content}></MyContent>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

// function DarkModeToggle() {
//   const { colorScheme, changeColorScheme } = useColorScheme();

//   const handleClick = () => {
//     changeColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
//   };

//   return (
//     <Button onClick={handleClick}>
//       {colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}
//     </Button>
//   );
// }

export { MyAppShell };
