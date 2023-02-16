import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './Home';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
  blogData: { title: string; content: string };
  setBlogData: Function;
}

const Blog: React.FC<Props> = ({ blogData, setBlogData }) => {
  console.log(blogData);
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
        `http://localhost:4000/getPosts?category=` + blogData.title
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
              {checkExistence(item.picture) && (
                <img
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
      <button onClick={loadMore}>Load More</button>
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
  // }(require('./images/' + filePath)) {
  //   return true;
  // }
  // if (require('./videos/' + filePath)) {
  //   return true;
  // }
  // return false;
}

////test data
// const postData = {
//   id: 1,
//   category: 'Coding',
//   title: 'Heart Rate Monitor',
//   description:
//     'This app allows the user to check there heart rate. The user clicks the heart with each beat of their pulse and then the app will after a set amount of time calculate the BPM',
//   picture: 'na',
//   video: null,
//   link: null,
// };
// const postData2 = {
//   id: 2,
//   category: 'Coding',

//   title: 'Sketch Pad',
//   description:
//     'This app allows the user to draw like early sketchbook applications',
//   picture: 'na',
//   video: null,
//   link: null,
// };
// const postData3 = {
//   id: 3,
//   category: 'Coding',

//   title: 'Forum',
//   description: 'Simple forum',
//   picture: 'na',
//   video: null,
//   link: null,
// };
