import './App.css'; // Importing the App's stylesheet from the local file system
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function WelcomePage(props) {
  return (
    <div>
      <h1>Welcome to the game, {props.username}!</h1>
    </div>
  );
}

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000', { username, password })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">Add a new user</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={
            <div>
              <h1>Add a new user</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          }/>
          <Route path="/welcome" element={<WelcomePage username={username} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

