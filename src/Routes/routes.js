import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login"
import CadastroTipoUsuario from "../pages/cadastrarTipoDeUsuario/CadastrarTipoDeUsuario"
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento"
import ListagemEventos from "../pages/listagemEventos/ListagemEventos"

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/" element={<Login/>} exact/>

                <Route path="/CadastrarTipoUsuario" element={<CadastroTipoUsuario/>}/>
                
                <Route path="/CadastrarEvento" element={<CadastroEvento/>}/>

                <Route path="/CadastrarTipoEvento" element={<CadastroTipoEvento/>}/>

                <Route path="/ListagemEventos" element={<ListagemEventos/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;