import React, { useState } from 'react';
import { App } from 'Home';
import { Blog } from 'Blog';
import { Login } from 'Login';

interface Props {
  content: string;
}

const MyContent: React.FC<Props> = ({ content }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  switch (content) {
    case 'home': {
      return <App></App>;
    }
    case 'coding': {
      return <Blog title={'coding'}></Blog>;
    }
    case 'movement': {
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
  }
  return <p>hello from router</p>;
};

export { MyContent };
