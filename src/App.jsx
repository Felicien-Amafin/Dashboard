import { Route, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Projects from './pages/Projects';
import DomainUrls from './pages/DomainUrls';
import UrlDetails from './pages/UrlDetails';
import Header from './components/header';
import { useSelector } from 'react-redux';
import './index.css';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth } from './firebase/config';
import { setUser } from './store/authSlice';
import { useEffect } from 'react';

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(()=> {
    if (!user) {
      onAuthStateChanged(auth, (userInAuth) => {
        if(userInAuth) {
            dispatch(setUser(userInAuth));
        } else {
            dispatch(setUser(null));
        }
      });
    }
  }, [dispatch, user])

  return <>
    {!user && <Authentication/>}
    {user && <>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Projects/>}/>
          <Route path="/domain-urls" element={<DomainUrls/>}/>
          <Route path="/url-details" element={<UrlDetails/>}/>
        </Routes>
      </main>
    </>}
  </>
}

export default App;
