import { useState } from "react";


const Login = () => {

const [email, setEmail] = useState("");

const [password, setPassword] = useState("");


return (
    <div>
<h1 className="titulo">UniPVC Reclamações e Sugestões</h1>
<div className="logincard">

<p>Bem-vindo ao sistema de reclamações e sugestões!</p>
<div className="form flex">
    <label>Email</label>
    <input type ="email" placeholder="seunome@ipvc.pt" className="inputlogin" value={email} onChange={(e) => setEmail(e.target.value)} />
    <label>Palavra-passe</label>
    <input type ="password" placeholder="Insira a sua palavra-passe" className="inputlogin" value={password} onChange={(e) => setPassword(e.target.value)} />
    <button className="botaologin">Iniciar Sessão</button>
    
</div>
<p>Acesso exclusivo para usuários da UniPVC</p>
</div>
</div>
)
}
export default Login