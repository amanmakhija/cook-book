import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Recipe from './pages/recipe/Recipe';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import Post from './pages/post/Post';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search/:name' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/recipe/:id' element={<Recipe />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/post-recipe' element={<Post />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
