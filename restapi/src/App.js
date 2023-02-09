import Navbar from './Componets/Navbar.jsx'
import Body from './Componets/Body.jsx';
import Footer from './Componets/Footer.jsx';
import Form from './Componets/Form.jsx';
import { Route, Routes } from 'react-router';
import Formlogin from './Componets/Formlogin.jsx';
import Reserver from './Componets/Reserver.jsx';
function App() {
  return (
    <>
        <Navbar />
      <div className="App">
        <Routes>
          <Route path='/Res' element={<Reserver />} />
          <Route path='/connecter' element={<Formlogin />} />
          <Route path="/"  element={<Body />} />
          <Route path="/enregistrer"  element={<Form />} />
        </Routes>

      </div>
        <Footer />
    </>
  );
}

export default App;
