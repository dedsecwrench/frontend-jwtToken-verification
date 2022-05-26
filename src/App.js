import './App.css';
import Login from './components/Login';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import Users from './components/Users';

function App() {
  return (
    <div className="App">
         <Router>
                <Routes>
                  <Route path='/' element={<Navigate to='/login' />}  />
                  <Route path='/login' element={<Login/>}  />
                  <Route path='/users' element={<Users/>}  />
                </Routes>
        </Router> 
    </div>
  );
}

export default App;
