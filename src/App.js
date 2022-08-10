import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateForm from './components/CreateForm';
import Error from './components/Error'
// import Prueba from '../src/components/Prueba'
import Details from './components/Details';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
  <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/recipes" element={<Home/>}/>
    <Route path="/recipes/:id" element={<Details/>}/>
    <Route path="/recipe" element={<CreateForm/>}/>
    <Route path="*" element={<Error/>}/>

  </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
