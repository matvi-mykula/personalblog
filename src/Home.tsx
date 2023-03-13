import React from 'react';
import logo from './logo.svg';
import './App.css';
import codeSnippet from './images/codeSnippet.png';
import boxingUppercut from './images/boxingUppercut.jpeg';
import sillyBeachLex from './images/sillyBeachLex.jpeg';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Button, Form, Navbar, Card } from 'react-bootstrap';
import { AppShell, Navbar, Header } from '@mantine/core';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>::: Hey! My name is Mat :::</p>
      </header>
      <p className="homeBlurb">
        I am a budding full stack developer passionate about clever code,
        detailed process and visual design.
      </p>
      <p></p>

      <p></p>
    </div>
  );
};

export { App };
