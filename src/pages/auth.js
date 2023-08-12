import React, { useState } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.baseUrl;

export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};
const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);

  const [username1, setUsername] = useState("");
  const [password1, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(`${baseUrl}/auth/login`, {
        username1,
        password1,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username1">Username:</label>
          <input
            type="text"
            id="username1"
            value={username1}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password:</label>
          <input
            type="password"
            id="password1"
            value={password1}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
// original below...above is code after username - to username1
// const Login = () => {
//   const [_, setCookies] = useCookies(["access_token"]);

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const result = await axios.post(`${baseUrl}/auth/login`, {
//         username,
//         password,
//       });

//       setCookies("access_token", result.data.token);
//       window.localStorage.setItem("userID", result.data.userID);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <div className="form-group">
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(event) => setUsername(event.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${baseUrl}/auth/register`, {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
