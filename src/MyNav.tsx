import React, { useState } from 'react';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button, AppShell, Navbar, Header, Affix } from '@mantine/core';
import { Stack } from '@mantine/core';
import { Blog } from './Blog';
import { Login } from './Login';
import { App } from './Home';

interface Props {
  content: string;
  setContent: Function;
  setOpened: Function;
}

const MyNav: React.FC<Props> = ({ content, setContent, setOpened }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div>
      <Stack>
        <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          //should style this globally
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
