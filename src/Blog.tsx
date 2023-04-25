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

  type Status =
    | {
        type: 'initial';
      }
    | {
        type: 'error';
      }
    | {
        type: 'pending';
      }
    | { type: 'nothing' }
    | {
        type: 'success';
      }; /////////// loading state to make misha happy //////

  const [loading, setLoading] = useState<Status>({ type: 'initial' });
  const [responsive, setResponsive] = useState<Boolean>(navigator.onLine);

  ///////////////////////////////////////////
  /// when category changes get all posts by category and content for each post and create list of postdata
  useEffect(() => {
    const abortController = new AbortController();
    const fetchPosts = async () => {
      try {
        setLoading({ type: 'pending' });
        const response = await fetchPostsByCat(category);
        let posts: Post[] = [];
        response ? (posts = response.data) : console.log('no response');
        const postsToBecomeContent: PostWithContent[] = [];

        if (posts.length === 0) {
          setLoading({ type: 'nothing' });
        }

        for (const post of posts) {
          const contentResponse = await fetchContentById(post.id);
          const content = contentResponse.data;
          postsToBecomeContent.push({ post, content });
        }
        setPostsWithContent(postsToBecomeContent);
        setLoading({ type: 'success' });
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
    return () => {
      abortController.abort();
    };
  }, [category, responsive]);
  ///////////////////////////////////////
  //    load one at a time ///////////

  const [index, setIndex] = useState(1);

  ////////////////////////////

  if (!responsive) {
    return (
      <Box>
        <Text>It seems you have no internet silly billy!</Text>
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
  switch (loading.type) {
    case 'initial':
      return <Loader />;
    case 'pending':
      return <Loader />;
    case 'error':
      return <Box>ERROR</Box>;
    case 'nothing':
      return <Box>NO DATA</Box>;
    case 'success':
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
  }
};
// };

export { Blog };
