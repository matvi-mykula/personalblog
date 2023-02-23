export {};
// import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
// import { App } from './Home';
// import './App.css';
// import React, { useEffect, useState } from 'react';
// import { FormEventHandler } from 'react';
// // import { Button, Form, Navbar, Card } from 'react-bootstrap';
// import {
//   TextInput,
//   Checkbox,
//   NumberInput,
//   Select,
//   Button,
//   Group,
//   Box,
// } from '@mantine/core';
// import { useForm } from '@mantine/form';

// import axios from 'axios';

// interface Props {
//   isAdmin: boolean;
//   setIsAdmin: Function;
// }

// const Login: React.FC<Props> = ({ isAdmin, setIsAdmin }) => {
//   const [input, setInput] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [showAllPosts, setShowAllPosts] = useState(false);
//   const [allData, setAllData] = useState([]);
//   const [showEditForm, setShowEditForm] = useState(false);

//   const loginAdmin: Function = (password: string) => {
//     console.log(password);
//     if (password === 'admin') {
//       /// this prob isnt super secure and i should do this using passport
//       setIsAdmin(true);
//     } else {
//       setErrorMessage('Incorrect password. Please try again.');
//       console.log(errorMessage);
//     }
//   };

//   /// use effect to run when showallposts changes and fetchs data
//   useEffect(() => {
//     console.log('useeffect');
//     const getData = async () => {
//       try {
//         const response = await fetchPosts();
//         console.log(response);
//         setAllData(response);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     console.log({ allData });
//     getData();
//     // let postListJSX = []
//     // for (let i = 0; i < allData.length; i++) {

//     // }
//   }, [showAllPosts, showEditForm]);
//   /////
//   const initialForm = {
//     id: allData.length,
//     category: '',
//     title: '',
//     description: '', //make larger text field
//     // how to make pictures into arrays of strings?
//     picture: '',
//     video: '',
//     link: '',
//     timeStamp: new Date(),
//   };
//   const [formData, setFormData] = useState(initialForm);
//   if (!isAdmin) {
//     return (
//       <div>
//         <p>Enter Admin Password</p>
//         <Form.Control
//           type="text"
//           value={input}
//           onChange={(event) => setInput(event.target.value)}
//         />
//         <Button
//           variant="secondary"
//           onClick={() => loginAdmin(input)}
//         >
//           Login
//         </Button>
//         {errorMessage && <p>{errorMessage}</p>}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <p>Welcome Administrator</p>

//       {!showForm && !showAllPosts && (
//         <div>
//           <Button
//             // variant="secondary"
//             onClick={() => {
//               setShowForm(true);
//             }}
//           >
//             Add New Post
//           </Button>
//           <Button
//             onClick={() => {
//               setShowAllPosts(true);
//             }}
//           >
//             Delete/Edit
//           </Button>
//         </div>
//       )}

//       {/* add new post */}
//       {showForm && (
//         <Form
//           className="postForm"
//           onSubmit={(event) => {
//             event.preventDefault();
//             const form = formData;
//             console.log({ form });
//             if (form) {
//               postBlogPost(form);
//             }
//             setShowForm(false);
//           }}
//         >
//           <Form.Label htmlFor="id">ID #:</Form.Label>
//           <Form.Control
//             type="number"
//             id="id"
//             value={formData.id} // get to auto to next index number
//             onChange={(event) =>
//               setFormData({ ...formData, id: parseInt(event.target.value) })
//             }
//           />{' '}
//           <Form.Label htmlFor="category">Category:</Form.Label>
//           <select
//             id="category"
//             value={formData.category} // pick from options
//             onChange={(event) => {
//               setFormData({ ...formData, category: event.target.value });
//               console.log(formData.category);
//             }}
//           >
//             <option value="coding">coding</option>
//             <option value="movement">movement</option>
//             <option value="clothing">clothing</option>
//           </select>
//           <Form.Label htmlFor="title">Title:</Form.Label>
//           <Form.Control
//             type="text"
//             id="name"
//             value={formData.title}
//             onChange={(event) =>
//               setFormData({ ...formData, title: event.target.value })
//             }
//           />
//           <Form.Label htmlFor="description">Description:</Form.Label>
//           <textarea
//             // type="text"
//             id="description"
//             value={formData.description}
//             onChange={(event) =>
//               setFormData({ ...formData, description: event.target.value })
//             }
//           />
//           <Form.Label htmlFor="picture">Picture:</Form.Label>
//           <Form.Control
//             type="text"
//             id="picture"
//             value={formData.picture}
//             onChange={(event) =>
//               setFormData({ ...formData, picture: event.target.value })
//             }
//           />
//           <Form.Label htmlFor="video">Video:</Form.Label>
//           <Form.Control
//             type="text"
//             id="video"
//             value={formData.video}
//             onChange={(event) =>
//               setFormData({ ...formData, video: event.target.value })
//             }
//           />
//           <Form.Label htmlFor="link">Link:</Form.Label>
//           <Form.Control
//             type="text"
//             id="link"
//             value={formData.link}
//             onChange={(event) =>
//               setFormData({ ...formData, link: event.target.value })
//             }
//           />
//           <Button
//             variant="secondary"
//             type="submit"
//           >
//             Submit
//           </Button>
//           <Button
//             variant="secondary"
//             onClick={() => {
//               /// cancels and resets admin page
//               setInput('');
//               setShowForm(false);
//               setFormData(initialForm);
//             }}
//           >
//             Cancel
//           </Button>
//         </Form>
//       )}
//       <div></div>

//       {showAllPosts &&
//         allData.map((post: any) => (
//           <div>
//             <p>{post.title}</p>
//             <Button
//               onClick={() => {
//                 if (
//                   window.confirm('Are you sure you want to delete this post?')
//                 ) {
//                   removePost(Number(post.id));
//                   setShowAllPosts(false);
//                 }
//               }}
//             >
//               Delete
//             </Button>
//             {/* once edit button is clicked needs to remove all posts and show editable form with selected post content */}
//             <Button
//               variant="secondary"
//               onClick={() => {
//                 setShowAllPosts(false);
//                 setFormData(post);
//                 console.log({ formData });
//                 setShowEditForm(true);
//                 //gotta make a huge form here
//               }}
//             >
//               Edit
//             </Button>
//           </div>
//         ))}
//       {showEditForm && (
//         // should add error handling for inputs of the same id or title
//         <Form
//           className="postForm"
//           onSubmit={(event) => {
//             event.preventDefault();
//             const form = formData;
//             console.log({ form });
//             if (form) {
//               updatePost(form);
//             }
//             setShowForm(false);
//             setShowEditForm(false);
//           }}
//         >
//           <Form.Label htmlFor="id">ID #:</Form.Label>
//           <Form.Control
//             type="number"
//             id="id"
//             value={formData.id}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 id: parseInt(event.target.value),
//               })
//             }
//           />{' '}
//           <Form.Label htmlFor="category">Category:</Form.Label>
//           <select
//             id="category"
//             value={formData.category} // pick from options
//             onChange={(event) => {
//               setFormData({ ...formData, category: event.target.value });
//               console.log(formData.category);
//             }}
//           >
//             <option value="coding">coding</option>
//             <option value="movement">movement</option>
//             <option value="clothing">clothing</option>
//           </select>
//           {/* <Form.Control
//             type="text"
//             id="category"
//             value={formData.category}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 category: event.target.value,
//               })
//             }
//           /> */}
//           <Form.Label htmlFor="title">Title:</Form.Label>
//           <Form.Control
//             type="text"
//             id="name"
//             value={formData.title}
//             onChange={(event) =>
//               setFormData({ ...formData, title: event.target.value })
//             }
//           />
//           <Form.Label htmlFor="description">Description:</Form.Label>
//           <Form.Control
//             type="text"
//             id="description"
//             value={formData.description}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 description: event.target.value,
//               })
//             }
//           />
//           <Form.Label htmlFor="picture">Picture:</Form.Label>
//           <Form.Control
//             type="text"
//             id="picture"
//             value={formData.picture}
//             onChange={(event) =>
//               setFormData({
//                 ...formData,
//                 picture: event.target.value,
//               })
//             }
//           />
//           <Form.Label htmlFor="video">Video:</Form.Label>
//           <Form.Control
//             type="text"
//             id="video"
//             value={formData.video}
//             onChange={(event) =>
//               setFormData({ ...formData, video: event.target.value })
//             }
//           />
//           <Form.Label htmlFor="link">Link:</Form.Label>
//           <Form.Control
//             type="text"
//             id="link"
//             value={formData.link}
//             onChange={(event) =>
//               setFormData({ ...formData, link: event.target.value })
//             }
//           />
//           <Button
//             variant="secondary"
//             type="submit"
//           >
//             Submit
//           </Button>
//           <Button
//             variant="secondary"
//             onClick={() => {
//               /// cancels and resets admin page
//               setInput('');
//               setShowEditForm(false);
//               setFormData(initialForm);
//             }}
//           >
//             Cancel
//           </Button>
//         </Form>
//       )}
//       {/* delete post */}
//       {/* edit post */}
//       {/* other admin actions??? */}

//       <Button
//         variant="secondary"
//         onClick={() => {
//           setIsAdmin(false);
//           setInput('');
//         }}
//       >
//         Logout
//       </Button>
//     </div>
//   );
// };

// interface Data {
//   id: Number;
//   category: String;
//   title: String;
//   description: String;
//   picture: String;
//   video: String;
//   link: String;
//   timeStamp: Date;
// }
// interface Props {
//   newData: Data;
//   allData: Data[];
// }

// const MyForm: React.FC<Props> = ({ newData, allData }) => {
//   const form = useForm({
//     initialValues: {
//       id: allData.length,
//       category: newData.category,
//       title: newData.title,
//       description: newData.description,
//       picture: newData.picture,
//       video: newData.video,
//       link: newData.link,
//       timeStamp: newData.timeStamp,
//     },

//     validate: {
//       // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
//     },
//   });
//   return (
//     <Box>
//       <form
//         onSubmit={form.onSubmit((values) => {
//           console.log(values);
//           values.timeStamp = new Date();
//           postBlogPost(values);
//         })}
//       >
//         <NumberInput
//           withAsterisk
//           label="id"
//           {...form.getInputProps('id')}
//         ></NumberInput>
//         <Select
//           withAsterisk
//           label="Category"
//           data={[
//             { value: 'coding', label: 'coding' },
//             { value: 'movement', label: 'movement' },
//             { value: 'clothing', label: 'clothing' },
//           ]}
//           {...form.getInputProps('category')}
//         ></Select>
//         <TextInput
//           withAsterisk
//           label="Title"
//           placeholder="Title"
//           {...form.getInputProps('title')}
//         />
//         <TextInput
//           withAsterisk
//           label="Description"
//           placeholder="'Description"
//           {...form.getInputProps('description')}
//         />
//         <TextInput
//           withAsterisk
//           label="Picture"
//           placeholder="Picture"
//           {...form.getInputProps('picture')}
//         />
//         <TextInput
//           withAsterisk
//           label="Video"
//           placeholder="Video"
//           {...form.getInputProps('video')}
//         />
//         <TextInput
//           withAsterisk
//           label="Link"
//           placeholder="Link"
//           {...form.getInputProps('link')}
//         ></TextInput>
//       </form>
//     </Box>
//   );
// };

// const postBlogPost = (blogPost: Data) => {
//   console.log('posting blog post');
//   axios
//     .post('http://localhost:4000/postBlogPost', {
//       blogPost,
//     })
//     .then((response) => {
//       console.log('this blog post should be posted');

//       console.log(response.data);
//     });
// };
// const updatePost = (blogPost: Data) => {
//   console.log('sending update');
//   axios
//     .put(`http://localHost:4000/update/${blogPost.id}`, { blogPost })
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// //get all posts to be edited or deleted
// const fetchPosts = async () => {
//   try {
//     const response = await axios.get(`http://localhost:4000/getAllPosts`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// // deletes post onclick from database
// const removePost = (id: number) => {
//   axios
//     .delete(`http://localhost:4000/delete/${id}`)
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export { Login };
