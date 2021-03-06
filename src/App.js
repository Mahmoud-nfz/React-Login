import logo from './logo.svg';
import './App.css';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import TestComponent from './components/TestComponent';
import useToken from './hooks/useToken';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const { token, setToken } = useToken(localStorage);
  console.log(token) ;
  
  return (
    <div className="App">
      <div className='container p-5'>
        <div className='card w-50 mx-auto'>
          <div className='card-body'>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginComponent setToken={setToken} loginUrl='http://localhost:8001/login' callbackOnSignIn={()=>{}} />}/>
              <Route path="/signup" element={<SignUpComponent setToken={setToken} loginUrl='http://localhost:8000/register' callbackOnSignUp={()=>{}} />}/>
              <Route path="/test" element={<TestComponent/>} />
              <Route path="*" element={<Navigate to="/signup" replace />}/>
            </Routes>
          </BrowserRouter>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// module.exports = {
//   LoginComponent,
//   App
// }
