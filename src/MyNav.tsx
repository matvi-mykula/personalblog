import React, { useState } from 'react';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Button, AppShell, Navbar, Header } from '@mantine/core';
import { Stack } from '@mantine/core';
import { Blog } from './Blog';
import { Login } from './Login';
import { App } from './Home';

interface Props {
  content: string;
  setContent: Function;
}

const MyNav: React.FC<Props> = ({ content, setContent }) => {
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
          onClick={() => setContent('home')}
        >
          Home
        </Button>
        <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          onClick={() => setContent('contact')}
        >
          Contact Me
        </Button>

        <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          onClick={() => setContent('coding')}
        >
          Coding
        </Button>

        <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          onClick={() => setContent('movement')}
        >
          Martial Arts
        </Button>
        {/* <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          onClick={() => setContent('clothing')}
        >
          Clothing
        </Button> */}
        <Button
          color="gray"
          radius="xl"
          size="md"
          compact
          uppercase
          onClick={() => setContent('admin')}
        >
          Admin
        </Button>
      </Stack>{' '}
    </div>
  );
};

export { MyNav };
