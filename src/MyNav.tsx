import React from 'react';
import { Button, Affix, MediaQuery, Stack, rem } from '@mantine/core';

interface Props {
  content: string;
  setContent: Function;
  setOpened: Function;
}

const MyNav: React.FC<Props> = ({ content, setContent, setOpened }) => {
  return (
    // <MediaQuery
    //   query="(min-width: 50em)"
    //   styles={{ fontSize: rem(20) }}
    // >
    <div>
      <Stack>
        <Button
          color="gray"
          // radius="xl"
          size="md"
          // compact
          uppercase
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
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          onClick={() => {
            setContent('about');
            setOpened(false);
          }}
        >
          About
        </Button>
        <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          onClick={() => {
            setContent('contact');
            setOpened(false);
          }}
        >
          Contact
        </Button>

        <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          onClick={() => {
            setContent('coding');
            setOpened(false);
          }}
        >
          Portfolio
        </Button>

        <Affix></Affix>
        <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          style={{
            position: 'absolute',
            bottom: '0px',
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
