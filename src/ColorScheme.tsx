import { ActionIcon, useMantineColorScheme } from '@mantine/core';

import React from 'react';

const ThemeSwitcher: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? (
        <img
          style={{
            backgroundColor: 'yellow',

            border: 'none',
          }}
          src="./sun.svg"
          alt="dark theme"
        ></img>
      ) : (
        <img
          style={{
            backgroundColor: 'navy',
          }}
          src="./moon.svg"
          alt="light theme"
        ></img>
      )}
    </ActionIcon>
  );
};

export { ThemeSwitcher };
