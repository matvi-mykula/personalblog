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
    id: Number;
    category: String;
    title: String;
    description: String;
    picture: String;
    video: String;
    link: String;
    timeStamp: Date;
  }
  const [loading, setLoading] = useState(true);
  const [topicData, setTopicData] = useState<Data[]>([]);

  const [data, setData] = useState<Data[]>([]);

  // let initialData: Data[];
  const fetchPosts = async (): Promise<Data[]> => {
    try {
      const response = await axios.get(
        `http://localhost:4000/getPosts?category=` + title
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

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
  }, []);

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
          data.map((item) => (
            <div key={String(item.id)}>
              <p>------------------------------------------</p>
              <p>{item.title}</p>
              <p>{item.description}</p>
              {/* put all picture into a carasol */}
              {checkExistence(item.picture) && (
                <Image
                  width={500}
                  height={300}
                  fit="contain"
                  src={checkExistence(item.picture)}
                  // src={require('./images/' + item.picture)}
                  // src={'https://drive.google.com/uc?id=' + item.picture}
                  alt="none"
                />
              )}
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

function checkExistence(filePath: String) {
  try {
    return require('./images/' + filePath);
  } catch (error) {
    return null;
  }
}
