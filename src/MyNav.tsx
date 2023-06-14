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
    // <MediaQuery
    //   query="(min-width: 50em)"
    //   styles={{ fontSize: rem(20) }}
    // >
    <div>
      <Stack>
        <Button
          // color="gray"
          // // radius="xl"
          // size="md"
          // // compact
          // uppercase
          //should style this globally but howwwwww?????
          // sx={(theme) => ({
          //   '@media (min-width:500)': {
          //     fontSize: '16px',
          //   },
          // })}
          onClick={() => {
            setContent('home');
            setOpened(false);
          }}
        >
          Home
        </Button>
        <Button
          // color="dark"
          // font-size="30px"
          // radius="xl"
          // size="xl"
          // compact
          // uppercase
          onClick={() => {
            setContent('about');
            setOpened(false);
          }}
        >
          About
        </Button>
        <Button
          onClick={() => {
            setContent('contact');
            setOpened(false);
          }}
        >
          Contact
        </Button>

        <Button
          onClick={() => {
            setContent('coding');
            setOpened(false);
          }}
        >
          Portfolio
        </Button>

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
    // </MediaQuery>
  );
};

export { MyNav };
