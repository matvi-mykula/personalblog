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
            // color: 'yellow',
            // width: 18,
            // height: 18,
            border: 'none',
          }}
          src="./sun.svg"
          alt="nothing here"
        ></img>
      ) : (
        <img
          style={{
            backgroundColor: 'navy',
            // color: 'yellow',
            // width: 18,
            // height: 18,
          }}
          src="./moon.svg"
          alt="nothing here"
        ></img>
      )}
    </ActionIcon>
  );
};

export { ThemeSwitcher };
