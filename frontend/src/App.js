import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { UserState } from './Context';

function App() {
  const { user } = UserState()
  console.log("user",user)

  return (
    <Router>
      <Routes>
        <Route path='/' element={user && user.token ? <Dashboard /> :<SignIn />} />
        <Route path='/login' element={user && user.token ? <Dashboard /> :<SignIn/>} />
        <Route path='/signup' element={user && user.token ? <Dashboard />:<SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App;
