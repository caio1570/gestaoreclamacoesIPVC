import { useNavigate } from 'react-router-dom'

import {
  clearCurrentUser,
  getCurrentUser
} from '../utils/storage'


const Home = () => {
  const navigate = useNavigate()

  const utilizador = getCurrentUser()


  const handleLogout = () => {
    clearCurrentUser()

    navigate('/login')
  }


  return (
    <div>

      <header className="home-header">

        <span>
          UniPVC Reclamações e Sugestões
        </span>


        <div className="header-actions">

          <span className="header-user">
            {utilizador?.nome}
          </span>


          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Terminar sessão
          </button>

        </div>

      </header>


      <main className="home">

        <h2>
          Bem-vindo ao sistema de reclamações
          e sugestões!
        </h2>


        <p>
          Este sistema permite que os utilizadores
          registem reclamações e sugestões de forma
          eficiente e organizada.
        </p>

        <p>
          Escolha abaixo o que pretende fazer.
        </p>


        <div className="home-actions">

          <div className="home-card">

            <h3>Nova ocorrência</h3>

            <p>
              Crie uma nova sugestão ou reclamação.
            </p>

            <button
              className="home-button"
              onClick={() =>
                navigate('/ocorrencias/nova')
              }
            >
              Criar ocorrência
            </button>

          </div>


          <div className="home-card">

            <h3>As minhas ocorrências</h3>

            <p>
              Consulte as ocorrências que já
              submeteu.
            </p>

            <button
              className="home-button"
              onClick={() =>
                navigate('/ocorrencias')
              }
            >
              Consultar ocorrências
            </button>

          </div>

        </div>


        <div className="stats-card">

          <h3>Estado das ocorrências</h3>


          <div className="estados">

            <div className="estado-item">
              <strong>Submetida</strong>

              <p>
                A ocorrência foi recebida pela
                plataforma.
              </p>
            </div>


            <div className="estado-item">
              <strong>Em análise</strong>

              <p>
                A ocorrência está a ser analisada.
              </p>
            </div>


            <div className="estado-item">
              <strong>
                Em tratamento
              </strong>

              <p>
                Estão a ser tomadas medidas para
                resolver a ocorrência.
              </p>
            </div>


            <div className="estado-item">
              <strong>Resolvida</strong>

              <p>
                Foi encontrada uma solução ou dada
                uma resposta.
              </p>
            </div>


            <div className="estado-item">
              <strong>Encerrada</strong>

              <p>
                O processo foi concluído e fechado.
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Home