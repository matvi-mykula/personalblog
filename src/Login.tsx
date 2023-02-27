import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './Home';
import './App.css';
import React, { useEffect, useState } from 'react';
import { FormEventHandler } from 'react';
// import { Button, Form, Navbar, Card } from 'react-bootstrap';
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
}

const Login: React.FC<Props> = ({ isAdmin, setIsAdmin }) => {
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
  function cancel() {
    // setShowForm(false);
    setAddForm(false);
    setShowAllPosts(false);
    setShowEditForm(false);
    setShowActions(true);
    setFormData(initialForm);
  }

  const loginAdmin: Function = (password: string) => {
    console.log(password);
    if (password === 'admin') {
      /// this prob isnt super secure and i should do this using passport
      setIsAdmin(true);
    } else {
      setErrorMessage('Incorrect password. Please try again.');
      console.log(errorMessage);
    }
  };

  ////// runs the admin login form//////
  function AdminLogin() {
    const form = useForm({
      initialValues: {
        password: '',
      },
    });

    return (
      <div>
        <p>Enter Admin Password</p>
        <Box>
          <form
            onSubmit={form.onSubmit((values) => {
              console.log('admin logged in');
              loginAdmin(values.password);
            })}
          >
            <TextInput
              withAsterisk
              label="Password"
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
    console.log('useeffect');
    const getData = async () => {
      try {
        const response = await fetchPosts();
        console.log(response);
        setAllData(response);
      } catch (error) {
        console.log(error);
      }
    };
    console.log({ allData });
    getData();
    // let postListJSX = []
    // for (let i = 0; i < allData.length; i++) {

    // }
  }, [showAllPosts, showEditForm]);
  /////
  console.log({ allData });
  console.log(allData.length);

  const initialForm = {
    id: '',
    category: '',
    title: '',
    description: '', //make larger text field
    // how to make pictures into arrays of strings?
    picture: [''],
    video: '',
    link: '',
    timeStamp: new Date(),
  };
  console.log({ initialForm });
  const [formData, setFormData] = useState(initialForm);
  console.log({ formData });
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
                  console.log({ allData });
                  console.log({ formData });
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
                        removePost(Number(post.id));
                        setShowAllPosts(false);
                        setShowActions(true);
                      }
                    }}
                  >
                    Delete
                  </Button>
                  {/* once edit button is clicked needs to remove all posts and show editable form with selected post content */}
                  <Button
                    onClick={() => {
                      setShowAllPosts(false);
                      setFormData(post);
                      console.log({ formData });
                      setShowEditForm(true);
                      // return (
                      //   <div>
                      //     <MyForm
                      //       newData={post}
                      //       allData={allData}
                      //       state={showEditForm}
                      //       setState={setShowEditForm}
                      //     ></MyForm>
                      //   </div>
                      // );
                      //gotta make a huge form here
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

interface Data {
  id: string;
  category: string;
  title: string;
  description: string;
  picture: string[];
  video: string;
  link: string;
  timeStamp: Date;
}
interface Props2 {
  newData: Data;
  allData: Data[];

  cancel: Function;
  isNew: boolean;
}

///create form for inpu tof new post info
// should be able to render a new post form or an edit post form based on isNew variable

///from chatgpt add multiple input fields
const MyForm: React.FC<Props2> = ({ newData, allData, cancel, isNew }) => {
  const [pictureInputs, setPictureInputs] = useState(['']); // initial array with one input field

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...pictureInputs];
    newInputs[index] = value;
    setPictureInputs(newInputs);
  };

  const form = useForm({
    initialValues: {
      id: newData.id,
      category: newData.category,
      title: newData.title,
      description: newData.description,
      picture: pictureInputs,
      video: newData.video,
      link: newData.link,
      timeStamp: newData.timeStamp,
    },

    validate: {
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleAddMore = () => {
    setPictureInputs([...pictureInputs, '']); // add a new empty input field to the array
  };
  return (
    <Box>
      <form
        onSubmit={form.onSubmit((values: Data) => {
          console.log(values);

          values.picture = pictureInputs;

          if (isNew) {
            values.timeStamp = new Date();
            postBlogPost({
              id: values.id,
              category: values.category,
              title: values.title,
              description: values.description,
              timeStamp: values.timeStamp,
            });
            console.log({ values });
          } else {
            console.log({ values });

            // updatePost(newData, values);
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

        <TextInput
          withAsterisk
          label="Title"
          placeholder="Title"
          {...form.getInputProps('title')}
        />
        <Textarea
          withAsterisk
          label="Description"
          placeholder="'Description"
          {...form.getInputProps('description')}
        />

        {pictureInputs.map((value, index) => (
          <TextInput
            withAsterisk
            key={index}
            value={value}
            label="Picture"
            placeholder="Picture"
            onChange={(event) => {
              handleInputChange(index, event.target.value);
              console.log(pictureInputs);
            }}

            // {...form.getInputProps('picture')}
          />
        ))}
        <Button onClick={handleAddMore}></Button>

        <TextInput
          withAsterisk
          label="Video"
          placeholder="Video"
          {...form.getInputProps('video')}
        />
        <TextInput
          withAsterisk
          label="Link"
          placeholder="Link"
          {...form.getInputProps('link')}
        ></TextInput>
        <Button type="submit">Submit</Button>
        <Button
          onClick={() => {
            form.reset();
            /// cancels and resets admin page
            cancel();
            // setFormData(initialForm);
          }}
        >
          Cancel
          {/* where to keep cancel button so it can setstate and hide the form */}
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
  entries: string[];
}

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
const postPictureFolder = (folderData: folderData) => {
  console.log('posting img folder data');
  axios.post('http://localhost:4000/postPictureFolder');
};

const updatePost = (blogPost: Data, newBlogPost: Data) => {
  console.log('sending update');
  axios
    .put(`http://localHost:4000/update/${blogPost.id}/${newBlogPost.id}`, {
      blogPost,
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
  try {
    const response = await axios.get(`http://localhost:4000/getAllPosts`);
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
