import logo from './logo.svg';
import './App.css';
import EmployeeLogin from '../src/components/EmployeeLogin';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import EmployeeMainPage from '../src/components/EmployeeMainPage';

function App() {
  return (
      <BrowserRouter>
      <Routes>
              <Route path='/' element={<EmployeeLogin/>}/>
               <Route path='/success' element={<EmployeeMainPage/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
