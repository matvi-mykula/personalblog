import './App.css';
import { useEffect, useState } from 'react';
import { Button, Loader, Box, Text } from '@mantine/core';

import { Carousel } from '@mantine/carousel';
import { fetchPostsByCat, fetchContentById } from 'requests';

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
  console.log('arrive to blog');
  console.log(category);
  const [postsWithContent, setPostsWithContent] = useState<PostWithContent[]>(
    []
  );

  /////////// loading state to make misha happy //////
  const [loading, setLoading] = useState<Boolean>(true);
  const [responsive, setResponsive] = useState<Boolean>(navigator.onLine);
  ///////////////////////////////////////////
  /// when category changes get all posts by category and content for each post and create list of postdata
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetchPostsByCat(category);
      console.log({ response });
      let posts: Post[] = [];
      response ? (posts = response.data) : console.log('no response');

      console.log({ posts });
      const postsWithContent: PostWithContent[] = [];

      for (const post of posts) {
        const contentResponse = await fetchContentById(post.id);
        const content = contentResponse.data;
        postsWithContent.push({ post, content });
      }
      setPostsWithContent(postsWithContent);
      setLoading(false);
    };
    fetchPosts();
  }, [category, responsive]);
  ///////////////////////////////////////
  //    load one at a time ///////////

  const [index, setIndex] = useState(1);

  ////////////////////////////

  if (!responsive) {
    return (
      <Box>
        <Text>It seems you have no internet silly billy! asdfadf</Text>
        <Button
          onClick={() => {
            setResponsive(navigator.onLine);
          }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  if (loading) {
    return <Loader />;
  } else {
    if (
      postsWithContent.length > 0 &&
      typeof postsWithContent !== 'undefined'
    ) {
      return (
        <div>
          {postsWithContent.slice(0, index)?.map((postWithContent, index2) => (
            <div
              key={postWithContent.post.id}
              id={String(index2)} /// cause id has to be a string
            >
              <h2>{postWithContent.post.title}</h2>
              <p style={{ whiteSpace: 'pre-wrap' }}>
                {postWithContent.post.description}
              </p>
              {postWithContent.content.pictures[0] ? (
                <Carousel
                  maw={'80vw'}
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
                          width: '100%',
                          height: '100%',
                          objectFit: 'fill',
                        }}
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              ) : null}
              {postWithContent.content.videos[0] ? (
                <Carousel
                  maw={'auto'}
                  mx="auto"
                  withIndicators
                  height={200}
                >
                  {postWithContent.content.videos?.map((video, index) => (
                    <Carousel.Slide
                      justify-content-center
                      key={video}
                    ></Carousel.Slide>
                  ))}
                </Carousel>
              ) : null}
              {postWithContent.content.links?.map((link, index) => (
                <div>
                  <br></br>
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'grey' }}
                  >
                    {link}
                  </a>
                </div>
              ))}{' '}
              <p>---------------------------------</p>
            </div>
          ))}
          {postsWithContent[index] ? (
            <Button
              color="gray"
              radius="xl"
              size="md"
              compact
              uppercase
              style={{ marginBottom: '12px' }}
              onClick={async () => {
                // i should let people know theyv reached the end of content
                await setIndex((index) => index + 1);
                console.log({ index });
                const element = document.getElementById(String(index) || '0');
                if (element) {
                  console.log('scrolling');
                  console.log({ element });
                  element.scrollTo({
                    top: element.scrollHeight,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              More Content
            </Button>
          ) : null}
        </div>
      );
    } else {
      return <Text>No Content </Text>;
    }
  }
};

export { Blog };
