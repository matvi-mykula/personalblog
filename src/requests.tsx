import axios from 'axios';

/////////////
function figureAPI() {
  console.log(window.location);
  console.log(process.env.NODE_ENV);
  const devBackend = 'http://localhost:8080/';
  const prodBackend = 'https://blue-pine-501.fly.dev';
  //   const prodBackend = 'https://restless-fire-5891.fly.dev/'; ///// replace with fly.io link

  console.log({ prodBackend });
  const prodEnv = process.env.NODE_ENV === 'production';
  console.log(prodEnv);
  let environment;
  prodEnv ? (environment = prodBackend) : (environment = devBackend);
  return environment;
}

const environment = figureAPI();

console.log({ environment });

///////////////
//////login admin
const login = (pass: string, setState: Function) => {
  console.log('trying login');
  axios
    .post(environment + 'login', {
      username: 'Admin',
      password: pass,
    })
    .then((response) => {
      console.log('login working');

      console.log(response.data);
      setState(response.data);
    });
};

interface blogPostData {
  id: string;
  category: string;
  title: string;
  description: string;
  timeStamp: Date;
}
///send blog data to database
const postBlogPost = (blogPost: blogPostData) => {
  console.log('posting blog post');
  axios
    .post(environment + 'postBlogPost', {
      blogPost,
    })
    .then((response) => {
      console.log('this blog post should be posted');

      console.log(response.data);
    });
};

// sends content to database
const postContentFolder = (folderData: folderData) => {
  console.log('posting img folder data');
  axios
    .post(environment + 'postContentFolder', {
      folderData,
    })
    .then((response) => {
      console.log('this picture folder should be posted');

      console.log(response.data);
    });
};

interface folderData {
  id: string;
  pictures: string[];
  videos: string[];
  links: string[];
}
interface formDataType {
  id: string;
  category: string;
  title: string;
  description: string;
  pictures: string[];
  videos: string[];
  links: string[];
  timeStamp: Date;
}

// takes new blog post info and updates both content folder and blog data
const updatePost = (
  blogPost: blogPostData,
  contentFolder: folderData,
  newBlogPost: formDataType
) => {
  console.log('sending update');
  axios
    .put(environment + `update/${blogPost.id}/${newBlogPost.id}`, {
      blogPost,
      contentFolder,
      newBlogPost,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
//get all posts to be edited or deleted
const fetchPosts = async () => {
  const response = await axios.get(environment + `getAllPosts`);
  return response.data;
};

// get content associated with a specific post id
const fetchPostContent = async (id: string) => {
  try {
    const response = await axios.get(environment + `getPostContent?id=${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// deletes post onclick from database
const removePost = (id: number) => {
  axios
    .delete(environment + `delete/${id}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

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

const fetchPostsByCat = async (category: string) => {
  const response = await axios.get<Post[]>(
    environment + `getPosts?category=${category}`
  );
  return response;
};
const fetchContentById = async (id: string) => {
  const contentResponse = await axios.get<Content>(
    environment + `getPostContent?id=${id}`
  );
  return contentResponse;
};

//////////   dont think i need this   /////////////
// const fetchPostsAndContent = async (category: string) => {
//   const response = await fetchPostsByCat(category);
//   const posts = response.data;

//   const postsWithContent: PostWithContent[] = [];

//   for (const post of posts) {
//     const contentResponse = await fetchContentById(post.id);
//     const content = contentResponse.data;

//     postsWithContent.push({ post, content });
//   }
//   return postsWithContent;
// };

export {
  updatePost,
  fetchPostContent,
  fetchPosts,
  removePost,
  fetchPostsByCat,
  fetchContentById,
  postContentFolder,
  login,
  postBlogPost,
};
