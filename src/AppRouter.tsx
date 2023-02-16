import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import { App } from './Home';
import './App.css';
import { Blog } from './Blog';
import { Login } from './Login';
interface adminProps {
  initialAdminStatus: boolean;
}
const AppRouter: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  interface Props {
    blogData: { title: string; content: string };
    setBlogData: Function;
  }

  const codingData = {
    title: 'Coding',
    content: 'Content about Coding',
  };
  const fightingData = {
    title: 'Martial Arts',
    content: 'Content about fighting',
  };
  const clothingData = {
    title: 'Style Blog',
    content: 'Content about Clothing',
  };
  //   enum ThreeBlogs {
  //     Coding = 'coding',
  //     Fighting = 'fighting',
  //     Clothes = 'clothes',
  //     Null = 'null',
  //   }
  //   const [blogSubject, setBlogSubject] = useState<ThreeBlogs>(ThreeBlogs.Null);
  const [blogData, setBlogData] = useState<{ title: string; content: string }>({
    title: '',
    content: '',
  });
  return (
    <div>
      <BrowserRouter>
        <header className="App-links">
          <Link
            to={'/'}
            className="headerLink"
          >
            Home{' '}
          </Link>
          <Link
            to={'/login'}
            className="headerLink"
          >
            Login{' '}
          </Link>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <App
              // blogData={blogData}
              // setBlogData={setBlogData}
              // blogSubject={blogSubject}
              // setBlogSubject={setBlogSubject}
              ></App>
            }

            // element={
            // //   <App
            // //     userData={userData}
            // //     setUserData={setUserData}
            // //   />
            // }
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
            path="/fightingBlog"
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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export { AppRouter };
