import React from 'react';
import { Button, Affix } from '@mantine/core';
import { Stack } from '@mantine/core';

interface Props {
  content: string;
  setContent: Function;
  setOpened: Function;
}

const MyNav: React.FC<Props> = ({ content, setContent, setOpened }) => {
  return (
    <div>
      <Stack>
        <Button
          color="gray"
          // radius="xl"
          size="md"
          // compact
          uppercase
          //should style this globally but howwwwww?????
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
  );
};

export { MyNav };
