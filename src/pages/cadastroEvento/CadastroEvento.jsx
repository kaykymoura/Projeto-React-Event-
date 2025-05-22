import Cadastro from "../../components/cadastro/Cadastro"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import Lista from "../../components/lista/Lista"
import Banner from "../../assets/img/imagem2.png"

const CadastrarEvento = () => {
    return (
        <>
            <Header nomeUsu="Administrador"/>
            <Cadastro
                titulo="Cadastrar Evento"
                imagem={Banner}
                place="Nome"
            />
            <Lista 
            titulo="Lista de Evento"
            tdnome="Nome Evento"
            tituloEvento="Nome"
            nomeEvento1="Titulo Evento"
            nomeEvento2="Titulo Evento"
            />
            <Footer />
        </>
    )
}

export default CadastrarEvento;