import React, { useState } from "react";
import "./Header.css";
import Logo from "../../assets/img/logo1.svg";
import Logo_adm from "../../assets/img/Vector.png";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  // Função para deslogar e ir para a tela de login
  const handleLogout = () => {
    localStorage.removeItem("token"); // ou outro dado que você use para autenticação
    navigate("/");
  };

  // Função para o botão "Acessar" ir para a tela de login
  const handleAcessar = () => {
    navigate("/");
  };

  return (
    <header>
      <div className="layout_grid cabecalho">
        <img src={Logo} alt="Logo Evento" />

        <button className="btn_hamburguer" onClick={toggleMenu} aria-label="Menu">
          <span className="hamburguer_linha"></span>
          <span className="hamburguer_linha"></span>
          <span className="hamburguer_linha"></span>
        </button>

        <nav className={`nav_header ${menuAberto ? "ativo" : ""}`}>
          <Link to="/Home" className="link_header" onClick={() => setMenuAberto(false)}>Home</Link>
          <Link to="/CadastrarEvento" className="link_header" onClick={() => setMenuAberto(false)}>Eventos</Link>
          <Link to="/CadastrarTipoUsuario" className="link_header" onClick={() => setMenuAberto(false)}>Usuários</Link>
          <a
            href="https://transparencia.sp.senai.br/sac"
            className="link_header"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuAberto(false)}
          >
            Contatos
          </a>
        </nav>

        <div className="Adm">
          <a href="#" className="link_header">
            {props.nomeUsu}
          </a>

          <img
            src={Logo_adm}
            alt="Vetor"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
            title="Clique para deslogar"
          />

          <button className="btn_acessar" onClick={handleAcessar}>
            Acessar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
