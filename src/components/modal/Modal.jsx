import { useEffect, useState } from "react";
import ImgDeletar from "../../assets/img/Deletarzinho.png";
import "./Modal.css";
import api from "../../Services/services";

const Modal = (props) => {
  const [comentarios, setComentarios] = useState([]);

  async function listarComentarios() {
    try {
      const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`);
      setComentarios(resposta.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarComentarios();
  }, []);

  async function cadastrarComentario() {
    
  }

  async function deletarComentario() {
    
  }



  return (
    <>
      <div className="model-overlay" onClick={props.fecharModal}></div>
      <div className="model">
        <h1>{props.titulo}</h1>
        <div className="model_conteudo">
          {props.tipoModel === "descricaoEvento" ? (
            <p>{props.descricao}</p>
          ) : (
            <>
              {comentarios.map((item) => (
                <div key={item.idComentarioEvento}>
                  <strong>{item.usuario.nomeUsuario}</strong>
                  <img src={ImgDeletar} alt="Deletar" />
                  <p>{item.descricao}</p>
                  <hr />
                </div>
              ))}
              <div>
                <input type="text" placeholder="Escreva seu comentario..." />
                <button>Cadastrar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
