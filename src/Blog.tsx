import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './Home';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Button, Form, Navbar, Card } from 'react-bootstrap';
import { Image, Button } from '@mantine/core';

interface Post {
  id: string;
  category: string;
  title: string;
  description: string;
  timeStamp: Date;
}

interface Content {
  id: string;
  pictures: string[];
  videos: string[];
  links: string[];
}

interface PostWithContent {
  post: Post;
  content: Content;
}

interface Props {
  category: string;
}

const Blog: React.FC<Props> = ({ category }) => {
  const [postsWithContent, setPostsWithContent] = useState<PostWithContent[]>(
    []
  );
  /// when category changes get all posts by category and content for each post and create list of postdata
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get<Post[]>(
        `http://localhost:4000/getPosts?category=${category}`
      );
      const posts = response.data;

      const postsWithContent: PostWithContent[] = [];

      for (const post of posts) {
        const contentResponse = await axios.get<Content>(
          `http://localhost:4000/getPostContent?id=${post.id}`
        );
        const content = contentResponse.data;
        console.log(content);

        postsWithContent.push({ post, content });
      }

      setPostsWithContent(postsWithContent);
      console.log(postsWithContent[0].content);
    };
    fetchPosts();
  }, [category]);

  if (postsWithContent) {
    return (
      <div>
        {postsWithContent?.map((postWithContent, index) => (
          <div key={postWithContent.post.id}>
            <h2>{postWithContent.post.title}</h2>
            <p>{postWithContent.post.description}</p>
            {postWithContent.content.pictures?.map((picture, index) => (
              <img
                key={index}
                src={picture}
                alt={`no pic${index}`}
              />
            ))}
            {postWithContent.content.videos?.map((video, index) => (
              <video
                key={index}
                src={video}
                controls
              />
            ))}
            {postWithContent.content.links?.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    return <p>Nothing Here</p>;
  }
};

export { Blog };
