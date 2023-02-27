import React, { useEffect, useState } from 'react';
import { App } from 'Home';
import { Blog } from 'Blog';
import { Login } from 'Login';
import { Contact } from 'Contact';
interface Props {
  content: string;
}

const MyContent: React.FC<Props> = ({ content }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  console.log({ content });
  useEffect(() => {
    console.log({ content });
  }, [content]);

  switch (content) {
    case 'home': {
      return <App></App>;
    }
    case 'contact': {
      return <Contact></Contact>;
    }
    case 'coding': {
      return <Blog title={'coding'}></Blog>;
    }
    case 'movement': {
      console.log({ content });
      return <Blog title={'movement'}></Blog>;
    }
    case 'clothing': {
      return <Blog title={'clothes'}></Blog>;
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

  // }, [content]);
  // return <p>helo from router</p>;
};

export { MyContent };
