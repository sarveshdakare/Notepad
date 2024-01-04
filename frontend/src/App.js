
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Addproduct from './Component/Addproduct';
import Footer from './Component/Footer';
import Login from './Component/Login';
import Nav from './Component/Nav';
import PrivateComponent from './Component/PrivateComponent';
import Productlist from './Component/Productlist';
import Signup from './Component/Signup';
import UpdateProduct from './Component/UpdateProduct';


function App() {



  return (
    <div className="App">
    <BrowserRouter>
    <Nav/>
    <Routes>
    <Route element={<PrivateComponent/>}>
      <Route path="/" element={<Productlist/>}/>
      <Route path="/add" element={<Addproduct/>}/>
      <Route path="/update/:id" element={<UpdateProduct/>}/>
      <Route path="/logout" element={<h1>Logout Page</h1>}/>
      <Route path="/profile" element={<h1>Profile Page</h1>}/>
   
     </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
   {/* <Footer/> */}
    </div>
  );
}

export default App;
