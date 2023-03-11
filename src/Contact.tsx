import React from 'react';
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
  Box,
} from '@mantine/core';
const Contact: React.FC = () => {
  return (
    <Box>
      <Text>
        Send me an email at ...{' '}
        <a href="matt.pronchick@gmail.com?subject=Blog%20Inquiry">
          matt.pronchick@gmail.com
        </a>
      </Text>
    </Box>
  );
};

export { Contact };
