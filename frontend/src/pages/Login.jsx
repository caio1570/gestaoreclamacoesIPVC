import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  setCurrentUser,
  initializeMockData
} from '../utils/storage'


const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')


  const criarNome = (email) => {
    const nomeEmail = email.split('@')[0]

    return nomeEmail
      .replace('.', ' ')
      .replace(/\b\w/g, (letra) =>
        letra.toUpperCase()
      )
  }


  const handleLogin = (e) => {
    e.preventDefault()

    const emailNormalizado =
      email.trim().toLowerCase()


    if (!emailNormalizado.endsWith('ipvc.pt')) {
      setErro(
        'Utilize um email institucional do UniPVC.'
      )

      return
    }


    if (!password) {
      setErro('Introduza a palavra-passe.')

      return
    }


    let tipo = 'Utilizador'


    if (emailNormalizado.startsWith('admin@')) {
      tipo = 'Administrador'
    }

    else if (
      emailNormalizado.startsWith('direcao@')
    ) {
      tipo = 'Direção'
    }

    else if (
      emailNormalizado.startsWith(
        'presidencia@'
      )
    ) {
      tipo = 'Presidência'
    }


    const utilizador = {
      nome: criarNome(emailNormalizado),
      email: emailNormalizado,
      tipo
    }


    setCurrentUser(utilizador)


    if (tipo === 'Utilizador') {
      initializeMockData(emailNormalizado)

      navigate('/home')
    }

    else {
      initializeMockData('aluno@ipvc.pt')

      navigate('/admin')
    }
  }


  return (
    <div className="login-page">

      <h1 className="titulo">
        UniPVC Reclamações e Sugestões
      </h1>


      <div className="logincard">

        <h2>Iniciar sessão</h2>

        <p className="login-description">
          Acesso exclusivo a utilizadores do UniPVC
        </p>


        <form
          className="form"
          onSubmit={handleLogin}
        >

          <label>Email institucional</label>

          <input
            type="email"
            placeholder="seunome@ipvc.pt"
            className="inputlogin"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />


          <label>Palavra-passe</label>

          <input
            type="password"
            placeholder="Insira a sua palavra-passe"
            className="inputlogin"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          {erro && (
            <p className="erro-form">
              {erro}
            </p>
          )}


          <button
            className="botaologin"
            type="submit"
          >
            Iniciar sessão
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login