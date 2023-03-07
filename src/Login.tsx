import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './Home';
import './App.css';
import React, { useEffect, useState } from 'react';
import { FormEventHandler } from 'react';
import {
  TextInput,
  Checkbox,
  NumberInput,
  Select,
  Button,
  Group,
  Box,
  Divider,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import axios from 'axios';

interface Props {
  isAdmin: boolean;
  setIsAdmin: Function;
  user: User;
  setUser: Function;
}
interface User {
  user?: string;
  password?: string;
  isAdmin?: boolean;
}

const Login: React.FC<Props> = ({ isAdmin, setIsAdmin, user, setUser }) => {
  // const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [allData, setAllData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showActions, setShowActions] = useState(true);

  const [addForm, setAddForm] = useState(false);
  // function returns state to original admin page state
  //to be passed to MyForm component

  ///////////////////// secure passport login ///////////////
  //// i made user on mongodb manually
  const [loginPassword, setLoginPassword] = useState('');
  /////////////// log in admin user with passport
  const login = (pass: string) => {
    console.log('trying login');
    axios
      .post('http://localhost:4000/login', {
        username: 'Admin',
        password: pass,
      })
      .then((response) => {
        console.log('login working');

        console.log(response.data);
        setUser(response.data);
      });
  };

  //// do i need another get to check user or can i use state and localstorage?
  useEffect(() => {
    user && setIsAdmin(user.isAdmin);
  }, [user]);

  /////////////////
  function cancel() {
    // setShowForm(false);
    setAddForm(false);
    setShowAllPosts(false);
    setShowEditForm(false);
    setShowActions(true);
    setFormData(initialForm);
  }

  ////// runs the admin login form//////
  function AdminLogin() {
    const form = useForm({
      initialValues: {
        password: loginPassword,
      },
    });

    return (
      <div>
        <p>Enter Admin Password</p>
        <Box>
          <form
            onSubmit={(event) => {
              console.log('submit');
              event.preventDefault();
              const password = form.values.password;
              console.log({ password });
              login(password);
            }}
          >
            <TextInput
              withAsterisk
              label="Password"
              placeholder="Enter Admin Password"
              {...form.getInputProps('password')}
            ></TextInput>
            <Button type="submit">Submit</Button>
          </form>
        </Box>

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  }
  ////////

  /// use effect to run when showallposts changes and fetchs data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchPosts();
        setAllData(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log(allData);
  }, [showAllPosts, showEditForm]);
  /////

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

  const initialForm: formDataType = {
    id: '',
    category: '',
    title: '',
    description: '',
    pictures: [''],
    videos: [''],
    links: [''],
    timeStamp: new Date(),
  };
  const [formData, setFormData] = useState<formDataType>(initialForm);

  ///////// check if admin is logged in /////////
  useEffect(() => {});

  return (
    <div>
      <p>Admin Page</p>

      {isAdmin ? (
        <div>
          <p>Welcome Administrator</p>
          {/* show all admin operations */}
          {showActions && (
            <div>
              {/* decide which action to do */}
              <Button
                onClick={() => {
                  setAddForm(true);
                  setShowActions(false);
                }}
              >
                Add New Post
              </Button>
              <Button
                onClick={() => {
                  // setAddForm(true);
                  setShowAllPosts(true);
                  setShowActions(false);
                }}
              >
                Edit or Delete Post
              </Button>
            </div>
          )}
          {addForm && (
            <div>
              <MyForm
                newData={initialForm}
                allData={allData}
                cancel={cancel}
                isNew={true}
              ></MyForm>
            </div>
          )}
          {showEditForm && (
            <MyForm
              newData={formData}
              allData={allData}
              cancel={cancel}
              isNew={false}
            ></MyForm>
          )}
          {showAllPosts && (
            <div>
              {/* needs to get data and update/delete data from both postdata and contentdata */}
              {allData.map((post: any) => (
                <div>
                  <p>{post.title}</p>

                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this post?'
                        )
                      ) {
                        removePost(post.id);
                        setShowAllPosts(false);
                        setShowActions(true);
                        //needs to also remove content
                      }
                    }}
                  >
                    Delete
                  </Button>
                  {/* once edit button is clicked needs to remove all posts and show editable form with selected post content */}
                  <Button
                    onClick={async () => {
                      setShowAllPosts(false);

                      const content = await fetchPostContent(post.id);
                      console.log({ post });
                      console.log(content.pictures);
                      await setFormData({
                        id: post.id,
                        title: post.title,
                        category: post.category,
                        description: post.description,
                        timeStamp: post.timeStamp,
                        pictures: content.pictures,
                        videos: content.videos,
                        links: content.links,
                      });
                      console.log({ formData });
                      setShowEditForm(true);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              ))}
              <Button onClick={() => cancel()}>Cancel</Button>
            </div>
          )}

          {/*  */}

          <Button
            onClick={() => {
              setUser({});
              setIsAdmin(false);
              console.log({ isAdmin });
              setShowAllPosts(false);
              setShowActions(true);
              setShowEditForm(false);
              setShowForm(false);
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <AdminLogin></AdminLogin>
      )}
    </div>
  );
};

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
interface Data {
  id: string;
  category: string;
  title: string;
  description: string;
  picture: string[];
  video: string[];
  links: string[];
  timeStamp: Date;
}
interface Props2 {
  newData: formDataType;
  allData: Data[];
  cancel: Function;
  isNew: boolean;
}

///create form for inpu tof new post info
// should be able to render a new post form or an edit post form based on isNew variable

///from chatgpt add multiple input fields
const MyForm: React.FC<Props2> = ({ newData, allData, cancel, isNew }) => {
  console.log(newData);
  const [pictureInputs, setPictureInputs] = useState(newData.pictures); // initial array with one input field
  const [videoInputs, setVideoInputs] = useState(newData.videos); // initial array with one input field
  const [linkInputs, setLinkInputs] = useState(newData.links); // initial array with one input field

  const handleInputChange = (
    index: number,
    value: string,
    inputType: string[],
    setState: Function
  ) => {
    console.log({ value });
    const newInputs = [...inputType];
    newInputs[index] = value;
    setState(newInputs);
  };

  const form = useForm({
    initialValues: {
      id: newData.id,
      category: newData.category,
      title: newData.title,
      description: newData.description,
      pictures: pictureInputs,
      videos: videoInputs,
      links: linkInputs,
      timeStamp: newData.timeStamp,
    },

    /// do i need to do more validations?
    validate: {
      id: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      title: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      description: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      category: (value) =>
        value === undefined ? 'Category is required' : null,

      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleAddMore = (inputType: string[], setState: Function) => {
    setState([...inputType, '']); // add a new empty input field to the array
  };

  const handleRemove = (
    inputType: string[],
    setState: Function,
    index: number
  ) => {
    const newInput = inputType.splice(index, 1);
    setState([...inputType]);
  };
  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values: formDataType) => {
          console.log(values);

          values.pictures = pictureInputs;
          values.videos = videoInputs;
          values.links = linkInputs;

          if (isNew) {
            values.timeStamp = new Date();
            postBlogPost({
              id: values.id,
              category: values.category,
              title: values.title,
              description: values.description,
              timeStamp: values.timeStamp,
            });
            postContentFolder({
              id: values.id,
              pictures: values.pictures,
              videos: values.videos,
              links: values.links,
            });
            console.log({ values });
          } else {
            console.log({ values });

            updatePost(
              newData,
              {
                id: values.id,
                pictures: values.pictures,
                videos: values.videos,
                links: values.links,
              },
              values
            );
          }

          cancel();
        })}
      >
        <TextInput
          withAsterisk
          label="ID"
          placeholder="Identifier"
          {...form.getInputProps('id')}
        ></TextInput>

        <Select
          placeholder="Select Category"
          label="Category"
          data={[
            { value: 'coding', label: 'Coding' },
            { value: 'movement', label: 'Movement' },
            { value: 'clothing', label: 'Clothing' },
          ]}
          {...form.getInputProps('category')}
        ></Select>

        <TextInput
          withAsterisk
          label="Title"
          placeholder="Title"
          {...form.getInputProps('title')}
        ></TextInput>
        <Textarea
          withAsterisk
          label="Description"
          placeholder="'Description"
          {...form.getInputProps('description')}
        />

        {pictureInputs.map((value, index) => (
          <span>
            <TextInput
              withAsterisk
              key={index}
              value={value}
              label="Picture"
              placeholder="Picture"
              onChange={(event) => {
                handleInputChange(
                  index,
                  event.target.value,
                  pictureInputs,
                  setPictureInputs
                );
                console.log(pictureInputs);
              }}
            ></TextInput>
            <Button
              onClick={() => {
                handleRemove(pictureInputs, setPictureInputs, index);
              }}
            >
              -
            </Button>
          </span>
        ))}
        <Button onClick={() => handleAddMore(pictureInputs, setPictureInputs)}>
          +
        </Button>

        {videoInputs &&
          videoInputs.map((value, index) => (
            <span>
              <TextInput
                withAsterisk
                key={index}
                label="Video"
                placeholder="Video"
                value={value}
                onChange={(event) => {
                  handleInputChange(
                    index,
                    event.target.value,
                    videoInputs,
                    setVideoInputs
                  );
                  console.log(videoInputs);
                }}
              ></TextInput>
              <Button
                onClick={() => {
                  handleRemove(videoInputs, setVideoInputs, index);
                }}
              >
                -
              </Button>
            </span>
          ))}
        <Button onClick={() => handleAddMore(videoInputs, setVideoInputs)}>
          +
        </Button>

        {linkInputs &&
          linkInputs.map((value, index) => (
            <span>
              <TextInput
                key={index}
                withAsterisk
                label="Link"
                placeholder="Link"
                value={value}
                onChange={(event) => {
                  handleInputChange(
                    index,
                    event.target.value,
                    linkInputs,
                    setLinkInputs
                  );
                  console.log(linkInputs);
                }}
              ></TextInput>
              <Button
                onClick={() => {
                  handleRemove(linkInputs, setLinkInputs, index);
                }}
              >
                -
              </Button>
            </span>
          ))}
        <Button onClick={() => handleAddMore(linkInputs, setLinkInputs)}>
          +
        </Button>
        <br></br>
        <br></br>

        <Button type="submit">Submit</Button>
        <br></br>
        <Button
          onClick={() => {
            form.reset();
            cancel();
          }}
        >
          Cancel
        </Button>
      </form>
    </Box>
  );
};

interface blogPostData {
  id: string;
  category: string;
  title: string;
  description: string;
  timeStamp: Date;
}
interface folderData {
  id: string;
  pictures: string[];
  videos: string[];
  links: string[];
}

///send blog data to database
const postBlogPost = (blogPost: blogPostData) => {
  console.log('posting blog post');
  axios
    .post('http://localhost:4000/postBlogPost', {
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
    .post('http://localhost:4000/postContentFolder', {
      folderData,
    })
    .then((response) => {
      console.log('this picture folder should be posted');

      console.log(response.data);
    });
};

// takes new blog post info and updates both content folder and blog data
const updatePost = (
  blogPost: blogPostData,
  contentFolder: folderData,
  newBlogPost: formDataType
) => {
  console.log('sending update');
  axios
    .put(`http://localHost:4000/update/${blogPost.id}/${newBlogPost.id}`, {
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
  const response = await axios.get(`http://localhost:4000/getAllPosts`);
  return response.data;
};

// get content associated with a specific post id
const fetchPostContent = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/getPostContent?id=${id}`
    );
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
    .delete(`http://localhost:4000/delete/${id}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { Login };
