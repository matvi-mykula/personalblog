import React from 'react';
import logo from './logo.svg';
import './App.css';
import codeSnippet from './images/codeSnippet.png';
import boxingUppercut from './images/boxingUppercut.jpeg';
import sillyBeachLex from './images/sillyBeachLex.jpeg';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
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
      {/* <img
        src="https://drive.google.com/uc?id=1W5gOEMGbkqcNYbw9RSdYY5UgaQUQQNrt"
        alt="none"
      /> */}

      <header className="App-header">
        <p>Personal Blog of Matvi Mykula</p>
      </header>
      <p className="homeBlurb">
        Hello there! Welcome! This blog was created by me with typescript.
        Please check out my other coding projects, martial arts training, and
        style posts!
      </p>
      <div className="boxes">
        <Link
          to={'/codingBlog'}
          className="headerLink"
        >
          <img
            src={codeSnippet}
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
        {/* <a
          rel="noopener noreferrer"
          href={'localhost:3000/codingBlog'}
          target="_blank"
        > */}
        {/* <img
          src={codeSnippet}
          alt="Coding"
        ></img> */}
        {/* </a>{' '} */}
        {/* <a
          href="https://codingbeautydev.com"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={cbLogo}
            alt="Coding Beauty logo"
          ></img>
        </a>{' '}
        <a
          href="https://codingbeautydev.com"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={cbLogo}
            alt="Coding Beauty logo"
          ></img>
        </a> */}
      </div>
    </div>
  );
};

export { App };
