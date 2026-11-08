import { useNavigate } from 'react-router-dom'

import {
  getCurrentUser,
  getOcorrenciasDoUtilizador
} from '../utils/storage'


const MinhasOcorrencias = () => {
  const navigate = useNavigate()

  const utilizador = getCurrentUser()


  const ocorrencias =
    getOcorrenciasDoUtilizador(
      utilizador?.email
    )


  return (
    <div className="minhas-ocorrencias">

      <h1>Minhas Ocorrências</h1>


      <div className="page-actions">

        <button
          className="voltar-button"
          onClick={() =>
            navigate('/home')
          }
        >
          Voltar
        </button>


        <button
          className="home-button"
          onClick={() =>
            navigate('/ocorrencias/nova')
          }
        >
          Nova ocorrência
        </button>

      </div>


      {ocorrencias.length === 0 ? (

        <div className="empty-card">

          <h3>
            Ainda não existem ocorrências
          </h3>

          <p>
            Quando submeter uma ocorrência,
            ela aparecerá aqui.
          </p>

        </div>

      ) : (

        <div className="lista-ocorrencias">

          {ocorrencias.map(
            (ocorrencia) => (

              <div
                className="ocorrencia-card"
                key={ocorrencia.id}
              >

                <h3>
                  {ocorrencia.titulo}
                </h3>


                <p>
                  <strong>Tipo:</strong>{' '}
                  {ocorrencia.tipo}
                </p>


                <p>
                  <strong>
                    Prioridade:
                  </strong>{' '}
                  {ocorrencia.prioridade}
                </p>


                <p>
                  <strong>Estado:</strong>{' '}
                  {ocorrencia.estado}
                </p>


                {ocorrencia.anonima && (
                  <p>
                    <strong>
                      Submissão:
                    </strong>{' '}
                    Anónima
                  </p>
                )}


                <button
                  className="detalhes-button"
                  onClick={() =>
                    navigate(
                      `/ocorrencias/${ocorrencia.id}`
                    )
                  }
                >
                  Ver detalhes
                </button>

              </div>

            )
          )}

        </div>

      )}

    </div>
  )
}

export default MinhasOcorrencias