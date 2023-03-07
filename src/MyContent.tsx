import React, { useEffect, useState } from 'react';
import { App } from 'Home';
import { Blog } from 'Blog';
import { Login } from 'Login';
import { Contact } from 'Contact';
interface Props {
  content: string;
}
interface User {
  user?: string;
  password?: string;
  isAdmin?: boolean;
}

const MyContent: React.FC<Props> = ({ content }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User>({});

  switch (content) {
    case 'home': {
      return <App></App>;
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
          user={user}
          setUser={setUser}
        ></Login>
      );
    }
    default:
      return <p>hello from router</p>;
  }
};

export { MyContent };
