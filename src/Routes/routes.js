import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login"
import CadastroTipoUsuario from "../pages/cadastrarTipoDeUsuario/CadastrarTipoDeUsuario"
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento"
import ListagemEventos from "../pages/listagemEventos/ListagemEventos"
import CadastrarEvento from "../pages/cadastroEvento/CadastroEvento";
import { useAuth } from "../../src/contexts/AuthContext";
import Home from "../pages/Home/Home";






const Privado = (props) => {
    const { usuario } = useAuth();
    // token, idUsuario, tipoUsuario

    // Se nao estiver autenticado manda para login
    if (!usuario) {
        return <Navigate to="/" />;
    }
    // Se o tipo do usuario nao for o permitido, bloqueia 
    if (usuario.tipoUsuario !== props.tipoPermitido) {
        //ir para a tela de nao encontrado!
        return <Navigate to="/" />;
    }

    // Senao, renderiza o componente passado
    return <props.Item />;
};



const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} exact />
                <Route path="/Home" element={<Home />} exact />
                <Route element={<Privado tipoPermitido="Administrador" Item={CadastroTipoUsuario} />} path="/CadastrarTipoUsuario" />
                <Route element={<Privado tipoPermitido="Administrador" Item={CadastroTipoEvento} />} path="/CadastrarTipoEvento" />
                <Route element={<Privado tipoPermitido="Administrador" Item={CadastrarEvento} />} path="/CadastrarEvento" />
                <Route element={<Privado tipoPermitido="Aluno" Item={ListagemEventos} />} path="/ListagemEventos"/>
                {/* <Route element={<Privado tipoPermitido="Aluno" Item={Home} />} path="/Home"/> */}
                

            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;