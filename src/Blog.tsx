import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './Home';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Image, Button } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

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
function figureAPI() {
  console.log(window.location);
  console.log(process.env.NODE_ENV);
  const devBackend = 'http://localhost:8080/api/';
  const prodBackend = 'https://restless-fire-5891.fly.dev/'; ///// replace with fly.io link

  console.log({ prodBackend });
  const prodEnv = process.env.NODE_ENV === 'production';
  console.log(prodEnv);
  let environment;
  prodEnv ? (environment = prodBackend) : (environment = devBackend);
  return environment;
}

const environment = figureAPI();

console.log({ environment });

const Blog: React.FC<Props> = ({ category }) => {
  const [postsWithContent, setPostsWithContent] = useState<PostWithContent[]>(
    []
  );
  ///////////////////////////////////////////
  /// when category changes get all posts by category and content for each post and create list of postdata
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get<Post[]>(
        environment + `getPosts?category=${category}`
      );
      const posts = response.data;

      const postsWithContent: PostWithContent[] = [];

      for (const post of posts) {
        const contentResponse = await axios.get<Content>(
          environment + `getPostContent?id=${post.id}`
        );
        const content = contentResponse.data;

        postsWithContent.push({ post, content });
      }

      setPostsWithContent(postsWithContent);
    };
    fetchPosts();
  }, [category]);
  ///////////////////////////////////////
  //    load one at a time ///////////

  const [index, setIndex] = useState(1);

  ////////////////////////////

  if (postsWithContent.length > 0 && typeof postsWithContent !== 'undefined') {
    console.log(postsWithContent[0]);
    return (
      <div>
        {postsWithContent.slice(0, index)?.map((postWithContent, index) => (
          <div key={postWithContent.post.id}>
            <h2>{postWithContent.post.title}</h2>
            <p style={{ whiteSpace: 'pre-wrap' }}>
              {postWithContent.post.description}
            </p>
            {postWithContent.content.pictures[0] ? (
              <Carousel
                maw={500}
                mx="auto"
                withIndicators
                height={400}
                loop
                styles={{
                  control: {
                    '&[data-inactive]': {
                      opacity: 0,
                      cursor: 'default',
                    },
                  },
                }}
              >
                {postWithContent.content.pictures?.map((picture, index) => (
                  <Carousel.Slide key={picture}>
                    <img
                      src={`./images/${picture}`}
                      alt={`./images/${picture}`}
                      style={{
                        width: 'auto',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Carousel.Slide>
                ))}
              </Carousel>
            ) : null}
            {postWithContent.content.videos[0] ? (
              <Carousel
                maw={320}
                mx="auto"
                withIndicators
                height={200}
              >
                {postWithContent.content.videos?.map((video, index) => (
                  <Carousel.Slide key={video}></Carousel.Slide>
                ))}
              </Carousel>
            ) : null}
            {postWithContent.content.links?.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link}
              </a>
            ))}{' '}
            <p>-----------------------------------------------</p>
          </div>
        ))}
        <Button
          onClick={() => {
            setIndex((index) => index + 1);
          }}
        >
          More Content
        </Button>
      </div>
    );
  } else {
    return <p>Nothing Here</p>;
  }
};

export { Blog };
