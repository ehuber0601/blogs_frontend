import logo from './logo.svg';
import './App.css';

// Import Our Components
import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

import {useState, useEffect} from "react"

import { Route, Routes, Link, useNavigate } from 'react-router-dom';

///////////////////////
// Style Objects
///////////////////////
const h1 = {
  textAlign: "center",
  margin: "10px"
};

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto"
}


function App() {
 
  // State and other variables

  const navigate = useNavigate()
  
  const url = "https://masoinite-blog-backend.herokuapp.com/blog/"
  
  
  // state to hold list of todos
  const [posts, setPosts] = useState([])

  // an empty todo for initializing the create form
  const nullBlog = {
    title: "",
    body: ""
  }

  const [targetBlog, setTargetBlog] = useState(nullBlog)
  
  ///////////////////
  // Functions
  ///////////////////
  
  ///////////////////
  // useEffects
  ///////////////////
  
  ///////////////////
  // Returned JSX
  ///////////////////

  // function to get list of todos from API
  const getBlogs = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  // function to add todos
  const addBlogs = async (newBlog) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(newBlog)
      });
    
    // update the list of todos
    getBlogs()
  };


  // to select a todo to edit
  const getTargetBlog = (blog) => {
    setTargetBlog(blog)
    navigate("/edit")
  }

  // update todo for our handlesubmit prop
  const updateBlog = async(blog) => {
    await fetch(url + blog.id, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    getBlogs();
  }

  const deleteBlog = async (blog) => {
    await fetch(url + blog.id, {
      method: "delete"
    })

    getBlogs()
    navigate("/")
  }

  
  //////////////
  // useEffects
  //////////////

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <div className="App">
        <h1 style={h1}>My Blog List</h1>
        <Link to="/new"><button style={button}>Create New Blog</button></Link>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts}/>}/>
        <Route path="/post/:id" element={<SinglePost posts={posts} edit={getTargetBlog} deleteBlog={deleteBlog}/>}/>
        <Route path="/new" element={<Form
          initialBlog={nullBlog}
          handleSubmit={addBlogs}
          buttonLabel="Create Blog"
          />}/>
        <Route path="/edit" element={<Form
          initialBlog={targetBlog}
          handleSubmit={updateBlog}
          buttonLabel="Update Blog"
        />} />
      </Routes>
    </div>
  );
}

export default App;