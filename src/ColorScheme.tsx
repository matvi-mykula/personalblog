import { ActionIcon, useMantineColorScheme, Button } from '@mantine/core';

import { useColorScheme } from '@mantine/hooks';
import React from 'react';

// import { SunIcon, MoonIcon } from '@modulz/radix-icons';

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
        <Button
          style={{
            backgroundColor: 'yellow',
            color: 'yellow',
            width: 18,
            height: 18,
          }}
        />
      ) : (
        <Button
          style={{
            backgroundColor: 'navy',
            color: 'navy',
            width: 18,
            height: 18,
          }}
        />
      )}
    </ActionIcon>
  );
};

export { ThemeSwitcher };
