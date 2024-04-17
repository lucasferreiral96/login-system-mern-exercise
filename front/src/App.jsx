import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Signup } from "./Signup";
import { Home } from './Home';
import { Login } from './Login';
import { Dashboard } from './Dashboard';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
