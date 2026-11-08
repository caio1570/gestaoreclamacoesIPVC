import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  TIPOS,
  CATEGORIAS,
  PRIORIDADES,
  ESCOLAS
} from '../data/options'

import {
  addOcorrencia,
  getCurrentUser
} from '../utils/storage'


const NovaOcorrencia = () => {
  const navigate = useNavigate()

  const utilizador = getCurrentUser()


  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tipo, setTipo] = useState('')
  const [categoria, setCategoria] = useState('')
  const [prioridade, setPrioridade] = useState('')
  const [escola, setEscola] = useState('')
  const [anonima, setAnonima] = useState(false)
  const [imagem, setImagem] = useState(null)


  const handleSubmit = (e) => {
    e.preventDefault()


    const novaOcorrencia = addOcorrencia({
      titulo,
      descricao,
      tipo,
      categoria,
      prioridade,
      escola,
      anonima,

      imagemNome:
        imagem ? imagem.name : null,

      emailUtilizador:
        utilizador?.email
    })


    if (
      novaOcorrencia.codigoAcompanhamento
    ) {
      alert(
        'Ocorrência submetida de forma anónima.\n\n' +
        'Código de acompanhamento: ' +
        novaOcorrencia.codigoAcompanhamento
      )
    }


    navigate(
      `/ocorrencias/${novaOcorrencia.id}`
    )
  }


  return (
    <div className="nova-ocorrencia">

      <h1>Nova Ocorrência</h1>


      <form
        className="ocorrencia-form"
        onSubmit={handleSubmit}
      >

        <label>Tipo de ocorrência</label>

        <select
          value={tipo}
          onChange={(e) =>
            setTipo(e.target.value)
          }
          required
        >

          <option value="">
            Selecione o tipo
          </option>

          {TIPOS.map((opcao) => (
            <option
              key={opcao}
              value={opcao}
            >
              {opcao}
            </option>
          ))}

        </select>


        <label>Título</label>

        <input
          type="text"
          placeholder="Insira o título da ocorrência"
          value={titulo}
          onChange={(e) =>
            setTitulo(e.target.value)
          }
          required
        />


        <label>Descrição</label>

        <textarea
          placeholder="Descreva a situação"
          value={descricao}
          onChange={(e) =>
            setDescricao(e.target.value)
          }
          required
        />


        <label>Categoria</label>

        <select
          value={categoria}
          onChange={(e) =>
            setCategoria(e.target.value)
          }
          required
        >

          <option value="">
            Selecione uma categoria
          </option>

          {CATEGORIAS.map((opcao) => (
            <option
              key={opcao}
              value={opcao}
            >
              {opcao}
            </option>
          ))}

        </select>


        <label>Prioridade</label>

        <select
          value={prioridade}
          onChange={(e) =>
            setPrioridade(e.target.value)
          }
          required
        >

          <option value="">
            Selecione a prioridade
          </option>

          {PRIORIDADES.map((opcao) => (
            <option
              key={opcao}
              value={opcao}
            >
              {opcao}
            </option>
          ))}

        </select>


        <label>Destino da ocorrência</label>

        <select
          value={escola}
          onChange={(e) =>
            setEscola(e.target.value)
          }
          required
        >

          <option value="">
            Selecione o destino
          </option>

          {ESCOLAS.map((opcao) => (
            <option
              key={opcao}
              value={opcao}
            >
              {opcao}
            </option>
          ))}

        </select>


        <div className="anonima-container">

          <input
            type="checkbox"
            id="anonima"
            checked={anonima}
            onChange={(e) =>
              setAnonima(e.target.checked)
            }
          />

          <label htmlFor="anonima">
            Submeter ocorrência de forma anónima
          </label>

        </div>


        <label>Imagem (opcional)</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImagem(
              e.target.files?.[0] || null
            )
          }
        />


        <div className="form-buttons">

          <button
            type="button"
            className="secondary-action"
            onClick={() =>
              navigate('/home')
            }
          >
            Voltar
          </button>


          <button type="submit">
            Submeter ocorrência
          </button>

        </div>

      </form>

    </div>
  )
}

export default NovaOcorrencia