import './App.css';
import { useEffect, useState } from 'react';
import { Button, Loader, Box, Text, Accordion, Anchor } from '@mantine/core';

import { Carousel } from '@mantine/carousel';
import { fetchPostsByCat, fetchContentById } from 'requests';
import { ContentCarousel } from 'Carousel';

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
        errorType: 'validation' | 'network' | 'UNEXPECTED';
      }
    | {
        type: 'pending';
      }
    | {
        type: 'success';
        response: any; /// can type this to response structure
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
        const response: any = await fetchPostsByCat(category);
        console.log({ response });
        if (!response || !response.success) {
          setLoading({ type: 'error', errorType: 'network' });
          return;
        }

        let posts: Post[] = response.data;
        console.log({ posts });

        const postsToBecomeContent: PostWithContent[] = [];

        for (const post of posts) {
          const contentResponse = await fetchContentById(post.id);
          const content = contentResponse.data.data;
          postsToBecomeContent.push({ post, content });
        }
        console.log({ postsToBecomeContent });
        setPostsWithContent(postsToBecomeContent);

        // setLoading({ type: 'success', response: postsWithContent });
        return;
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
    console.log({ postsWithContent });
    return () => {
      abortController.abort();
    };
  }, [category, responsive]);

  /// added this to make sure status is updated when state is updated
  useEffect(() => {
    setLoading({ type: 'success', response: postsWithContent });
  }, [postsWithContent]);

  const [index, setIndex] = useState(1);

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
    case 'success':
      console.log(postsWithContent);
      return loading.response.length === 0 ? (
        <Loader />
      ) : (
        <div>
          {/* {postsWithContent?.map((postWithContent, index2) => (
            <div>
              {postWithContent.content.pictures[0] ? (
                <ContentCarousel
                  videoContent={postWithContent.content.videos}
                  imageContent={postWithContent.content.pictures}
                ></ContentCarousel>
              ) : null}
            </div>
          ))} */}

          <Accordion
            defaultValue={null}
            transitionDuration={800}
          >
            {postsWithContent?.map((postWithContent, index2) => (
              <Accordion.Item value={`${index2}`}>
                <Accordion.Control>
                  {postWithContent.post.title}
                </Accordion.Control>
                <Accordion.Panel>
                  <div
                    key={postWithContent.post.id}
                    id={String(index2)}
                  >
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                      {postWithContent.post.description}
                    </p>
                    {postWithContent.content.pictures[0] ? (
                      <ContentCarousel
                        videoContent={postWithContent.content.videos}
                        imageContent={postWithContent.content.pictures}
                      ></ContentCarousel>
                    ) : null}
                    {postWithContent.content.links?.map((link, index) => (
                      <div>
                        <br></br>
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'blue' }}
                        >
                          {link}
                        </a>
                      </div>
                    ))}{' '}
                    <p>---------------------------------</p>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      );
  }
};

export { Blog };
