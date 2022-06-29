import logo from './logo.svg';
import './App.css';
import LoginComponent from './components/LoginComponent';
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
  const { token, setToken } = useToken();
  console.log(token) ;
  
  return (
    <div className="App">
      <div className='container p-5'>
        <div className='card w-50 mx-auto'>
          <div className='card-body'>
            <LoginComponent setToken={setToken}/>
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
