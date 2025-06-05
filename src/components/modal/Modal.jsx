import { useEffect, useState } from "react";
import ImgDeletar from "../../assets/img/Deletarzinho.png";
import "./Modal.css";
import api from "../../Services/services";

const Modal = (props) => {
  const [comentarios, setComentarios] = useState([]);

  const [novoComentario, setNovoComentario] = useState("");

  const [usuarioId, setUsuarioId] = useState("4E200DDE-6A70-4FE2-BAAE-54180A14577C");

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

  async function cadastrarComentario(comentario) {
      try {
            await api.post("ComentariosEventos",{
                idUsuario: usuarioId ,
                 idEvento: props.idEvento,
                 descricao: comentario} )
                listarComentarios(); 
        } catch (error) {
            console.log(error);
        }
    
  }

  async function deletarComentario(idComentario) {
    try {
      await api.delete(`ComentariosEventos/${idComentario}`);
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
                  <img src={ImgDeletar} alt="Deletar"
                  onClick={() => deletarComentario(item.idComentarioEvento)} />
                  <p>{item.descricao}</p>
                  <hr />
                </div>
              ))}
              <div>
                <input type="text" placeholder="Escreva seu comentario..."
                value={novoComentario}
                onChange={(e)=>setNovoComentario(e.target.value)} />
                <button onClick={() => cadastrarComentario(novoComentario)}>Cadastrar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
