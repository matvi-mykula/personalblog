// import React, { useState } from "react";
// import { Home } from "Home";
// import { Blog } from "BlogOG";
// import { Login } from "Login";
// import { Contact } from "Contact";
// import { About } from "About";
// import { ArtGrid } from "ArtGrid";
// interface Props {
//   content: string;
//   colorScheme: any;
// }

// const MyContent: React.FC<Props> = ({ content, colorScheme }) => {
//   const [isAdmin, setIsAdmin] = useState(false);

//   switch (content) {
//     case "home": {
//       return <Home></Home>;
//     }
//     case "about": {
//       return <About></About>;
//     }
//     case "contact": {
//       return <Contact></Contact>;
//     }
//     case "coding": {
//       return <Blog category={"coding"} colorScheme={colorScheme}></Blog>;
//     }
//     case "sculpture": {
//       return <ArtGrid />;
//     }
//     case "movement": {
//       return <Blog category={"movement"} colorScheme={colorScheme}></Blog>;
//     }
//     case "clothing": {
//       return <Blog category={"clothes"} colorScheme={colorScheme}></Blog>;
//     }
//     case "admin": {
//       return <Login isAdmin={isAdmin} setIsAdmin={setIsAdmin}></Login>;
//     }
//     default:
//       return <p>hello from router</p>;
//   }
// };

// export { MyContent };

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route components
import { Home } from "Home";
import { Blog } from "BlogOG";
import { Login } from "Login";
import { Contact } from "Contact";
import { About } from "About";
import { ArtGrid } from "ArtGrid";

interface Props {
  colorScheme: any;
}

const MyContent: React.FC<Props> = ({ colorScheme }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/coding"
        element={<Blog category="coding" colorScheme={colorScheme} />}
      />
      <Route path="/sculpture" element={<ArtGrid />} />
      <Route
        path="/movement"
        element={<Blog category="movement" colorScheme={colorScheme} />}
      />
      <Route
        path="/clothing"
        element={<Blog category="clothes" colorScheme={colorScheme} />}
      />
      <Route
        path="/admin"
        element={<Login isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}
      />
      <Route path="/" element={<Home />} /> {/* Default route */}
    </Routes>
  );
};

export { MyContent };
