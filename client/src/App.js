import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { auth } from './firebase';
import {useDispatch, useSelector} from 'react-redux'
import { logout , login, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const user=useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged(userAuth=>{
      if(userAuth){
        //LOGGED IN
        console.log(userAuth);
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email,
        }));
      }else{
        //Logged OUT
        dispatch(logout());
      }
    });
    return unsubscribe;
  },[dispatch])
  return (
    <div className="app">
      <Router>
        {
          !user?(<LoginScreen/>):
          (<Routes>
            <Route exact path="/" element={<HomeScreen/>}></Route>
            <Route path="/profile" element={<ProfileScreen/>}></Route>
          </Routes>)
        }
        
      </Router>
    </div>
  );
}

export default App;
