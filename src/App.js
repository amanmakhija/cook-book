import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import Recipe from './pages/recipe/Recipe';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/recipe/:id' element={<Recipe />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
