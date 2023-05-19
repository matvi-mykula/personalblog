import React, { useState } from 'react';
import { App } from 'Home';
import { Blog } from 'BlogOG';
import { Login } from 'Login';
import { Contact } from 'Contact';
import { About } from 'About';
interface Props {
  content: string;
}

const MyContent: React.FC<Props> = ({ content }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  switch (content) {
    case 'home': {
      return <App></App>;
    }
    case 'about': {
      return <About></About>;
    }
    case 'contact': {
      return <Contact></Contact>;
    }
    case 'coding': {
      return <Blog category={'coding'}></Blog>;
    }
    case 'movement': {
      console.log({ content });
      return <Blog category={'movement'}></Blog>;
    }
    case 'clothing': {
      return <Blog category={'clothes'}></Blog>;
    }
    case 'admin': {
      return (
        <Login
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        ></Login>
      );
    }
    default:
      return <p>hello from router</p>;
  }
};

export { MyContent };
