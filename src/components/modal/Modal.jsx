import { useEffect, useState } from "react";
import ImgDeletar from "../../assets/img/Deletarzinho.png";
import "./Modal.css";
import api from "../../Services/services";
import { useAuth } from "../../contexts/AuthContext.js";

const Modal = (props) => {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  // Usuário fixo **por hora** - igual ao código da professora
  const { usuario } = useAuth();


  async function listarComentarios() {
    try {
      const resposta = await api.get(
        `ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`
      );
      setComentarios(resposta.data);
    } catch (error) {
      console.log(error); 
    }
  }

  
  useEffect(() => {
    listarComentarios();
  }, [props.idEvento]);

  async function cadastrarComentario() {
    try {
      await api.post("ComentariosEventos", {
        idUsuario:  usuario.idUsuario,
        idEvento: props.idEvento,
        descricao: novoComentario,
      });

      setNovoComentario("");
      listarComentarios();
    } catch (error) {
      console.log(error); 
    }
  }


  async function excluirComentario(idComentario) {
    try {
      await api.delete(`ComentariosEventos/${idComentario}`);
      listarComentarios();
    } catch (error) {
      console.log(error); 
    }
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
  
                  <img
                    src={ImgDeletar}
                    alt="Deletar"
                    onClick={() => excluirComentario(item.idComentarioEvento)}
                    style={{ cursor: "pointer" }} 
                  />
                  <p>{item.descricao}</p>
                  <hr />
                </div>
              ))}
              <div>
                <input
                  type="text"
                  placeholder="Escreva seu comentario..."
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                />
                <button onClick={cadastrarComentario}>Cadastrar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;