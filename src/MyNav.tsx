import React from 'react';
import { Button, Affix, MediaQuery, Stack, rem } from '@mantine/core';
import './App.css';

interface Props {
  content: string;
  setContent: Function;
  setOpened: Function;
  colorScheme: any;
}

const MyNav: React.FC<Props> = ({
  content,
  setContent,
  setOpened,
  colorScheme,
}) => {
  return (
    <div>
      <Stack>
    {['home', 'about', 'contact', 'coding'].map((item) => (
          <Button
            key={item}
            onClick={() => {
              setContent(item);
              setOpened(false);
            }}
            style={{
              width: '100%', 
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Button>
        ))}

        <Affix></Affix>
        <Button
          style={{
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',

            position: 'absolute',
            bottom: '0px',
            border: 'none',
          }}
          onClick={() => {
            setContent('admin');
            setOpened(false);
          }}
          variant="subtle"
        ></Button>
      </Stack>{' '}
    </div>
  );
};

export { MyNav };
