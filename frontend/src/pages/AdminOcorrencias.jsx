import { useNavigate } from 'react-router-dom'

import {
  getOcorrencias
} from '../utils/storage'


const AdminOcorrencias = () => {
  const navigate = useNavigate()

  const ocorrencias = getOcorrencias()


  return (
    <div className="minhas-ocorrencias">

      <h1>
        Gestão de Ocorrências
      </h1>


      <button
        className="voltar-button"
        onClick={() =>
          navigate('/admin')
        }
      >
        Voltar
      </button>


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
                <strong>
                  Tipo:
                </strong>{' '}
                {ocorrencia.tipo}
              </p>


              <p>
                <strong>
                  Prioridade:
                </strong>{' '}
                {ocorrencia.prioridade}
              </p>


              <p>
                <strong>
                  Estado:
                </strong>{' '}
                {ocorrencia.estado}
              </p>


              <p>
                <strong>
                  Destino:
                </strong>{' '}
                {ocorrencia.escola}
              </p>


              <p>
                <strong>
                  Identificação:
                </strong>{' '}
                {ocorrencia.anonima
                  ? 'Anónima'
                  : 'Identificada'}
              </p>


              <button
                className="detalhes-button"
                onClick={() =>
                  navigate(
                    `/ocorrencias/${ocorrencia.id}`
                  )
                }
              >
                Gerir ocorrência
              </button>

            </div>

          )
        )}

      </div>

    </div>
  )
}

export default AdminOcorrencias