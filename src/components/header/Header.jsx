import "./Header.css"
import Logo from "../../assets/img/logo1.svg"
import Logo_adm from "../../assets/img/Vector.png"
import { Link } from "react-router-dom"


const Header = (props) => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                <img src={Logo} alt="Logo Evento" />
                <nav className="nav_header">
                    <Link to="/Home" className="link_header" href="">Home</Link>
                    <Link to="/CadastrarEvento" className="link_header" href="">Eventos</Link>
                    <Link to="/CadastrarTipoUsuario" className="link_header" href="">Usuários</Link>
                    <a href="https://transparencia.sp.senai.br/sac" className="link_header" target="_blank" rel="noopener noreferrer">
                        Contatos
                    </a>

                </nav>
                <div className="Adm">
                    <a href="" className="link_header">{props.nomeUsu}</a>
                    <img src={Logo_adm} alt="Vetor" />
                </div>

            </div>
        </header>
    )
}

export default Header;