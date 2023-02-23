import React, { useState } from 'react';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell, Navbar, Header } from '@mantine/core';
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
  console.log({ content });
  return (
    <div>
      <Stack>
        <button onClick={() => setContent('home')}>Home</button>
        <button onClick={() => setContent('coding')}>Coding</button>

        <button onClick={() => setContent('movement')}>Martial Arts</button>
        <button onClick={() => setContent('clothing')}>Clothing</button>
        <button onClick={() => setContent('admin')}>Admin</button>
      </Stack>{' '}
    </div>
  );

  // interface Props {
  //   blogData: { title: string; content: string };
  //   setBlogData: Function;
  // }

  // const codingData = {
  //   title: 'Coding',
  //   content: 'Content about Coding',
  // };
  // const fightingData = {
  //   title: 'Martial Arts',
  //   content: 'Content about fighting',
  // };
  // const clothingData = {
  //   title: 'Style Blog',
  //   content: 'Content about Clothing',
  // };
  // const [blogData, setBlogData] = useState<{ title: string; content: string }>({
  //   title: '',
  //   content: '',
  // });
  // return (
  //   <Stack
  //     style={{ display: 'flex' }}
  //     spacing="md"
  //   >
  //     <BrowserRouter>
  //       <Link to={'/'}>Home </Link>
  //       <Link to={'/codingBlog'}>Coding </Link>

  //       <Link to={'/MovementBlog'}>Martial Arts </Link>
  //       <Link to={'/styleBlog'}>Style </Link>
  //       <Link to={'/admin'}>Admin </Link>

  {
    /* <Routes>
          <Route
            path="/"
            element={<App></App>}
          />
          <Route
            path="/login"
            element={
              <Login
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              ></Login>
            }
          />

          <Route
            path="/codingBlog"
            element={
              <Blog
                blogData={codingData}
                setBlogData={setBlogData}
              ></Blog>
            }
          ></Route>
          <Route
            path="/movementBlog"
            element={
              <Blog
                blogData={fightingData}
                setBlogData={setBlogData}
              ></Blog>
            }
          ></Route>
          <Route
            path="/styleBlog"
            element={
              <Blog
                blogData={clothingData}
                setBlogData={setBlogData}
              ></Blog>
            }
          ></Route>
        </Routes> */
  }
  //   </BrowserRouter>
  // </Stack>
  // );
};

export { MyNav };
