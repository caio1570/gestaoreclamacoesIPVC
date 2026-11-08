import {
  useEffect,
  useState
} from 'react'

import {
  useNavigate,
  useParams
} from 'react-router-dom'

import { ESTADOS } from '../data/options'

import {
  getCurrentUser,
  getOcorrenciaById,
  updateEstadoOcorrencia,
  addRespostaOcorrencia
} from '../utils/storage'


const OcorrenciaDetalhe = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const utilizador = getCurrentUser()


  const [ocorrencia, setOcorrencia] =
    useState(null)

  const [novoEstado, setNovoEstado] =
    useState('')

  const [resposta, setResposta] =
    useState('')


  const podeGerir = [
    'Administrador',
    'Direção',
    'Presidência'
  ].includes(utilizador?.tipo)


  const carregarOcorrencia = () => {
    const dados = getOcorrenciaById(id)

    setOcorrencia(dados || null)

    if (dados) {
      setNovoEstado(dados.estado)
    }
  }


  useEffect(() => {
    carregarOcorrencia()
  }, [id])


  const formatarData = (data) => {
    return new Date(data).toLocaleString(
      'pt-PT'
    )
  }


  const alterarEstado = () => {
    updateEstadoOcorrencia(
      id,
      novoEstado,
      utilizador.nome
    )

    carregarOcorrencia()
  }


  const enviarResposta = () => {
    if (!resposta.trim()) {
      return
    }


    addRespostaOcorrencia(
      id,
      resposta.trim(),
      utilizador.nome
    )


    setResposta('')

    carregarOcorrencia()
  }


  if (!ocorrencia) {
    return (
      <div className="detalhe-page">

        <h1>
          Ocorrência não encontrada
        </h1>

        <button
          className="home-button"
          onClick={() =>
            navigate('/home')
          }
        >
          Voltar
        </button>

      </div>
    )
  }


  return (
    <div className="detalhe-page">

      <h1>Detalhes da Ocorrência</h1>


      <div className="detalhe-card">

        <h2>
          {ocorrencia.titulo}
        </h2>


        <div className="detalhe-grid">

          <p>
            <strong>ID:</strong>{' '}
            {ocorrencia.id}
          </p>

          <p>
            <strong>Tipo:</strong>{' '}
            {ocorrencia.tipo}
          </p>

          <p>
            <strong>Categoria:</strong>{' '}
            {ocorrencia.categoria}
          </p>

          <p>
            <strong>Prioridade:</strong>{' '}
            {ocorrencia.prioridade}
          </p>

          <p>
            <strong>Estado:</strong>{' '}
            {ocorrencia.estado}
          </p>

          <p>
            <strong>Destino:</strong>{' '}
            {ocorrencia.escola}
          </p>

          <p>
            <strong>Submissão:</strong>{' '}
            {ocorrencia.anonima
              ? 'Anónima'
              : 'Identificada'}
          </p>

          <p>
            <strong>Data:</strong>{' '}
            {formatarData(
              ocorrencia.dataSubmissao
            )}
          </p>

        </div>


        <div className="descricao-detalhe">

          <strong>Descrição</strong>

          <p>
            {ocorrencia.descricao}
          </p>

        </div>


        {ocorrencia.imagemNome && (

          <p>
            <strong>
              Imagem anexada:
            </strong>{' '}
            {ocorrencia.imagemNome}
          </p>

        )}


        {ocorrencia.codigoAcompanhamento && (

          <div className="tracking-code">

            <strong>
              Código de acompanhamento
            </strong>

            <span>
              {
                ocorrencia.codigoAcompanhamento
              }
            </span>

          </div>

        )}

      </div>


      <div className="detalhe-card">

        <h2>Respostas</h2>


        {ocorrencia.respostas.length === 0 ? (

          <p>
            Ainda não existem respostas.
          </p>

        ) : (

          ocorrencia.respostas.map(
            (resposta) => (

              <div
                className="resposta-item"
                key={resposta.id}
              >

                <strong>
                  {resposta.utilizador}
                </strong>

                <p>
                  {resposta.texto}
                </p>

                <small>
                  {formatarData(
                    resposta.data
                  )}
                </small>

              </div>

            )
          )

        )}

      </div>


      <div className="detalhe-card">

        <h2>Histórico de estados</h2>


        {ocorrencia.historico.map(
          (item, index) => (

            <div
              className="historico-item"
              key={index}
            >

              <strong>
                {item.estado}
              </strong>

              <span>
                {formatarData(item.data)}
              </span>

              <small>
                Alterado por {item.utilizador}
              </small>

            </div>

          )
        )}

      </div>


      {podeGerir && (

        <div className="detalhe-card admin-actions">

          <h2>
            Gestão da ocorrência
          </h2>


          <label>
            Alterar estado
          </label>

          <select
            value={novoEstado}
            onChange={(e) =>
              setNovoEstado(
                e.target.value
              )
            }
          >

            {ESTADOS.map((estado) => (

              <option
                value={estado}
                key={estado}
              >
                {estado}
              </option>

            ))}

          </select>


          <button
            onClick={alterarEstado}
          >
            Atualizar estado
          </button>


          <label>
            Responder à ocorrência
          </label>

          <textarea
            placeholder="Escreva a resposta..."
            value={resposta}
            onChange={(e) =>
              setResposta(e.target.value)
            }
          />


          <button
            onClick={enviarResposta}
          >
            Enviar resposta
          </button>

        </div>

      )}


      <div className="form-buttons">

        <button
          className="secondary-action"
          onClick={() =>
            navigate(-1)
          }
        >
          Voltar
        </button>


        <button
          onClick={() =>
            navigate(
              podeGerir
                ? '/admin'
                : '/home'
            )
          }
        >
          Página inicial
        </button>

      </div>

    </div>
  )
}

export default OcorrenciaDetalhe