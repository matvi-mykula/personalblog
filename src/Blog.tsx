import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './Home';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Button, Form, Navbar, Card } from 'react-bootstrap';
import { Image, Button } from '@mantine/core';

interface Props {
  title: string;
}

const Blog: React.FC<Props> = ({ title }) => {
  console.log(title);
  //   const [blogData, setBlogData] = useState<{ title: string; content: string }>({
  //     title: '',
  //     content: '',
  //   });
  //get request to get all code blog posts

  interface Data {
    id: string;
    category: string;
    title: string;
    description: string;
    // picture: string;
    // video: string;
    // link: string;
    timeStamp: Date;
  }

  interface Content {
    id: string;
    picture: string[];
    video: string[];
    link: string[];
  }
  interface DataAndContent {
    data: Data;
    content: Content;
  }

  const [loading, setLoading] = useState(true);
  const [topicData, setTopicData] = useState<Data[]>([]);

  const [data, setData] = useState<Data[]>([]);
  const [content, setContent] = useState<Content[]>([]);

  // let initialData: Data[];
  const fetchPosts = async (): Promise<Data[]> => {
    try {
      const response = await axios.get(
        `http://localhost:4000/getPosts?category=` + title
      );
      // const conesponse = await axios.get
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchPostContent = async (id: string): Promise<Content> => {
    try {
      const response = await axios.get(
        `http://localhost:4000/getPostContent?id=` + id
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return { id: '', picture: [''], video: [''], link: [''] };
    }
  };
  //whenever blog subject changes rerender the topic data
  useEffect(() => {
    console.log('useeffect');
    const getData = async () => {
      try {
        const response = await fetchPosts();
        console.log(response);
        setTopicData(response);
      } catch (error) {
        console.log(error);
      }
    };
    console.log({ topicData });
    getData();
    // setData([topicData[0]]);
    setLoading(false);
  }, [title]);

  //sets inital data to show when topic data has loaded from get request
  useEffect(() => {
    console.log({ topicData });
    if (topicData.length) {
      setData([topicData[0]]);
      setLoading(false);
    }
  }, [topicData]);

  // shows next blog post
  const loadMore = () => {
    if (topicData[data.length]) {
      setData([...data, topicData[data.length]]);
      console.log({ data });
    }
  };

  // whenever data being shown changes get the content for the newest piece of data
  // and add it to content list
  useEffect(() => {
    const getContent = async (id: string) => {
      try {
        const response = await fetchPostContent(id);
        console.log(response);
        setContent([...content, response]);
        console.log({ content });
      } catch (error) {
        console.log(error);
      }
    };
  });

  if (loading || !topicData) {
    return <div>Waiting on server...</div>;
  }
  // setData([topicData[0]]);
  console.log('should get here');
  console.log({ data });

  return (
    <div className="codingBlog">
      <ul>
        {data ? (
          data.map((item, index) => (
            <div key={String(item.id)}>
              <p>------------------------------------------</p>
              <div>
                <p>{item.title} ----</p>
                {/* {item.link && <a href={item.link}>Github Repository</a>} */}
              </div>
              <p>{item.description}</p>
              <p>{content[index].picture[0]}</p>
              {/* put all picture into a carasol */}
              {/* {checkExistence(item.picture) && (
                <Image
                  width={500}
                  height={300}
                  fit="contain"
                  src={checkExistence(item.picture)}
                  alt="none"
                />
              )} */}

              <p>------------------------------------------</p>
            </div>
          ))
        ) : (
          <p>nothing here</p>
        )}{' '}
      </ul>
      <Button onClick={loadMore}>Load More</Button>
    </div>
  );
};

export { Blog };

function splitString(aString: string) {
  let aList = aString.split(', ');
  return aList;
}

function checkExistence(filePath: string) {
  let trueFile = [filePath];
  console.log(trueFile);
  if (filePath.includes(',')) {
    trueFile = filePath.split(', ');
    console.log(trueFile);
  }
  return trueFile;
  // try {
  //   return require('./images/' + filePath);
  // } catch (error) {
  //   return null;
  // }
}

// function Gallery (stringList:string[]){
//   let urlList =

// }
