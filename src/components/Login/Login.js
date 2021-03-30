import React, { useContext } from 'react';

import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handelFacebookSignIn, handelGithubSignIn, handelGoogleSignIn, handelSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  const googleSignIn = () => {
    handelGoogleSignIn()
      .then(res => {
        handelResponse(res, true);
      })
  }

  const githubSignIn = () =>{
    handelGithubSignIn()
    .then(res =>{
      handelResponse(res, true);
    })
  }

  const facebookSignIn = () =>{
    handelFacebookSignIn()
    .then(res => {
      handelResponse(res, true);
    })
  }

  const signOut = () =>{
    handelSignOut()
    .then(res => {
      handelResponse(res, false);
    })
  }

  const handelSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
        handelResponse(res, true);
      })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handelResponse(res, true);
      })
    }
    event.preventDefault();
  }

  const handelBlur = (event) => {
    let isInputValid = true;
    if (event.target.name === 'email') {
      isInputValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 8;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isInputValid = isPasswordValid && passwordHasNumber;
    }
    if (isInputValid) {
      const newUserInfo = { ...user }
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handelResponse = (res, redirect) =>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Hello Buddy</h1>
      {
        user.isSignedIn ?
          <button onClick={signOut}>Sign Out</button>
          :
          <button onClick={googleSignIn}>Sign In with gmail</button>
      }
      <br />
      <button onClick={facebookSignIn}>Sign In with facebook</button>
      <br />
      <button onClick={githubSignIn}>Sign In with github</button>

      {
        user.isSignedIn &&
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <hr />
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handelSubmit}>
        <table style={{ margin: 'auto' }}>
          {newUser &&
            <tr>
              <td>Name</td>
              <td>:</td>
              <td><input type="text" name="name" onBlur={handelBlur} placeholder="Enter Your Name" required /></td>
            </tr>
          }
          <tr>
            <td>Email</td>
            <td>:</td>
            <td><input type="text" name="email" onBlur={handelBlur} placeholder="Enter Your Email Address" required /></td>
          </tr>
          <tr>
            <td>Password</td>
            <td>:</td>
            <td><input type="password" name="password" onBlur={handelBlur} placeholder="Enter Your Password" required /></td>
          </tr>
          <tr>
            <td colSpan="3"><input type="submit" value={newUser ? "Sign up" : "Sign in"} /></td>
          </tr>
        </table>
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}
    </div>
  );
}

export default Login;
