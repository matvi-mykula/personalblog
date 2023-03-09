import React, { useEffect, useState } from 'react';
import { Login } from 'Login';
import { App } from 'Home';
import { useColorScheme } from '@mantine/hooks';
import { MyNav } from 'MyNav';
import { MyContent } from 'MyContent';
import { ThemeSwitcher } from 'ColorScheme';
import axios from 'axios';

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
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from '@mantine/core';
// import { SunIcon, MoonIcon } from '@modulz/radix-icons';

const MyAppShell = () => {
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
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
        theme={{ colorScheme: colorScheme }}
        withGlobalStyles
      >
        <AppShell
          styles={(theme) => ({
            main:
              theme.colorScheme === 'dark'
                ? {
                    /////define dark mode

                    backgroundColor: theme.colors.dark[7],
                    color: theme.colors.pastelpink,
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
              <div
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
                    // color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <Text
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'pink', deg: 45 }}
                  fw={700}
                  fz="lg"
                  ta="center"
                >
                  Personal Blog of Matvi
                </Text>
                <div
                // style={{ paddingLeft: '60vw' }}
                >
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

///////////////////////theme declaration///////////////////

interface MantineTheme {
  // Defines color scheme for all components, defaults to "light"
  colorScheme: 'light' | 'dark';

  // Controls focus ring styles:
  // auto – display focus ring only when user navigates with keyboard (default)
  // always – display focus ring when user navigates with keyboard and mouse
  // never – focus ring is always hidden (not recommended)
  focusRing: 'auto';

  // Change focus ring styles
  // focusRingStyles: {
  //   styles(theme: MantineTheme): CSSObject;
  //   resetStyles(theme: MantineTheme): CSSObject;
  //   inputStyles(theme: MantineThemeBase): CSSObject;
  // };

  // Determines whether motion based animations should be disabled for
  // users who prefer to reduce motion in their OS settings
  respectReducedMotion: boolean;

  // Determines whether elements that do not have pointer cursor by default
  // (checkboxes, radio, native select) should have it
  cursorType: 'default' | 'pointer';

  // Default border-radius used for most elements
  defaultRadius: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number;

  // White and black colors, defaults to '#fff' and '#000'
  white: '#fff';
  black: '#000';

  // Object of arrays with 10 colors
  colors: {
    'ocean-blue': [
      '#7AD1DD',
      '#5FCCDB',
      '#44CADC',
      '#2AC9DE',
      '#1AC2D9',
      '#11B7CD',
      '#09ADC3',
      '#0E99AC',
      '#128797',
      '#147885'
    ];
  };

  // Key of theme.colors
  primaryColor: 'red';

  // Index of color from theme.colors that is considered primary, Shade type is 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  primaryShade: { light: 0; dark: 5 };

  // Default gradient used in components that support `variant="gradient"` (Button, ThemeIcon, etc.)
  // defaultGradient: { deg: number; from: MantineColor; to: MantineColor };

  // font-family and line-height used in most components
  fontFamily: string;
  lineHeight: string | number;

  // Timing function used for animations, defaults to 'ease'
  transitionTimingFunction: string;

  // Monospace font-family, used in Code, Kbd and Prism components
  fontFamilyMonospace: string;

  // Sizes for corresponding properties
  fontSizes: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;
  radius: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;
  spacing: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;

  // Values used for box-shadow
  shadows: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;

  // Breakpoints used in some components to add responsive styles
  breakpoints: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>;

  // Styles added to buttons with `:active` pseudo-class
  // activeStyles: CSSObject;

  // h1-h6 styles, used in Title and TypographyStylesProvider components
  // headings: {
  //   fontFamily: CSSProperties['fontFamily'];
  //   fontWeight: CSSProperties['fontWeight'];
  //   sizes: {
  //     // See heading options below
  //     h1: Heading;
  //     h2: Heading;
  //     h3: Heading;
  //     h4: Heading;
  //     h5: Heading;
  //     h6: Heading;
  //   };
  // };

  // theme functions, see in theme functions guide
  // fn: MantineThemeFunctions;

  // Left to right or right to left direction, see RTL Support guide to learn more
  dir: 'ltr' | 'rtl';

  // Default loader used in Loader and LoadingOverlay components
  loader: 'oval' | 'bars' | 'dots';

  // defaultProps, styles and classNames for components
  // components: ComponentsOverride;

  // Global styles
  // globalStyles: (theme: MantineTheme) => CSSObject;

  // Add your own custom properties on Mantine theme
  other: Record<string, any>;
}

// interface Heading {
//   fontSize: CSSProperties['fontSize'];
//   fontWeight: CSSProperties['fontWeight'];
//   lineHeight: CSSProperties['lineHeight'];
// }

export { MyAppShell };
