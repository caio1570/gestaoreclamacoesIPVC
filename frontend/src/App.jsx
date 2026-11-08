import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'


import Login from './pages/Login'
import Home from './pages/Home'

import NovaOcorrencia
  from './pages/NovaOcorrencia'

import MinhasOcorrencias
  from './pages/MinhasOcorrencias'

import OcorrenciaDetalhe
  from './pages/OcorrenciaDetalhe'

import AdminDashboard
  from './pages/AdminDashboard'

import AdminOcorrencias
  from './pages/AdminOcorrencias'


import ProtectedRoute
  from './components/ProtectedRoute'


const rolesAdministracao = [
  'Administrador',
  'Direção',
  'Presidência'
]


function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        <Route
          path="/login"
          element={<Login />}
        />


        <Route
          path="/home"
          element={
            <ProtectedRoute>

              <Home />

            </ProtectedRoute>
          }
        />


        <Route
          path="/ocorrencias/nova"
          element={
            <ProtectedRoute>

              <NovaOcorrencia />

            </ProtectedRoute>
          }
        />


        <Route
          path="/ocorrencias"
          element={
            <ProtectedRoute>

              <MinhasOcorrencias />

            </ProtectedRoute>
          }
        />


        <Route
          path="/ocorrencias/:id"
          element={
            <ProtectedRoute>

              <OcorrenciaDetalhe />

            </ProtectedRoute>
          }
        />


        <Route
          path="/admin"
          element={
            <ProtectedRoute
              allowedRoles={
                rolesAdministracao
              }
            >

              <AdminDashboard />

            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/ocorrencias"
          element={
            <ProtectedRoute
              allowedRoles={
                rolesAdministracao
              }
            >

              <AdminOcorrencias />

            </ProtectedRoute>
          }
        />


        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App