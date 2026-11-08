const USER_KEY = 'unipvc_utilizador'
const OCORRENCIAS_KEY = 'unipvc_ocorrencias'
const CODIGOS_ANONIMOS_KEY = 'unipvc_codigos_anonimos'


export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY)

  if (!user) {
    return null
  }

  return JSON.parse(user)
}


export const setCurrentUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}


export const clearCurrentUser = () => {
  localStorage.removeItem(USER_KEY)
}


export const getOcorrencias = () => {
  const ocorrencias = localStorage.getItem(OCORRENCIAS_KEY)

  if (!ocorrencias) {
    return []
  }

  return JSON.parse(ocorrencias)
}


const saveOcorrencias = (ocorrencias) => {
  localStorage.setItem(
    OCORRENCIAS_KEY,
    JSON.stringify(ocorrencias)
  )
}


const getCodigosAnonimos = () => {
  const codigos = localStorage.getItem(CODIGOS_ANONIMOS_KEY)

  if (!codigos) {
    return []
  }

  return JSON.parse(codigos)
}


const guardarCodigoAnonimo = (codigo) => {
  const codigos = getCodigosAnonimos()

  codigos.push(codigo)

  localStorage.setItem(
    CODIGOS_ANONIMOS_KEY,
    JSON.stringify(codigos)
  )
}


export const initializeMockData = (email) => {
  const ocorrencias = getOcorrencias()

  if (ocorrencias.length > 0) {
    return
  }

  const agora = new Date().toISOString()

  const dadosIniciais = [
    {
      id: 1,
      titulo: 'Mais bebedouros',
      descricao:
        'Acho que a escola precisa de mais bebedouros disponíveis para os alunos.',
      tipo: 'Sugestão',
      categoria: 'Instalações',
      prioridade: 'Baixa',
      escola: 'Escola Superior de Tecnologia e Gestão',
      anonima: false,
      imagemNome: null,
      emailUtilizador: email,
      estado: 'Submetida',
      dataSubmissao: agora,
      codigoAcompanhamento: null,
      respostas: [],
      historico: [
        {
          estado: 'Submetida',
          data: agora,
          utilizador: 'Sistema'
        }
      ]
    },

    {
      id: 2,
      titulo: 'Problema no projetor',
      descricao:
        'O projetor de uma das salas não está a funcionar corretamente.',
      tipo: 'Reclamação',
      categoria: 'Equipamentos',
      prioridade: 'Alta',
      escola: 'Escola Superior de Tecnologia e Gestão',
      anonima: false,
      imagemNome: null,
      emailUtilizador: email,
      estado: 'Em análise',
      dataSubmissao: agora,
      codigoAcompanhamento: null,
      respostas: [],
      historico: [
        {
          estado: 'Submetida',
          data: agora,
          utilizador: 'Sistema'
        },
        {
          estado: 'Em análise',
          data: agora,
          utilizador: 'Administração'
        }
      ]
    }
  ]

  saveOcorrencias(dadosIniciais)
}


const gerarCodigoAcompanhamento = () => {
  return (
    'AN-' +
    Date.now()
      .toString(36)
      .toUpperCase()
  )
}


export const addOcorrencia = (dados) => {
  const ocorrencias = getOcorrencias()

  const novoId =
    ocorrencias.length === 0
      ? 1
      : Math.max(...ocorrencias.map((o) => o.id)) + 1

  const data = new Date().toISOString()

  const codigo = dados.anonima
    ? gerarCodigoAcompanhamento()
    : null

  const novaOcorrencia = {
    id: novoId,

    titulo: dados.titulo,
    descricao: dados.descricao,
    tipo: dados.tipo,
    categoria: dados.categoria,
    prioridade: dados.prioridade,
    escola: dados.escola,

    anonima: dados.anonima,

    imagemNome: dados.imagemNome || null,

    emailUtilizador: dados.anonima
      ? null
      : dados.emailUtilizador,

    codigoAcompanhamento: codigo,

    estado: 'Submetida',

    dataSubmissao: data,

    respostas: [],

    historico: [
      {
        estado: 'Submetida',
        data,
        utilizador: 'Sistema'
      }
    ]
  }

  ocorrencias.push(novaOcorrencia)

  saveOcorrencias(ocorrencias)

  if (codigo) {
    guardarCodigoAnonimo(codigo)
  }

  return novaOcorrencia
}


export const getOcorrenciaById = (id) => {
  const ocorrencias = getOcorrencias()

  return ocorrencias.find(
    (ocorrencia) => ocorrencia.id === Number(id)
  )
}


export const getOcorrenciasDoUtilizador = (email) => {
  const ocorrencias = getOcorrencias()
  const codigosAnonimos = getCodigosAnonimos()

  return ocorrencias.filter((ocorrencia) => {
    const pertenceAoUtilizador =
      ocorrencia.emailUtilizador === email

    const anonimaGuardadaNesteBrowser =
      ocorrencia.codigoAcompanhamento &&
      codigosAnonimos.includes(
        ocorrencia.codigoAcompanhamento
      )

    return (
      pertenceAoUtilizador ||
      anonimaGuardadaNesteBrowser
    )
  })
}


export const updateEstadoOcorrencia = (
  id,
  novoEstado,
  utilizador
) => {
  const ocorrencias = getOcorrencias()

  const ocorrencia = ocorrencias.find(
    (o) => o.id === Number(id)
  )

  if (!ocorrencia) {
    return null
  }

  ocorrencia.estado = novoEstado

  ocorrencia.historico.push({
    estado: novoEstado,
    data: new Date().toISOString(),
    utilizador
  })

  saveOcorrencias(ocorrencias)

  return ocorrencia
}


export const addRespostaOcorrencia = (
  id,
  texto,
  utilizador
) => {
  const ocorrencias = getOcorrencias()

  const ocorrencia = ocorrencias.find(
    (o) => o.id === Number(id)
  )

  if (!ocorrencia) {
    return null
  }

  ocorrencia.respostas.push({
    id: Date.now(),
    texto,
    utilizador,
    data: new Date().toISOString()
  })

  saveOcorrencias(ocorrencias)

  return ocorrencia
}