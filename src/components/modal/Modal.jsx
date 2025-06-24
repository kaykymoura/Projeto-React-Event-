import { useEffect, useState } from "react";
import ImgDeletar from "../../assets/img/Deletarzinho.png";
import "./Modal.css";
import api from "../../Services/services";
import { useAuth } from "../../contexts/AuthContext.js";
import Swal from "sweetalert2";
import 'animate.css';


const Modal = (props) => {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
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

  function alertar(tipo, mensagem) {
    Swal.fire({
      icon: tipo, // 'success' ou 'error'
      title: tipo === 'success' ? 'Sucesso!' : 'Atenção!',
      text: mensagem,
      confirmButtonText: "OK",
      background: tipo === 'success'
        ? "linear-gradient(135deg, #81c784, #4caf50)"
        : "linear-gradient(135deg, #f44336, #e57373)",
      color: "#fff",
      confirmButtonColor: tipo === 'success' ? "#388e3c" : "#d32f2f",
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }


  useEffect(() => {
    listarComentarios();
  }, [props.idEvento]);

  async function cadastrarComentario() {
    try {
      const resposta = await api.post("ComentariosEventos", {
        idUsuario: usuario.idUsuario,
        idEvento: props.idEvento,
        descricao: novoComentario,
      });

      const improprio = resposta.data?.improprio;

      if (improprio) {
        alertar(
          "error",
          "Comentário considerado impróprio. Ele foi enviado, mas ficará oculto."
        );
      } else {
        alertar("success", "Comentário publicado com sucesso!");
      }

      setNovoComentario("");
      listarComentarios();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alertar("error", "Erro ao enviar comentário");
    }
  }

  async function excluirComentario(idComentario) {
    const result = await Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      background: 'linear-gradient(135deg, #f44336, #e57373)',
      color: '#fff',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`ComentariosEventos/${idComentario}`);
        listarComentarios();
        alertar('success', 'Comentário excluído com sucesso!');
      } catch (error) {
        console.log(error);
        alertar('error', 'Erro ao excluir comentário');
      }
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
                  <strong className="className_comentario_apos_comentar">
                    {item.usuario.nomeUsuario}
                  </strong>

                  <img
                    src={ImgDeletar}
                    alt="Deletar"
                    onClick={() => excluirComentario(item.idComentarioEvento)}
                    style={{ cursor: "pointer" }}
                  />
                  <p className="className_comentario_apos_comentar_p">
                    {item.descricao}
                  </p>
                  <hr />
                </div>
              ))}
              <div>
                <input
                  className="className_comentario"
                  type="text"
                  placeholder="Escreva seu comentario..."
                  value={novoComentario}
                  onChange={(e) => setNovoComentario(e.target.value)}
                />
                <button className="className_botao" onClick={cadastrarComentario}>
                  Cadastrar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
