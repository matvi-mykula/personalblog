import React, { useState } from "react";
import { Home } from "Home";
import { Blog } from "BlogOG";
import { Login } from "Login";
import { Contact } from "Contact";
import { About } from "About";
interface Props {
  content: string;
  colorScheme: any;
}

const MyContent: React.FC<Props> = ({ content, colorScheme }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  switch (content) {
    case "home": {
      return <Home></Home>;
    }
    case "about": {
      return <About></About>;
    }
    case "contact": {
      return <Contact></Contact>;
    }
    case "coding": {
      return <Blog category={"coding"} colorScheme={colorScheme}></Blog>;
    }
    case "movement": {
      return <Blog category={"movement"} colorScheme={colorScheme}></Blog>;
    }
    case "clothing": {
      return <Blog category={"clothes"} colorScheme={colorScheme}></Blog>;
    }
    case "admin": {
      return <Login isAdmin={isAdmin} setIsAdmin={setIsAdmin}></Login>;
    }
    default:
      return <p>hello from router</p>;
  }
};

export { MyContent };
