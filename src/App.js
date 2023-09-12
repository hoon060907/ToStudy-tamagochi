import { useEffect, useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import StudyListPage from './components/StudyListPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import StudyDiary from './components/StudyDiary';
import WriteDiary from './components/WriteDiary';
import Profile from './components/Profile';
import Layout from './components/Layout';
import Home from './components/Home';

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  useEffect(() => {
    console.log(auth.currentUser);
  })
  
  return (
    <Routes>
      <Route element={<Layout setIsLoggedIn={setIsLoggedIn} />}>
        <Route index element={<Home />} />
        <Route path='/tostudy' element={isLoggedin ? <StudyListPage /> : <Navigate to="/" />} />
        <Route path='/studydiary' element={isLoggedin ? <StudyDiary /> : <Navigate to="/" />} />
        <Route path='/writediary' element={isLoggedin ? <WriteDiary /> : <Navigate to="/" />} />
        <Route path='/profile' element={isLoggedin ? <Profile /> : <Navigate to="/" />} />
      </Route>
      <Route path="/login" element={<Login />}  />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
