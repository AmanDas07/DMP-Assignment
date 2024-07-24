
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from '../src/Pages/Register'
import { UserProvider } from './context/context';
import Header from './Components/Header';
import Login from './Pages/Login.js';
import HomePage from './Pages/Homepage.js';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
