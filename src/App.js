import logo from './logo.svg';
import './App.css';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <div className="App">
      <div className='container p-5'>
        <div className='card w-50 mx-auto'>
          <div className='card-body'>
            <LoginComponent/>
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
