import { useEffect, useState } from "react";
import ImgDeletar from "../../assets/img/Deletarzinho.png";
import "./Modal.css";
import api from "../../Services/services";
import { useAuth } from "../../contexts/AuthContext.js";
import Swal from 'sweetalert2'

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
   function alertar(tipo, mensagem) {
      const cores = {
          success: { corPrimaria: "#4CAF50", corSecundaria: "#81C784", titulo: "Sucesso" },
          error: { corPrimaria: "#F44336", corSecundaria: "#E57373", titulo: "Erro" },
      };
  
      const { corPrimaria, corSecundaria, titulo } = cores[tipo] || {};
  
      Swal.fire({
          title: `
              <span style="
                  background: linear-gradient(90deg, ${corPrimaria}, ${corSecundaria});
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  font-weight: 700;
                  font-size: 2.3rem;
                  text-shadow: 1px 1px 6px ${corSecundaria}88;
                  display: inline-block;
                  animation: pulseGlow 2s infinite alternate;
              ">
                  ${titulo}
              </span>
          `,
          html: `
              <p style="
                  font-family: 'Poppins', sans-serif;
                  font-size: 1.15rem;
                  color: ${corSecundaria}cc;
                  text-align: center;
                  margin-top: 1rem;
                  text-shadow: 0 0 2px ${corPrimaria}aa;
              ">
                  ${mensagem}
              </p>
              <svg width="90" height="90" viewBox="0 0 64 64" fill="none" style="margin: 1.2rem auto; display: block; animation: floatUpDown 3s ease-in-out infinite;">
                  <circle cx="32" cy="32" r="30" stroke="${corPrimaria}" stroke-width="3" />
                  <path d="M20 24L44 40M44 24L20 40" stroke="${corSecundaria}" stroke-width="4" stroke-linecap="round" />
              </svg>
          `,
          background: 'rgba(255, 255, 255, 0.25)',
          backdrop: `
              rgba(0,0,0,0.4)
              url("https://cdn.pixabay.com/photo/2017/08/30/01/05/particles-2699971_1280.png")
              center center
              no-repeat
          `,
          confirmButtonText: 'OK',
          confirmButtonColor: corPrimaria,
          customClass: {
              popup: 'glassmorphic-popup'
          },
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
      await api.post("ComentariosEventos", {
        idUsuario:  usuario.idUsuario,
        idEvento: props.idEvento,
        descricao: novoComentario,
      });

      setNovoComentario("");
      listarComentarios();
    } catch (error) {
      console.log(error.response.data); 
      alertar("error", error.response.data )
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
                  <strong className="className_comentario_apos_comentar">{item.usuario.nomeUsuario}</strong>
  
                  <img
                    src={ImgDeletar}
                    alt="Deletar"
                    onClick={() => excluirComentario(item.idComentarioEvento)}
                    style={{ cursor: "pointer" }} 
                  />
                  <p className="className_comentario_apos_comentar_p">{item.descricao}</p>
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
                <button className="className_botao" onClick={cadastrarComentario}>Cadastrar</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;