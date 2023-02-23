import React from 'react';
import logo from './logo.svg';
import './App.css';
import codeSnippet from './images/codeSnippet.png';
import boxingUppercut from './images/boxingUppercut.jpeg';
import sillyBeachLex from './images/sillyBeachLex.jpeg';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Button, Form, Navbar, Card } from 'react-bootstrap';
import { AppShell, Navbar, Header } from '@mantine/core';

// import { Blog } from './Blog';
// interface Props {
//   blogData: { title: string; content: string };
//   setBlogData: Function;
// }
{
  /* <Props> = ({ blogData, setBlogData }) */
}

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>Personal Blog of Matvi Mykula</p>
      </header>
      <p className="homeBlurb">
        Hello there! Welcome! This blog was created by me with typescript.
        Please check out my other coding projects, martial arts training, and
        style posts!
      </p>
      {/* <Navbar className="boxes">
        <Link
          to={'/codingBlog'}
          className="headerLink"
        >
          <img
            // src={codeSnippet}
            alt="Coding"
          ></img>
          Coding Projects
        </Link>

        <Link
          to={'/fightingBlog'}
          className="headerLink"
        >
          <img
            src={boxingUppercut}
            alt="Boxing"
          ></img>
          Martial Arts
        </Link>
        <Link
          to={'/styleBlog'}
          className="headerLink"
        >
          <img
            src={sillyBeachLex}
            alt="Style"
          ></img>
          Style Blog
        </Link>
      </Navbar> */}
    </div>
  );
};

export { App };
