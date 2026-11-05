import Login from './pages/Login';
import Home from './pages/Home';
import NovaOcorrencia from './pages/NovaOcorrencia';
import MinhasOcorrencias from './pages/MinhasOcorrencias';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ocorrencias/nova" element={<NovaOcorrencia />} />
        <Route path="/ocorrencias" element={<MinhasOcorrencias />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;