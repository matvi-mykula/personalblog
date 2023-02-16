import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './Home';
import './App.css';
import React, { useEffect, useState } from 'react';
import { FormEventHandler } from 'react';

import axios from 'axios';

interface Props {
  isAdmin: boolean;
  setIsAdmin: Function;
}

const Login: React.FC<Props> = ({ isAdmin, setIsAdmin }) => {
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [allData, setAllData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

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
  const initialForm = {
    id: allData.length,
    category: '',
    title: '',
    description: '', //make larger text field
    // how to make pictures into arrays of strings?
    picture: '',
    video: '',
    link: '',
    timeStamp: new Date(),
  };
  const [formData, setFormData] = useState(initialForm);
  if (!isAdmin) {
    return (
      <div>
        <p>Enter Admin Password</p>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={() => loginAdmin(input)}>Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div>
      <p>Welcome Administrator</p>

      {!showForm && !showAllPosts && (
        <div>
          <button
            onClick={() => {
              setShowForm(true);
            }}
          >
            Add New Post
          </button>
          <button
            onClick={() => {
              setShowAllPosts(true);
            }}
          >
            Delete/Edit
          </button>
        </div>
      )}

      {/* add new post */}
      {showForm && (
        <form
          className="postForm"
          onSubmit={(event) => {
            event.preventDefault();
            const form = formData;
            console.log({ form });
            if (form) {
              postBlogPost(form);
            }
            setShowForm(false);
          }}
        >
          <label htmlFor="id">ID #:</label>
          <input
            type="number"
            id="id"
            value={formData.id} // get to auto to next index number
            onChange={(event) =>
              setFormData({ ...formData, id: parseInt(event.target.value) })
            }
          />{' '}
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={formData.category} // pick from options
            onChange={(event) =>
              setFormData({ ...formData, category: event.target.value })
            }
          >
            <option value="Coding">Coding</option>
            <option value="Martial Arts">Martial Arts</option>
            <option value="Clothing">Clothing</option>
          </select>
          {/* type="text"
            id="category"
            value={formData.category} // pick from options
            onChange={(event) =>
              setFormData({ ...formData, category: event.target.value })
            }
          /> */}
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="name"
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.target.value })
            }
          />
          <label htmlFor="description">Description:</label>
          <textarea
            // type="text"
            id="description"
            value={formData.description}
            onChange={(event) =>
              setFormData({ ...formData, description: event.target.value })
            }
          />
          <label htmlFor="picture">Picture:</label>
          <input
            type="text"
            id="picture"
            value={formData.picture}
            onChange={(event) =>
              setFormData({ ...formData, picture: event.target.value })
            }
          />
          <label htmlFor="video">Video:</label>
          <input
            type="text"
            id="video"
            value={formData.video}
            onChange={(event) =>
              setFormData({ ...formData, video: event.target.value })
            }
          />
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            value={formData.link}
            onChange={(event) =>
              setFormData({ ...formData, link: event.target.value })
            }
          />
          <button type="submit">Submit</button>
          <button
            onClick={() => {
              /// cancels and resets admin page
              setInput('');
              setShowForm(false);
              setFormData(initialForm);
            }}
          >
            Cancel
          </button>
        </form>
      )}
      <div></div>

      {showAllPosts &&
        allData.map((post: any) => (
          <div>
            <p>{post.title}</p>
            <button
              onClick={() => {
                if (
                  window.confirm('Are you sure you want to delete this post?')
                ) {
                  removePost(Number(post.id));
                  setShowAllPosts(false);
                }
              }}
            >
              Delete
            </button>
            {/* once edit button is clicked needs to remove all posts and show editable form with selected post content */}
            <button
              onClick={() => {
                setShowAllPosts(false);
                setFormData(post);
                console.log({ formData });
                setShowEditForm(true);
                //gotta make a huge form here
              }}
            >
              Edit
            </button>
          </div>
        ))}
      {showEditForm && (
        // should add error handling for inputs of the same id or title
        <form
          className="postForm"
          onSubmit={(event) => {
            event.preventDefault();
            const form = formData;
            console.log({ form });
            if (form) {
              updatePost(form);
            }
            setShowForm(false);
            setShowEditForm(false);
          }}
        >
          <label htmlFor="id">ID #:</label>
          <input
            type="number"
            id="id"
            value={formData.id}
            onChange={(event) =>
              setFormData({
                ...formData,
                id: parseInt(event.target.value),
              })
            }
          />{' '}
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={(event) =>
              setFormData({
                ...formData,
                category: event.target.value,
              })
            }
          />
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="name"
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.target.value })
            }
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={formData.description}
            onChange={(event) =>
              setFormData({
                ...formData,
                description: event.target.value,
              })
            }
          />
          <label htmlFor="picture">Picture:</label>
          <input
            type="text"
            id="picture"
            value={formData.picture}
            onChange={(event) =>
              setFormData({
                ...formData,
                picture: event.target.value,
              })
            }
          />
          <label htmlFor="video">Video:</label>
          <input
            type="text"
            id="video"
            value={formData.video}
            onChange={(event) =>
              setFormData({ ...formData, video: event.target.value })
            }
          />
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            value={formData.link}
            onChange={(event) =>
              setFormData({ ...formData, link: event.target.value })
            }
          />
          <button type="submit">Submit</button>
          <button
            onClick={() => {
              /// cancels and resets admin page
              setInput('');
              setShowEditForm(false);
              setFormData(initialForm);
            }}
          >
            Cancel
          </button>
        </form>
      )}
      {/* delete post */}
      {/* edit post */}
      {/* other admin actions??? */}

      <button
        onClick={() => {
          setIsAdmin(false);
          setInput('');
        }}
      >
        Logout
      </button>
    </div>
  );
};

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

const postBlogPost = (blogPost: Data) => {
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
const updatePost = (blogPost: Data) => {
  console.log('sending update');
  axios
    .put(`http://localHost:4000/update/${blogPost.id}`, { blogPost })
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
