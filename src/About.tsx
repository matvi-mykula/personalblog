import React from 'react';
import './App.css';

import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell, Navbar, Header } from '@mantine/core';

const About: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>::: About This Website :::</p>
      </header>

      <p className="homeBlurb">
        Hello there! Welcome! This blog was created by me with Typescript and
        the Mantine CSS framework. It is powered by a MongoDB server to create,
        store, update and retireve blog data.{' '}
      </p>
      <p>
        As a new developer, I wanted to create a platform to showcase my
        programming skills and provide information about myself. I used my
        knowledge of React and TypeScript to build a responsive and
        user-friendly interface that is easy to navigate. I made calls to the
        server to retrieve blog post data to serve to the front end user. I also
        created an admin portal so that I could Create, Read, Update and Delete
        posts through the interface. The Mantine CSS framework provided me with
        the structure and tools to create a modern asthetic that is visually
        appealing and functional. With Mantine, I was able to quickly create and
        implement various UI componenets including buttons, forms, and menus. To
        store and retrieve blog post data, I used MongoDB, a popular NoSQL
        database. MongoDB is known for its flexibility and scalability, making
        it a great choice for building web applications that require fast and
        reliable data storage.{' '}
      </p>

      <p>
        My desire is that this site represents my dedication to programming as a
        skill and trade as well as my increasing skill for creating high-quality
        applications that meet the needs of users. Please check out my other
        coding projects, martial arts training, and style posts!
      </p>
    </div>
  );
};

export { About };
