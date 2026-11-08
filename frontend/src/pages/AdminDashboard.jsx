import { useNavigate } from 'react-router-dom'

import {
  clearCurrentUser,
  getCurrentUser,
  getOcorrencias
} from '../utils/storage'


const AdminDashboard = () => {
  const navigate = useNavigate()

  const utilizador = getCurrentUser()

  const ocorrencias = getOcorrencias()


  const submetidas =
    ocorrencias.filter(
      (o) => o.estado === 'Submetida'
    ).length


  const emTratamento =
    ocorrencias.filter(
      (o) =>
        o.estado === 'Em análise' ||
        o.estado === 'Em tratamento'
    ).length


  const resolvidas =
    ocorrencias.filter(
      (o) =>
        o.estado === 'Resolvida' ||
        o.estado === 'Encerrada'
    ).length


  const logout = () => {
    clearCurrentUser()

    navigate('/login')
  }


  return (
    <div className="admin-page">

      <header className="home-header">

        <span>
          Painel de Administração
        </span>


        <div className="header-actions">

          <span className="header-user">
            {utilizador?.nome}
          </span>

          <button
            className="logout-button"
            onClick={logout}
          >
            Terminar sessão
          </button>

        </div>

      </header>


      <main className="admin-content">

        <h1>
          Bem-vindo, {utilizador?.nome}
        </h1>

        <p>
          Tipo de utilizador:{' '}
          <strong>
            {utilizador?.tipo}
          </strong>
        </p>


        <div className="admin-stats">

          <div className="admin-stat-card">

            <strong>
              {ocorrencias.length}
            </strong>

            <span>
              Total de ocorrências
            </span>

          </div>


          <div className="admin-stat-card">

            <strong>
              {submetidas}
            </strong>

            <span>
              Submetidas
            </span>

          </div>


          <div className="admin-stat-card">

            <strong>
              {emTratamento}
            </strong>

            <span>
              Em tratamento
            </span>

          </div>


          <div className="admin-stat-card">

            <strong>
              {resolvidas}
            </strong>

            <span>
              Resolvidas / encerradas
            </span>

          </div>

        </div>


        <div className="admin-options">

          <div className="home-card">

            <h3>
              Gerir ocorrências
            </h3>

            <p>
              Consulte, responda e altere o
              estado das ocorrências.
            </p>

            <button
              className="home-button"
              onClick={() =>
                navigate(
                  '/admin/ocorrencias'
                )
              }
            >
              Ver ocorrências
            </button>

          </div>

        </div>

      </main>

    </div>
  )
}

export default AdminDashboard