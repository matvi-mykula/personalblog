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
    pictures: string[];
    videos: string[];
    links: string[];
  }
  interface DataAndContent {
    data: Data;
    content: Content;
  }

  const [loading, setLoading] = useState(true);
  const [topicData, setTopicData] = useState<Data[]>([]);

  const [displayedData, setDisplayedData] = useState<Data[]>([]);
  const [content, setContent] = useState<Content[]>([]);
  const [index, setIndex] = useState<number>(0);

  ///////////// axios get requests //////////////////////
  const fetchPosts = async (): Promise<Data[]> => {
    try {
      const response = await axios.get(
        `http://localhost:4000/getPosts?category=` + title
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const getContent = async (id: string) => {
    console.log(id);
    try {
      const response = await fetchPostContent(id);
      console.log(response);
      setContent([...content, response]);
      console.log({ content });
    } catch (error) {
      console.log(error);
    }
  };

  //wy is this not woriking/running?
  const fetchPostContent = async (id: string): Promise<Content> => {
    console.log('fetching content');
    try {
      const response = await axios.get(
        `http://localhost:4000/getPostContent?id=` + id
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return { id: '', pictures: [''], videos: [''], links: [''] };
    }
  };

  const getAllContent = (pageData: Data[]) => {
    console.log('getAllContent');
    for (let i = 0; i < pageData.length; i++) {
      console.log(pageData[i]);
      fetchPostContent(pageData[i].id);
    }
  };

  /////// get requests ^^^^ /////////////////

  /// ///////////
  //when component first loads get all category data and all of the content for those posts put into lists
  useEffect(() => {
    console.log('blog component loaded');
    const getData = async () => {
      try {
        const response = await fetchPosts();
        console.log(response);
        setTopicData(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    getAllContent(topicData);
  }, []);

  /////////////
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
    getData();
    getAllContent(topicData);
    // setDisplayedData(topicData[index]);
    console.log({ topicData });
    // setData([topicData[0]]);
    setLoading(false);
  }, [title]);

  //sets inital data to show when topic data has loaded from get request
  // useEffect(() => {
  //   console.log({ topicData });

  //   if (topicData) {
  //     setData([topicData[0]]);
  //     getContent(topicData[0].id);
  //     //get all content here
  //     setLoading(false);
  //   }
  // }, [topicData]);

  // shows next blog post //////////////// NEED THIS
  // const loadMore = () => {
  //   if (topicData[displayedData.length]) {
  //     setData([...data, topicData[data.length]]);
  //     console.log({ data });
  //   }
  // };

  // whenever data being shown changes get the content for the newest piece of data
  // and add it to content list
  // useEffect(() => {
  //   const getContent = async (id: string) => {
  //     console.log(id);
  //     try {
  //       const response = await fetchPostContent(id);
  //       console.log(response);
  //       setContent([...content, response]);
  //       console.log({ content });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   console.log(data);
  //   getContent(data[data.length - 1].id);
  // }, [data, content]);

  if (loading || !topicData) {
    return <div>Waiting on server...</div>;
  }
  // setData([topicData[0]]);
  console.log('should get here');
  console.log({ topicData });
  console.log({ displayedData });
  console.log({ content });

  return (
    <p>nothing here</p>
    // <div className="codingBlog">
    //   <ul>
    //     {topicData ? (
    //       topicData.map((item, index) => (
    //         <div key={String(item.id)}>
    //           <p>------------------------------------------</p>
    //           <div>
    //             <p>{item.title} ----</p>
    //             {/* {item.link && <a href={item.link}>Github Repository</a>} */}
    //           </div>
    //           <p>{item.description}</p>
    //           <p>{content[index].pictures[0]}</p>
    //           {/* put all picture into a carasol */}
    //           {/* {checkExistence(item.picture) && (
    //             <Image
    //               width={500}
    //               height={300}
    //               fit="contain"
    //               src={checkExistence(item.picture)}
    //               alt="none"
    //             />
    //           )} */}

    //           <p>------------------------------------------</p>
    //         </div>
    //       ))
    //     ) : (
    //       <p>nothing here</p>
    //     )}{' '}
    //   </ul>
    //   {/* <Button onClick={loadMore}>Load More</Button> */}
    // </div>
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
